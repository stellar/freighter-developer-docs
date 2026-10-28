# Installation

Get up and running with WalletConnect so your dapp can connect to the Varial mobile app.

## Prerequisites

1. Sign up at [WalletConnect Dashboard](https://dashboard.walletconnect.com/) and create a project to get your **Project ID**.
2. Choose an installation method below.

## npm / yarn

```bash
npm install @walletconnect/universal-provider @reown/appkit
```

```bash
yarn add @walletconnect/universal-provider @reown/appkit
```

Then initialize the provider and modal:

```typescript
import { UniversalProvider } from "@walletconnect/universal-provider";
import { createAppKit } from "@reown/appkit/core";
import { mainnet } from "@reown/appkit/networks";

const projectId = "YOUR_PROJECT_ID";

// Provider — handles the WalletConnect protocol
const provider = await UniversalProvider.init({
  projectId,
  metadata: {
    name: "My Stellar Dapp",
    description: "A dapp that integrates with Varial",
    url: "https://my-dapp.com",
    icons: ["https://my-dapp.com/icon.png"],
  },
});

// Modal — displays the QR code and wallet list.
// AppKit requires at least one network. Stellar is not built-in,
// so we pass a placeholder. With manualWCControl the modal won't
// use it for chain switching.
const modal = createAppKit({
  projectId,
  networks: [mainnet],
  universalProvider: provider,
  manualWCControl: true,
});
```

## Next steps

| I want to...                          | Go to                                          |
| ------------------------------------- | ---------------------------------------------- |
| Connect to the Varial mobile app      | [Connecting](connecting.md)                    |
| Sign a transaction                    | [Signing](signing.md)                          |
| Feature Varial upfront in the modal   | [Featuring Varial](featuring-freighter.md)    |

## Alternatives

[Stellar Wallets Kit](https://stellarwalletskit.dev/) provides a multi-wallet interface that includes WalletConnect support. From v2.3.0, its `WalletConnectModule` supports all four Varial methods:

| Stellar Wallets Kit method | WalletConnect RPC method |
| --- | --- |
| `signTransaction()` | `stellar_signXDR` |
| `signAndSubmitTransaction()` | `stellar_signAndSubmitXDR` |
| `signMessage()` | `stellar_signMessage` |
| `signAuthEntry()` | `stellar_signAuthEntry` |

Use the kit if your dapp supports several Stellar wallets. Integrate WalletConnect directly, as shown in this guide, if you want full control over the session and the modal. Kit versions before v2.3.0 only support `stellar_signXDR` and `stellar_signAndSubmitXDR`.

{% hint style="warning" %}
The kit sends `stellar:pubnet` only for the Mainnet passphrase (`Networks.PUBLIC`) and `stellar:testnet` for anything else. It uses the `networkPassphrase` you pass on the call, or else the kit's network, which is Mainnet unless you set it with `init({ network })` or `setNetwork()`. Keep it in line with the network active in the Varial mobile app, or the request is rejected.
{% endhint %}

{% hint style="info" %}
Older examples may use `@walletconnect/sign-client` directly. That approach still works, but `@walletconnect/universal-provider` is the actively documented package. For more details, see the [UniversalProvider docs](https://docs.reown.com/advanced/providers/universal) and the [AppKit modal migration guide](https://docs.reown.com/appkit/upgrade/wcm).
{% endhint %}
