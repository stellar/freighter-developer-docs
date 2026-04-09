# Installation

Get up and running with Freighter by installing the browser extension and choosing the right integration method for your app.

## Prerequisites

1. Install the [Freighter browser extension](https://chromewebstore.google.com/detail/freighter/bcacfldlkkdogcmkkibnjlakofdplcbk) from the Chrome Web Store.
2. Choose an integration method below based on your project setup.

## Choose Your Integration

### npm / yarn

Use this when building with a bundler (Webpack, Vite, etc.) in a React, Next.js, or other modern JS framework.

**Ideal for:**

- React, Vue, Svelte, or Angular applications
- Server-side rendered apps (Next.js, Nuxt)
- Any project using a JavaScript bundler

```bash
npm install @stellar/freighter-api
```

```bash
yarn add @stellar/freighter-api
```

Then import in your code:

```typescript
import { isConnected, requestAccess, signTransaction } from "@stellar/freighter-api";
```

> See the [Developer Guide](../developer-guide/) for the full API reference.

### CDN (script tag)

Use this for plain HTML pages or projects without a build step. The library is loaded directly in the browser.

**Ideal for:**

- Static HTML sites
- Prototypes and quick experiments
- Projects without a bundler

Add to your `<head>`:

```html
<script src="https://unpkg.com/@stellar/freighter-api/build/index.min.js"></script>
```

This always loads the latest version automatically. To pin a specific version:

```html
<script src="https://unpkg.com/@stellar/freighter-api@6.0.1/build/index.min.js"></script>
```

Then access the API via `window.freighterApi`:

```javascript
const { address } = await window.freighterApi.requestAccess();
```

## Next steps

| I want to...                          | Go to                                                    |
| ------------------------------------- | -------------------------------------------------------- |
| Connect my app to Freighter           | [Connecting](../developer-guide/connecting.md)           |
| Sign a transaction                    | [Signing](../developer-guide/signing.md)                 |
| Add a token                           | [Token Management](../developer-guide/token-management.md) |
