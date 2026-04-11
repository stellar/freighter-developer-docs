# Installation

Get up and running with WalletConnect so your dapp can connect to Freighter Mobile.

## Prerequisites

1. Sign up at [WalletConnect Cloud](https://cloud.walletconnect.com/) and create a project to get your **Project ID**.
2. Choose an installation method below.

## npm / yarn

```bash
npm install @walletconnect/universal-provider
```

```bash
yarn add @walletconnect/universal-provider
```

Then initialize the provider:

```typescript
import UniversalProvider from "@walletconnect/universal-provider";

const provider = await UniversalProvider.init({
  projectId: "YOUR_PROJECT_ID",
  metadata: {
    name: "My Stellar Dapp",
    description: "A dapp that integrates with Freighter Mobile",
    url: "https://my-dapp.com",
    icons: ["https://my-dapp.com/icon.png"],
  },
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
Older examples may use `@walletconnect/sign-client` directly. That approach still works, but `@walletconnect/universal-provider` is the actively documented package — see the [Reown docs](https://docs.reown.com/advanced/providers/universal).
{% endhint %}
