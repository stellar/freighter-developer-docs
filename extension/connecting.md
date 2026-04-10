# Connecting to Freighter

Detect whether a user has Freighter installed, check if your app is authorized, and request access to the user's public key.

## Detecting Freighter

### `isConnected()`

Check if the user has Freighter installed in their browser.

**Returns:** `Promise<{ isConnected: boolean } & { error?: FreighterApiError }>`

```typescript
import { isConnected } from "@stellar/freighter-api";

const result = await isConnected();

if (result.isConnected) {
  console.log("Freighter is installed");
}
```

{% hint style="info" %}
`isConnected()` can also be used to detect if a user is on desktop or mobile — if it returns `false`, the user is likely on a mobile device and you should use WalletConnect instead.
{% endhint %}

## Checking Authorization

### `isAllowed()`

Check if the user has previously authorized your app to receive data from Freighter.

**Returns:** `Promise<{ isAllowed: boolean } & { error?: FreighterApiError }>`

```typescript
import { isAllowed } from "@stellar/freighter-api";

const result = await isAllowed();

if (result.isAllowed) {
  console.log("App is on the Allow List");
}
```

## Requesting Authorization

### `setAllowed()`

Prompt the user to authorize your app and add it to Freighter's **Allow List**. Once approved, the extension can provide user data without additional prompts.

**Returns:** `Promise<{ isAllowed: boolean } & { error?: FreighterApiError }>`

```typescript
import { setAllowed } from "@stellar/freighter-api";

const result = await setAllowed();

if (result.isAllowed) {
  console.log("App added to Allow List");
}
```

{% hint style="info" %}
If the user has already authorized your app, `setAllowed()` resolves immediately with `{ isAllowed: true }`.
{% endhint %}

## Requesting Access

### `requestAccess()`

Prompt the user for permission to access their public key. Like `setAllowed()`, this handles authorization — but also returns the public key in one call.

**Returns:** `Promise<{ address: string } & { error?: FreighterApiError }>`

If the user has previously authorized your app, the public key is returned immediately without a popup.

```typescript
import { isConnected, requestAccess } from "@stellar/freighter-api";

// Always check isConnected first
const connectResult = await isConnected();
if (!connectResult.isConnected) {
  console.error("Freighter is not installed");
  return;
}

const accessResult = await requestAccess();
if (accessResult.error) {
  console.error("Access denied:", accessResult.error.message);
} else {
  console.log("Public key:", accessResult.address);
}
```

{% hint style="warning" %}
Always check `isConnected()` before calling `requestAccess()` to ensure the extension is available.
{% endhint %}

## Next steps

Once connected, you can [read the user's address and network](reading-data.md) or [sign transactions](signing.md).
