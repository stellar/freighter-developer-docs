# Signing

Sign transactions, messages, and Soroban authorization entries via WalletConnect.

Assumes `provider` and `modal` are initialized as shown in [Installation](installation.md).

{% hint style="info" %}
The WalletConnect RPC methods use different response field names than the extension API. For example, `stellar_signXDR` returns `signedXDR` while the extension's `signTransaction()` returns `signedTxXdr`. See the response tables below for each method's exact fields.
{% endhint %}

## Signing a Transaction

### `stellar_signXDR`

Sign a transaction and return the signed XDR. The transaction is **not** submitted to the network — your dapp is responsible for submission.

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `xdr` | `string` | **Required.** Base64-encoded `TransactionEnvelope` or `FeeBumpTransactionEnvelope` XDR. |

**Response**

| Field | Type | Description |
| --- | --- | --- |
| `signedXDR` | `string` | Base64-encoded signed transaction XDR. |

```typescript
const result = await provider.request(
  {
    method: "stellar_signXDR",
    params: { xdr: "AAAAAgAAAAA..." },
  },
  "stellar:pubnet",
);

console.log("Signed XDR:", result.signedXDR);
```

**Errors**

| Condition | Error message |
| --- | --- |
| Chain not supported | `"Unsupported chain: <chainId>"` |
| Wrong active network | `"Please switch to <network> and try again"` |
| XDR parse failure | `"Failed to sign transaction"` |
| User rejected | `"User rejected the request"` |

---

### `stellar_signAndSubmitXDR`

Sign a transaction **and** submit it to Horizon in one step.

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `xdr` | `string` | **Required.** Base64-encoded `TransactionEnvelope` or `FeeBumpTransactionEnvelope` XDR. |

**Response**

| Field | Type | Description |
| --- | --- | --- |
| `status` | `string` | `"success"` when the transaction is signed and submitted. |

```typescript
const result = await provider.request(
  {
    method: "stellar_signAndSubmitXDR",
    params: { xdr: "AAAAAgAAAAA..." },
  },
  "stellar:pubnet",
);

console.log("Status:", result.status); // "success"
```

**Errors**

| Condition | Error message |
| --- | --- |
| Chain not supported | `"Unsupported chain: <chainId>"` |
| Wrong active network | `"Please switch to <network> and try again"` |
| XDR parse / sign failure | `"Failed to sign transaction"` |
| Horizon submission failure | `"Failed to submit transaction"` |
| User rejected | `"User rejected the request"` |

{% hint style="info" %}
Use **`stellar_signXDR`** when you need to inspect or modify the signed transaction before submission. Use **`stellar_signAndSubmitXDR`** for a simpler flow where Freighter handles everything.
{% endhint %}

---

## Signing a Message

### `stellar_signMessage`

Sign an arbitrary UTF-8 text message with the wallet's active key, following [SEP-53](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0053.md).

**Parameters**

| Parameter | Type | Constraints | Description |
| --- | --- | --- | --- |
| `message` | `string` | Non-empty, max 1024 UTF-8 bytes | The plaintext message to sign. |

**Response**

| Field | Type | Description |
| --- | --- | --- |
| `signature` | `string` | Base64-encoded Ed25519 signature (per SEP-53). |

```typescript
const result = await provider.request(
  {
    method: "stellar_signMessage",
    params: { message: "Please sign to verify account ownership" },
  },
  "stellar:pubnet",
);

console.log("Signature:", result.signature);
```

**Errors**

| Condition | Error message |
| --- | --- |
| Missing or non-string message | `"Invalid message"` |
| Empty message | `"Cannot sign empty message"` |
| Message exceeds 1 KB | `"Message too long (max 1KB)"` |
| Signing failed | `"Failed to sign message"` |
| User rejected | `"User rejected the request"` |

---

## Signing an Auth Entry

### `stellar_signAuthEntry`

Sign a Soroban authorization entry preimage for multi-auth and custom-account smart contract workflows. Follows [SEP-43](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0043.md).

Your dapp constructs the `HashIdPreimage` (network ID + nonce + expiry + invocation), and Freighter hashes it with SHA-256 and signs the digest.

{% hint style="warning" %}
Freighter Mobile performs a **Blockaid site scan** during the initial WalletConnect session connection — no additional scan runs at auth-entry signing time. Review the contract address, function name, and subinvocations displayed in the UI before confirming.
{% endhint %}

**Parameters**

| Parameter | Type | Constraints | Description |
| --- | --- | --- | --- |
| `entryXdr` | `string` | Non-empty, non-whitespace | Base64-encoded `HashIdPreimage` XDR (envelope type `envelopeTypeSorobanAuthorization`). Build from the `SorobanAuthorizationEntry` returned by contract simulation. |

**Response**

