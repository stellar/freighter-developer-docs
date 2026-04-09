# Developer Guide

Integrate Freighter into your web application using `@stellar/freighter-api`. This library lets you send and receive data from a user's Freighter extension.

`@stellar/freighter-api` adheres to the [SEP-43](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0043.md) standard for wallet interfaces on Stellar, and also offers additional methods beyond the spec such as `getNetworkDetails`, `addToken`, and `WatchWalletChanges`.

## Importing

Import the entire library:

```javascript
import freighterApi from "@stellar/freighter-api";
```

Or import only what you need:

```javascript
import {
  isConnected,
  getAddress,
  signAuthEntry,
  signTransaction,
  signMessage,
  addToken,
} from "@stellar/freighter-api";
```

## API Reference

| Category | Description |
| --- | --- |
| [Connecting](connecting.md) | Detect Freighter, check permissions, request access |
| [Reading Data](reading-data.md) | Get the user's address and network configuration |
| [Signing](signing.md) | Sign transactions, auth entries, and messages |
| [Token Management](token-management.md) | Add Soroban tokens to the user's wallet |
| [Watching Changes](watching-changes.md) | Monitor wallet state changes in real time |
