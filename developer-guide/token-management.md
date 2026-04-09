# Token Management

Add Soroban tokens to a user's Freighter wallet programmatically.

## Adding a Token

### `addToken()`

Trigger an "add token" flow that displays token details in a modal for the user to review and approve.

```
addToken({ contractId: string, networkPassphrase?: string })
  -> Promise<{ contractId: string } & { error?: FreighterApiError }>
```

When called, Freighter loads the token's **symbol**, **name**, **decimals**, and **balance** from the contract and displays them for the user to verify before adding.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `contractId` | `string` | **Required.** The Soroban token contract ID. |
| `networkPassphrase` | `string` | Defaults to Pubnet's passphrase if omitted. |

### Example

```typescript
import { isConnected, addToken } from "@stellar/freighter-api";

const { isConnected: connected } = await isConnected();
if (!connected) return;

const result = await addToken({
  contractId: "CC...ABCD",
  networkPassphrase: "Test SDF Network ; September 2015", // optional
});

if (result.error) {
  console.error(result.error.message);
} else {
  console.log(`Token added: ${result.contractId}`);
}
```

{% hint style="info" %}
After the user approves, Freighter will automatically track the token's balance and display it alongside other account balances.
{% endhint %}
