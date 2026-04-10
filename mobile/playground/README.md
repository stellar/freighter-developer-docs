# Mobile Playground

Test Freighter Mobile's WalletConnect RPC methods directly in your browser. You'll need:

1. A [WalletConnect Cloud](https://cloud.walletconnect.com/) Project ID
2. [Freighter Mobile](https://github.com/stellar/freighter-mobile) installed on your phone

## Getting Started

Start by [connecting](mobile/playground/connect.md) to Freighter Mobile via WalletConnect. Once connected, you can test any of the signing methods below.

## Methods

| Method | Description |
| --- | --- |
| [Connect](mobile/playground/connect.md) | Establish a WalletConnect session |
| [stellar_signXDR](mobile/playground/signXDR.md) | Sign a transaction and return signed XDR |
| [stellar_signAndSubmitXDR](mobile/playground/signAndSubmitXDR.md) | Sign and submit a transaction to Horizon |
| [stellar_signMessage](mobile/playground/signMessage.md) | Sign an arbitrary UTF-8 message (SEP-53) |
| [stellar_signAuthEntry](mobile/playground/signAuthEntry.md) | Sign a Soroban authorization entry (SEP-43) |
