# Installation

Get up and running with WalletConnect so your dapp can connect to Freighter Mobile.

## Prerequisites

1. Sign up at [WalletConnect Cloud](https://cloud.walletconnect.com/) and create a project to get your **Project ID**.
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
import UniversalProvider from "@walletconnect/universal-provider";
import { createAppKit } from "@reown/appkit/core";
import { mainnet } from "@reown/appkit/networks";

const projectId = "YOUR_PROJECT_ID";

// Provider — handles the WalletConnect protocol
const provider = await UniversalProvider.init({
  projectId,
  metadata: {
    name: "My Stellar Dapp",
    description: "A dapp that integrates with Freighter Mobile",
    url: "https://my-dapp.com",
    icons: ["https://my-dapp.com/icon.png"],
  },
});

// Modal — displays the QR code and wallet list
const modal = createAppKit({
  projectId,
  networks: [mainnet],
  manualWCControl: true,
});
```

## Next steps

| I want to...                          | Go to                                          |
| ------------------------------------- | ---------------------------------------------- |
| Connect to Freighter Mobile           | [Connecting](connecting.md)                    |
| Sign a transaction                    | [Signing](signing.md)                          |

## Alternatives

[Stellar Wallets Kit](https://stellarwalletskit.dev/) provides a multi-wallet interface that includes WalletConnect support, but currently only supports `stellar_signXDR` and `stellar_signAndSubmitXDR`. To use all four Freighter Mobile methods — including `stellar_signMessage` and `stellar_signAuthEntry` — implement the WalletConnect integration directly as shown in this guide.

{% hint style="info" %}
Older examples may use `@walletconnect/sign-client` directly. That approach still works, but `@walletconnect/universal-provider` is the actively documented package. For more details, see the [UniversalProvider docs](https://docs.reown.com/advanced/providers/universal) and the [AppKit modal migration guide](https://docs.reown.com/appkit/upgrade/wcm).
{% endhint %}
