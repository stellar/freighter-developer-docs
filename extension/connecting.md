# Connecting to Varial

Detect whether a user has Varial installed, check if your app is authorized, and request access to the user's public key.

## Detecting Varial

### `isConnected()`

Check if the user has Varial installed in their browser.

**Returns:** `Promise<{ isConnected: boolean } & { error?: FreighterApiError }>`

```typescript
import { isConnected } from "@stellar/varial-sdk";

const result = await isConnected();

if (result.isConnected) {
  console.log("Varial is installed");
}
```

{% hint style="info" %}
`isConnected()` checks whether the Varial extension is installed. Note that it returns `false` for any user without the extension — not just mobile users. To detect the Varial mobile app's in-app browser specifically, check for `window.stellar?.platform === "mobile"`. The injected `window.stellar.provider` value is still `"freighter"`, the app's old name — it was kept unchanged so existing wallet detection keeps working.
{% endhint %}

## Checking Authorization

### `isAllowed()`

Check if the user has previously authorized your app to receive data from Varial.

**Returns:** `Promise<{ isAllowed: boolean } & { error?: FreighterApiError }>`

```typescript
import { isAllowed } from "@stellar/varial-sdk";

const result = await isAllowed();

if (result.isAllowed) {
  console.log("App is on the Allow List");
}
```

## Requesting Authorization

### `setAllowed()`

Prompt the user to authorize your app and add it to Varial's **Allow List**. Once approved, the extension can provide user data without additional prompts.

**Returns:** `Promise<{ isAllowed: boolean } & { error?: FreighterApiError }>`

```typescript
import { setAllowed } from "@stellar/varial-sdk";

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

Prompt the user to add your dapp to Varial's Allow List and return their public key in one call. This is the recommended way to connect — it combines authorization and data retrieval in a single step.

**Returns:** `Promise<{ address: string } & { error?: FreighterApiError }>`

If the user has previously authorized your app, the public key is returned immediately without a popup.

```typescript
import { isConnected, requestAccess } from "@stellar/varial-sdk";

// Always check isConnected first
const connectResult = await isConnected();
if (!connectResult.isConnected) {
  console.error("Varial is not installed");
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
