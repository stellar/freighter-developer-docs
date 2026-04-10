# Signing

Sign transactions, authorization entries, and arbitrary messages using the user's Freighter wallet.

## Signing a Transaction

### `signTransaction()`

Pass a transaction XDR string to Freighter for the user to review and sign.

```
signTransaction(xdr: string, opts?: {
  network?: string,
  networkPassphrase?: string,
  address?: string
}) -> Promise<{ signedTxXdr: string; signerAddress: string } & { error?: FreighterApiError }>
```

The user will be prompted to enter their password (if the extension doesn't currently hold the private key) and then review the transaction details before signing.

{% hint style="warning" %}
The private key is cached for **5 minutes** after the user enters their password. The transaction must be reviewed and accepted within that window.
{% endhint %}

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `xdr` | `string` | **Required.** Base64-encoded transaction XDR. |
| `opts.network` | `string` | Network name (maps to `Networks` enum in `@stellar/stellar-sdk`). |
| `opts.networkPassphrase` | `string` | Custom passphrase. Ignored if `network` is also provided. |
| `opts.address` | `string` | Request a specific account's signature. Freighter will switch to that account if available. |

{% hint style="info" %}
Passing `network` or `networkPassphrase` lets Freighter warn the user if their wallet is configured to the wrong network.
{% endhint %}

**Example**

```typescript
import { signTransaction } from "@stellar/freighter-api";

const { signedTxXdr, signerAddress, error } = await signTransaction(xdr, {
  network: "TESTNET",
  address: "G...", // optional: request a specific account
});

if (error) {
  console.error("Signing failed:", error.message);
} else {
  console.log("Signed by:", signerAddress);
  console.log("Signed XDR:", signedTxXdr);
}
```

**Errors**

| Condition | Error message |
| --- | --- |
| User rejected | `"The user rejected this request."` |
| Extension not installed | `"The wallet encountered an internal error"` |

## Signing an Auth Entry

### `signAuthEntry()`

Sign an [authorization entry preimage](https://github.com/stellar/js-stellar-base/blob/a9567e5843760bfb6a8b786592046aee4c9d38b2/types/next.d.ts#L6895) and receive the signed hash back as a base64 string. Used for [Soroban contract authorization](https://developers.stellar.org/docs/smart-contracts/guides/auth/authorization) flows.

```
signAuthEntry(entryXdr: string, opts: {
  address: string
}) -> Promise<{ signedAuthEntry: string | null; signerAddress: string } & { error?: FreighterApiError }>
```

See the [`authorizeEntry` helper](https://github.com/stellar/js-stellar-base/blob/e3d6fc3351e7d242b374c7c6057668366364a279/src/auth.js#L97) in `js-stellar-base` for how signed auth entries are used, or the [Soroban development documentation](https://developers.stellar.org/docs/smart-contracts) for wallet-side patterns.

**Example**

```typescript
import { signAuthEntry } from "@stellar/freighter-api";

const { signedAuthEntry, signerAddress, error } = await signAuthEntry(entryXdr, {
  address: "G...",
});

if (error) {
  console.error("Auth entry signing failed:", error.message);
} else {
  console.log("Signed auth entry:", signedAuthEntry);
}
```

**Errors**

| Condition | Error message |
| --- | --- |
| User rejected | `"The user rejected this request."` |

## Signing a Message

### `signMessage()`

Sign an arbitrary string and receive a base64-encoded Ed25519 signature. Follows [SEP-53](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0053.md).

```
signMessage(message: string, opts: {
  address: string
}) -> Promise<{ signedMessage: string | null; signerAddress: string } & { error?: FreighterApiError }>
```

**Example**

```typescript
import { signMessage } from "@stellar/freighter-api";

const { signedMessage, signerAddress, error } = await signMessage(
  "Verify account ownership",
  { address: "G..." },
);

if (error) {
  console.error("Message signing failed:", error.message);
} else {
  console.log("Signature:", signedMessage);
}
```

**Errors**

| Condition | Error message |
| --- | --- |
| User rejected | `"The user rejected this request."` |

## Full Example: Connect, Sign, and Submit

A complete flow from connection to Horizon submission:

```typescript
import { isConnected, requestAccess, signTransaction } from "@stellar/freighter-api";
import { Server, TransactionBuilder } from "@stellar/stellar-sdk";

// 1. Check Freighter is installed
const connectResult = await isConnected();
if (!connectResult.isConnected) {
  throw new Error("Freighter not found");
}

// 2. Request the user's public key
const accessResult = await requestAccess();
if (accessResult.error) {
  throw new Error(accessResult.error.message);
}

// 3. Sign the transaction
const xdr = "AAAAAgAAAAA..."; // your assembled transaction XDR
const signResult = await signTransaction(xdr, {
  network: "TESTNET",
  address: accessResult.address,
});
if (signResult.error) {
  throw new Error(signResult.error.message);
}

// 4. Submit to Horizon
const server = new Server("https://horizon-testnet.stellar.org");
const tx = TransactionBuilder.fromXDR(
  signResult.signedTxXdr,
  "Test SDF Network ; September 2015",
);
const response = await server.submitTransaction(tx);
console.log("Transaction submitted:", response.hash);
```
