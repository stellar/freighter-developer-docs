# Extension Integration

Integrate Varial into your web application using `@stellar/varial-sdk`. This library lets you send and receive data from a user's Varial extension.

{% hint style="info" %}
`@stellar/varial-sdk` is the new name of `@stellar/freighter-api`. The old package stays at 6.0.1 with no new releases. Dapps using it keep working with every method on these pages except ones added after 6.0.1, such as `disconnect()`.
{% endhint %}

`@stellar/varial-sdk` adheres to the [SEP-43](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0043.md) standard for wallet interfaces on Stellar, and also offers additional methods beyond the spec such as `getNetworkDetails`, `addToken`, and `WatchWalletChanges`.

## Error Type

All methods return an optional `error` field of type `FreighterApiError` (the type keeps its previous name):

```typescript
interface FreighterApiError {
  code: number;
  message: string;
  ext?: string[];
}
```

## API Reference

| Category | Description |
| --- | --- |
| [Connecting](connecting.md) | Detect Varial, check permissions, request access, disconnect |
| [Reading Data](reading-data.md) | Get the user's address and network configuration |
| [Signing](signing.md) | Sign transactions, auth entries, and messages |
| [Token Management](token-management.md) | Add contract tokens to the user's wallet |
| [Watching Changes](watching-changes.md) | Monitor wallet state changes in real time |
