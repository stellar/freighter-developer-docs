# Installation

Get up and running with Varial by installing the browser extension and choosing the right integration method for your app.

## Prerequisites

1. Install the Varial browser extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/freighter/bcacfldlkkdogcmkkibnjlakofdplcbk) or [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/freighter/).
2. Choose an integration method below based on your project setup.

## Choose Your Integration

### npm / yarn

Use this when building with a bundler (Webpack, Vite, etc.) in a React, Next.js, or other modern JS framework.

**Ideal for:**

- React, Vue, Svelte, or Angular applications
- Server-side rendered apps (Next.js, Nuxt)
- Any project using a JavaScript bundler

```bash
npm install @stellar/varial-sdk
```

```bash
yarn add @stellar/varial-sdk
```

Then import in your code. You can import the entire library:

```javascript
import varialSdk from "@stellar/varial-sdk";
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
} from "@stellar/varial-sdk";
```

{% hint style="info" %}
**Upgrading from `@stellar/freighter-api`?** `@stellar/varial-sdk` is the same SDK under its new name, starting at version 1.0.0. Swap the package and change the import path — method names, parameters and return types are the same. `@stellar/freighter-api` stays at 6.0.1 with no new releases: dapps already using it keep working, but new methods such as `disconnect()` are only in `@stellar/varial-sdk`.
{% endhint %}

> See the [Extension Integration](../extension/) for the full API reference.

### CDN (script tag)

Use this for plain HTML pages or projects without a build step. The library is loaded directly in the browser.

**Ideal for:**

- Static HTML sites
- Prototypes and quick experiments
- Projects without a bundler

Add to your `<head>`:

```html
<script src="https://unpkg.com/@stellar/varial-sdk/build/index.min.js"></script>
```

This always loads the latest version automatically. To pin a specific version:

```html
<script src="https://unpkg.com/@stellar/varial-sdk@1.0.0/build/index.min.js"></script>
```

Then access the API via `window.freighterApi` (the global keeps its previous name):

```javascript
const { address } = await window.freighterApi.requestAccess();
```

## Next steps

| I want to...                          | Go to                                                    |
| ------------------------------------- | -------------------------------------------------------- |
| Connect my app to Varial              | [Connecting](../extension/connecting.md)           |
| Sign a transaction                    | [Signing](../extension/signing.md)                 |
| Add a token                           | [Token Management](../extension/token-management.md) |
