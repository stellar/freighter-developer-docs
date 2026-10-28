# Welcome to Varial

{% hint style="info" %}
**Freighter is now Varial.** Same wallet, new name. Existing integrations keep working unchanged — dapps on `@stellar/freighter-api` and the WalletConnect methods are unaffected. New integrations should use [`@stellar/varial-sdk`](extension/installation.md), the extension SDK's new name.
{% endhint %}

Varial (formerly Freighter) is a non-custodial wallet for the Stellar network, available as a browser extension and a mobile app. Non-custodial means your users hold their own keys — your dapp never sees or stores private keys. This guide walks you through integrating Varial so your users can connect their wallets, sign transactions, and interact with Soroban smart contracts.

## What You Can Build

With Varial, your dapp can connect a user's wallet with a single call — no signup form, no password, just a familiar wallet popup and an immediate public key. From there you can read their active network, hand off transactions for signing, and submit to the network.

For dapps that integrate with smart contracts, Varial also handles authorization entry signing for smart contract calls and arbitrary message signing for account verification.

## How It Works

The integration model is simple: your dapp talks to the wallet, and the wallet talks to the user.

For **desktop browsers**, you integrate with the Varial browser extension through a lightweight JavaScript library. It injects itself into the page, and your dapp calls methods like "is the wallet connected?", "what's the user's address?", and "please sign this transaction."

For **mobile**, the integration works over WalletConnect v2. When a user opens your dapp in a mobile browser, WalletConnect presents a modal where they select Varial as their wallet and approve the connection. On desktop, the same flow can display a QR code for the user to scan. Either way, a secure relay session is established and signing requests flow through the same pattern — your dapp proposes, the user reviews and approves in the wallet.

Both paths produce the same output: signed transactions you can submit to the Stellar network. So your backend and submission logic stay the same regardless of whether your user connected from a laptop or a phone.

If you want to support multiple Stellar wallets — not just Varial — take a look at [Stellar Wallets Kit](https://stellarwalletskit.dev/). It provides a unified interface across Stellar wallets, including browser extensions and WalletConnect-based mobile wallets, so your users can connect with whichever wallet they prefer.

> **Note:** Stellar Wallets Kit's WalletConnect module supports all four methods the Varial mobile app exposes — `stellar_signXDR`, `stellar_signAndSubmitXDR`, `stellar_signMessage`, and `stellar_signAuthEntry` — from v2.3.0. Older versions only expose the first two; upgrade the kit, or integrate WalletConnect directly, if you need message or auth entry signing.

## Why Varial

**Built and maintained by SDF.** Varial is developed by the Stellar Development Foundation, the same team behind the core Stellar protocol and SDKs.

**Complete Stellar support.** Transaction signing, Soroban authorization entry signing with contract invocation inspection, SEP-53 message signing, contract token management, and Blockaid transaction scanning.

**Desktop and mobile.** Browser extension for desktop, WalletConnect for mobile. Both paths produce the same signed output, so your dapp supports both with minimal branching.

## Get Started

**Desktop** — integrate with the Varial browser extension using `@stellar/varial-sdk`. See the [Extension Guide](extension/installation.md).

**Mobile** — connect to the Varial mobile app over WalletConnect v2. See the [Mobile Guide](mobile/README.md).

**Both** — if your dapp needs to support desktop and mobile users, use both integration paths. Both produce the same output (signed XDR), so your submission logic stays the same regardless of how the user connected.

## Quick links

| I want to...         | Extension                                         | Mobile                                  |
| -------------------- | ------------------------------------------------- | --------------------------------------- |
| Install / set up     | [Installation](extension/installation.md)         | [Installation](mobile/installation.md)  |
| Connect to Varial    | [Connecting](extension/connecting.md)             | [Connecting](mobile/connecting.md)      |
| Sign a transaction   | [Signing](extension/signing.md)                   | [Signing](mobile/signing.md)            |
| Add a token          | [Token Management](extension/token-management.md) | —                                       |
| Try it out           | [Playground ↗](https://play.varialwallet.com)        | [Playground ↗](https://play.varialwallet.com) |

## Resources

- [GitHub — Varial Extension](https://github.com/stellar/freighter)
- [GitHub — Varial Mobile App](https://github.com/stellar/freighter-mobile)
- [Varial on Chrome Web Store](https://chromewebstore.google.com/detail/freighter/bcacfldlkkdogcmkkibnjlakofdplcbk)
- [Varial on Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/freighter/)
- [Stellar Developer Docs](https://developers.stellar.org)
- [WalletConnect v2 Docs](https://docs.walletconnect.network/app-sdk/overview)
