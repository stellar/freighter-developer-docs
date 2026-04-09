# Installation

Get up and running with WalletConnect so your dapp can connect to Freighter Mobile.

## Prerequisites

1. Sign up at [WalletConnect Cloud](https://cloud.walletconnect.com/) and create a project to get your **Project ID**.
2. Choose an installation method below.

## npm / yarn

```bash
npm install @walletconnect/sign-client @walletconnect/types
```

```bash
yarn add @walletconnect/sign-client @walletconnect/types
```

Then initialize the client:

```typescript
import SignClient from "@walletconnect/sign-client";

const client = await SignClient.init({
  projectId: "YOUR_PROJECT_ID",
  metadata: {
    name: "My Stellar dApp",
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
