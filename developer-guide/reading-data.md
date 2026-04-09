# Reading Data

Retrieve the user's public key and network configuration from Freighter.

{% hint style="info" %}
These methods require that the user has previously authorized your app via [`requestAccess()`](connecting.md#requesting-access) or [`setAllowed()`](connecting.md#requesting-authorization).
{% endhint %}

## Getting the User's Address

### `getAddress()`

A lightweight way to retrieve the user's public key. Unlike `requestAccess()`, this will **not** prompt the user — it returns an empty string if the app isn't authorized or Freighter isn't connected.

**Returns:** `Promise<{ address: string } & { error?: string }>`

```typescript
import { getAddress } from "@stellar/freighter-api";

const { address, error } = await getAddress();

if (error) {
  console.error(error);
} else {
  console.log("Public key:", address);
}
```

## Getting the Network

### `getNetwork()`

Get the name and passphrase of the network the user has selected in Freighter.

**Returns:** `Promise<{ network: string; networkPassphrase: string } & { error?: string }>`

Possible `network` values: `PUBLIC`, `TESTNET`, `FUTURENET`, or `STANDALONE` (custom networks).

```typescript
import { getNetwork } from "@stellar/freighter-api";

const { network, networkPassphrase, error } = await getNetwork();

if (!error) {
  console.log("Network:", network);           // e.g., "TESTNET"
  console.log("Passphrase:", networkPassphrase);
}
```

### `getNetworkDetails()`

Get comprehensive network configuration including the Horizon URL, passphrase, and Soroban RPC URL.

**Returns:** `Promise<{ network: string; networkUrl: string; networkPassphrase: string; sorobanRpcUrl?: string } & { error?: string }>`

```typescript
import { getNetworkDetails } from "@stellar/freighter-api";

const details = await getNetworkDetails();

if (!details.error) {
  console.log("Network:", details.network);            // e.g., "TESTNET"
  console.log("Horizon:", details.networkUrl);          // e.g., "https://horizon-testnet.stellar.org"
  console.log("Passphrase:", details.networkPassphrase);
  console.log("Soroban RPC:", details.sorobanRpcUrl);   // e.g., "https://soroban-testnet.stellar.org"
}
```

{% hint style="info" %}
Use `getNetworkDetails()` instead of `getNetwork()` when working with Soroban smart contracts or when you need specific network endpoints.
{% endhint %}
