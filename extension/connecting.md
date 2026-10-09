# Connecting to Freighter

Detect whether a user has Freighter installed, check if your app is authorized, request access to the user's public key, and disconnect.

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
`isConnected()` checks whether the Freighter extension is installed. Note that it returns `false` for any user without the extension — not just mobile users. To detect Freighter Mobile's in-app browser specifically, check for `window.stellar?.platform === "mobile"`.
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

Prompt the user to add your dapp to Freighter's Allow List and return their public key in one call. This is the recommended way to connect — it combines authorization and data retrieval in a single step.

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

## Disconnecting

### `disconnect()`

Revoke your app's access to the user's public key, for example from a "Disconnect" button in your app. Freighter removes your app from the Allow List without asking the user to confirm, so the next call to `requestAccess()` or `setAllowed()` prompts the user again.

**Returns:** `Promise<{ error?: FreighterApiError }>`

```typescript
import { disconnect } from "@stellar/freighter-api";

const result = await disconnect();

if (result.error) {
  console.error("Disconnect failed:", result.error.message);
} else {
  console.log("App removed from Allow List");
}
```

Calling `disconnect()` when your app isn't on the Allow List succeeds without changing anything. It returns an error if the user hasn't unlocked Freighter since the browser started, or if the installed version of Freighter doesn't support `disconnect()`.

{% hint style="warning" %}
Freighter authorizes apps per account and per network, and `disconnect()` only revokes access for the account and network that are active when you call it. If the user previously authorized your app on another account or network, your app will have access to that public key again, without a prompt, when the user switches to it.
{% endhint %}

## Next steps

Once connected, you can [read the user's address and network](reading-data.md) or [sign transactions](signing.md).