| Field | Description |
| --- | --- |
| `signedAuthEntry` | Base64-encoded 64-byte Ed25519 signature over `SHA-256(preimage)`. |
| `signerAddress` | Stellar public key (G-address) of the account that produced the signature. |

```typescript
const result = await provider.request(
  {
    method: "stellar_signAuthEntry",
    params: { entryXdr: "AAAAAQ..." },
  },
  "stellar:pubnet",
);

console.log("Signature:", result.signedAuthEntry);
console.log("Signer:", result.signerAddress);
```

### Building the `entryXdr`

Here's how to construct the preimage from a contract simulation result and attach the signature back to the auth entry:

```typescript
import { xdr, Networks, hash, Keypair } from "@stellar/stellar-sdk";

// 1. Get the SorobanAuthorizationEntry from simulation
// Assumes `server` (SorobanRpc.Server) and `tx` (Transaction) are already set up
const simulationResult = await server.simulateTransaction(tx);
const authEntry = simulationResult.result.auth[0];

// 2. Build the HashIdPreimage
const preimage = xdr.HashIdPreimage.envelopeTypeSorobanAuthorization(
  new xdr.HashIdPreimageSorobanAuthorization({
    networkId: hash(new TextEncoder().encode(Networks.PUBLIC)),
    nonce: authEntry.credentials().address().nonce(),
    signatureExpirationLedger: authEntry
      .credentials()
      .address()
      .signatureExpirationLedger(),
    invocation: authEntry.rootInvocation(),
  }),
);

const entryXdr = preimage.toXDR("base64");

// 3. Send via WalletConnect
const result = await provider.request(
  {
    method: "stellar_signAuthEntry",
    params: { entryXdr },
  },
  "stellar:pubnet",
);

// 4. Attach the signature back to the auth entry
const signerRawKey = Keypair.fromPublicKey(result.signerAddress).rawPublicKey();
const signatureBytes = Uint8Array.from(atob(result.signedAuthEntry), (c) => c.charCodeAt(0));
const signatureScVal = xdr.ScVal.scvMap([
  new xdr.ScMapEntry({
    key: xdr.ScVal.scvSymbol("public_key"),
    val: xdr.ScVal.scvBytes(signerRawKey),
  }),
  new xdr.ScMapEntry({
    key: xdr.ScVal.scvSymbol("signature"),
    val: xdr.ScVal.scvBytes(signatureBytes),
  }),
]);
authEntry
  .credentials()
  .address()
  .signature(xdr.ScVal.scvVec([signatureScVal]));
```

**Errors**

| Condition | Error message |
| --- | --- |
| Missing, non-string, or whitespace-only `entryXdr` | `"Invalid authorization entry"` |
| XDR parse failure | `"Failed to process auth entry"` |
| `networkId` doesn't match active network | `"Authorization entry is for a different network"` |
| User rejected | `"User rejected the request"` |

## Full Example: Connect, Sign, and Submit

A complete flow from connection to transaction signing. The AppKit modal displays both a QR code and a list of wallets. When a user opens your dapp in Freighter Mobile's in-app browser, they select Freighter from the wallet list to deep-link into the connection approval — no QR code scanning needed. From an external browser, the user scans the QR code with their phone instead.

```typescript
import { UniversalProvider } from "@walletconnect/universal-provider";
import { createAppKit } from "@reown/appkit/core";
import { mainnet } from "@reown/appkit/networks";

const projectId = "YOUR_PROJECT_ID";

// 1. Initialize provider and modal
const provider = await UniversalProvider.init({
  projectId,
  metadata: {
    name: "My Stellar Dapp",
    description: "A dapp that integrates with Freighter Mobile",
    url: "https://my-dapp.com",
    icons: ["https://my-dapp.com/icon.png"],
  },
});

// AppKit requires at least one network. Stellar is not built-in,
// so we pass a placeholder. With manualWCControl the modal won't
// use it for chain switching.
const modal = createAppKit({
  projectId,
  networks: [mainnet],
  universalProvider: provider,
  manualWCControl: true,
});

// 2. Open the modal and connect
modal.open();

const session = await provider.connect({
  namespaces: {
    stellar: {
      methods: ["stellar_signXDR", "stellar_signAndSubmitXDR", "stellar_signMessage", "stellar_signAuthEntry"],
      chains: ["stellar:pubnet"],
      events: ["accountsChanged"],
    },
  },
});

if (!session) {
  throw new Error("Connection failed");
}

modal.close();

// 3. Sign a transaction
const xdr = "AAAAAgAAAAA..."; // your assembled transaction XDR
const result = await provider.request(
  {
    method: "stellar_signXDR",
    params: { xdr },
  },
  "stellar:pubnet",
);

console.log("Signed XDR:", result.signedXDR);
```
