# Mobile Integration

Connect your dapp to Freighter Mobile using the [WalletConnect v2](https://docs.walletconnect.network/app-sdk/overview) protocol. All methods follow the standard JSON-RPC 2.0 request/response format over a WalletConnect session.

## Supported Chains

| Network | Chain ID |
| --- | --- |
| Mainnet (PUBLIC) | `stellar:pubnet` |
| Testnet | `stellar:testnet` |

## API Reference

| Method | Description |
| --- | --- |
| [`stellar_signXDR`](signing.md#stellar_signxdr) | Sign a transaction and return the signed XDR |
| [`stellar_signAndSubmitXDR`](signing.md#stellar_signandsubmitxdr) | Sign and submit a transaction to Horizon |
| [`stellar_signMessage`](signing.md#stellar_signmessage) | Sign an arbitrary UTF-8 message ([SEP-53](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0053.md)) |
| [`stellar_signAuthEntry`](signing.md#stellar_signauthentry) | Sign a Soroban authorization entry preimage (as defined in [SEP-43](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0043.md)) |

## Error Handling

All error responses use JSON-RPC 2.0 format with code `5000`:

```json
{
  "id": 1234567890,
  "jsonrpc": "2.0",
  "error": {
    "code": 5000,
    "message": "User rejected the request"
  }
}
```

{% hint style="warning" %}
Freighter Mobile validates that the `chainId` in the request matches the wallet's active network. If the user is on the wrong network, the request is rejected. Always specify `chainId` as a separate argument to `provider.request()`, not inside `params`.
{% endhint %}

## Security

Freighter Mobile uses **Blockaid** scanning to protect users:

| Scan type | When it runs |
| --- | --- |
| **Site scan** | Once during WalletConnect session connection |
| **Transaction scan** | For `stellar_signXDR` and `stellar_signAndSubmitXDR` requests |

`stellar_signMessage` and `stellar_signAuthEntry` do not trigger additional scans — the site was already scanned during connection.

## See also

- [WalletConnect v2 Docs](https://docs.walletconnect.network/app-sdk/overview)
- [Stellar Smart Contracts Auth](https://developers.stellar.org/docs/smart-contracts/guides/auth/authorization)
- [SEP-53: Message Signing](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0053.md)
- [SEP-43: Auth Entry Signing](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0043.md)
