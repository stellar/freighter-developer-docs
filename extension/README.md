# Extension Integration

Integrate Freighter into your web application using `@stellar/freighter-api`. This library lets you send and receive data from a user's Freighter extension.

`@stellar/freighter-api` adheres to the [SEP-43](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0043.md) standard for wallet interfaces on Stellar, and also offers additional methods beyond the spec such as `getNetworkDetails`, `addToken`, and `WatchWalletChanges`.

## Error Type

All methods return an optional `error` field of type `FreighterApiError`:

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
| [Connecting](connecting.md) | Detect Freighter, check permissions, request access |
| [Reading Data](reading-data.md) | Get the user's address and network configuration |
| [Signing](signing.md) | Sign transactions, auth entries, and messages |
| [Token Management](token-management.md) | Add contract tokens to the user's wallet |
| [Watching Changes](watching-changes.md) | Monitor wallet state changes in real time |
