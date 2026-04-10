# Welcome to Freighter

Freighter is a non-custodial wallet for the Stellar network, available as a browser extension and a mobile app. Non-custodial means your users hold their own keys — your dapp never sees or stores private keys. This guide walks you through integrating Freighter so your users can connect their wallets, sign transactions, and interact with Soroban smart contracts.

## What You Can Build

With Freighter, your dapp can connect a user's wallet with a single call — no signup form, no password, just a familiar wallet popup and an immediate public key. From there you can read their active network, hand off transactions for signing, and submit to the network.

For dapps that integrate with smart contracts, Freighter also handles authorization entry signing for smart contract calls and arbitrary message signing for account verification.

## How It Works

The integration model is simple: your dapp talks to the wallet, and the wallet talks to the user.

For **desktop browsers**, you integrate with the Freighter extension through a lightweight JavaScript library. It injects itself into the page, and your dapp calls methods like "is the wallet connected?", "what's the user's address?", and "please sign this transaction."

For **mobile**, the integration works over WalletConnect v2. Your dapp generates a connection URI, the user scans a QR code with Freighter Mobile, and a secure relay session is established. From that point on, signing requests flow through the same pattern — your dapp proposes, the user reviews and approves in the wallet.

Both paths produce the same output: signed transactions you can submit to the Stellar network. So your backend and submission logic stay the same regardless of whether your user connected from a laptop or a phone.

If you want to support multiple Stellar wallets — not just Freighter — take a look at [Stellar Wallets Kit](https://stellarwalletskit.dev/). It provides a unified interface across Stellar desktop wallets so your users can connect with whichever browser extension they prefer. Note that it currently supports desktop wallets only, not mobile.

## Why Freighter

**You ship faster.** The API surface is small and intentional. Connecting a wallet, signing a transaction, and reading account data each take one function call. There's no complex state machine to manage, no WebSocket lifecycle to babysit, and no cryptography to implement yourself.

**It works where your users are.** Desktop users get the browser extension experience they're used to from other ecosystems. Mobile users get QR-code-based WalletConnect flows that feel native. You can support both from the same dapp with minimal branching.

## Choose Your Integration

### Extension

Integrate with Freighter's browser extension using `@stellar/freighter-api`. Best for web apps that run in desktop browsers.

**Ideal for:**

- React, Vue, or Angular web apps
- Server-rendered apps (Next.js, Nuxt)
- Static sites via CDN

> Get started with the [Extension Installation Guide](extension/installation.md)

### Mobile (WalletConnect)

Connect to Freighter Mobile using the WalletConnect v2 protocol. Best for dapps that need to support mobile users.

**Ideal for:**

- Mobile-first dapps
- Cross-platform apps that support both desktop and mobile wallets
- Dapps using WalletConnect for multi-wallet support

> Get started with the [Mobile Integration Guide](mobile/README.md)

## Quick links

| I want to...                          | Extension                                          | Mobile                                               |
| ------------------------------------- | -------------------------------------------------- | ---------------------------------------------------- |
| Install / set up                      | [Installation](extension/installation.md)    | [Installation](mobile/installation.md)               |
| Connect to Freighter                  | [Connecting](extension/connecting.md)        | [Connecting](mobile/connecting.md)                   |
| Sign a transaction                    | [Signing](extension/signing.md)              | [Signing](mobile/signing.md)                         |
| Add a token                           | [Token Management](extension/token-management.md) | —                                               |

## Resources

- [GitHub — Freighter Extension](https://github.com/stellar/freighter)
- [GitHub — Freighter Mobile](https://github.com/stellar/freighter-mobile)
- [Chrome Extension Store](https://chromewebstore.google.com/detail/freighter/bcacfldlkkdogcmkkibnjlakofdplcbk)
- [Stellar Developer Docs](https://developers.stellar.org)
- [WalletConnect v2 Docs](https://docs.walletconnect.com/)
