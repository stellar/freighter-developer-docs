# Watching Wallet Changes

Monitor the user's Freighter wallet for address and network changes in real time.

## WatchWalletChanges

### `new WatchWalletChanges(timeout?: number)`

Creates a watcher that polls Freighter for changes at a configurable interval.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `timeout` | `number` | `3000` | Polling interval in milliseconds. |

### `watch(callback)`

Start polling. The callback fires only when something has changed (address, network, or passphrase).

```
watch(callback: ({ address: string; network: string; networkPassphrase: string }) => void)
```

### `stop()`

Stop polling for changes.

### Example

```typescript
import { WatchWalletChanges } from "@stellar/freighter-api";

const watcher = new WatchWalletChanges(1000); // poll every second

watcher.watch((changes) => {
  console.log("Address:", changes.address);
  console.log("Network:", changes.network);
  console.log("Passphrase:", changes.networkPassphrase);
});

// Stop after 30 seconds
setTimeout(() => watcher.stop(), 30000);
```

{% hint style="info" %}
The callback only fires when a value actually changes — it won't emit duplicate events.
{% endhint %}
