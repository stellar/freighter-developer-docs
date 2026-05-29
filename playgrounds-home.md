# Freighter Playgrounds

Try Freighter's APIs interactively in your browser. Pick a method from the sidebar.

For docs and integration guides, see [docs.freighter.app](https://docs.freighter.app).

## Before you start

- **Extension playgrounds** require the Freighter browser extension ([Chrome](https://chromewebstore.google.com/detail/freighter/bcacfldlkkdogcmkkibnjlakofdplcbk) · [Firefox](https://addons.mozilla.org/en-US/firefox/addon/freighter/)).
- **Mobile playgrounds** use WalletConnect — you'll need Freighter Mobile on your phone ([iOS App Store](https://apps.apple.com/app/freighter/id6743947720) · [Google Play](https://play.google.com/store/apps/details?id=org.stellar.freighterwallet)) to scan the connection QR code.

## Extension (`@stellar/freighter-api`)

| Method | Description |
| --- | --- |
| [isConnected](extension/playground/isConnected.md) | Check if Freighter is installed |
| [isAllowed](extension/playground/isAllowed.md) | Check if your app is authorized |
| [setAllowed](extension/playground/setAllowed.md) | Request authorization for your app |
| [requestAccess](extension/playground/requestAccess.md) | Request the user's public key |
| [getAddress](extension/playground/getAddress.md) | Get the user's wallet address |
| [getNetwork](extension/playground/getNetwork.md) | Get the active network |
| [getNetworkDetails](extension/playground/getNetworkDetails.md) | Get full network configuration |
| [signTransaction](extension/playground/signTransaction.md) | Sign a transaction XDR |
| [signAuthEntry](extension/playground/signAuthEntry.md) | Sign a Soroban authorization entry |
| [signMessage](extension/playground/signMessage.md) | Sign an arbitrary message |
| [addToken](extension/playground/addToken.md) | Add a Soroban token to the wallet |
| [watchWalletChanges](extension/playground/watchWalletChanges.md) | Monitor wallet state changes |

## Mobile (WalletConnect)

| Method | Description |
| --- | --- |
| [Connect](mobile/playground/connect.md) | Pair via WalletConnect |
| [stellar_signXDR](mobile/playground/signXDR.md) | Sign a transaction XDR |
| [stellar_signAndSubmitXDR](mobile/playground/signAndSubmitXDR.md) | Sign and submit a transaction |
| [stellar_signMessage](mobile/playground/signMessage.md) | Sign an arbitrary message |
| [stellar_signAuthEntry](mobile/playground/signAuthEntry.md) | Sign a Soroban authorization entry |
