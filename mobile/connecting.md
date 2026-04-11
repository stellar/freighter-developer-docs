# Connecting to Freighter Mobile

Establish a WalletConnect session with Freighter Mobile, handle session lifecycle events, and disconnect.

Assumes `provider` and `modal` are initialized as shown in [Installation](installation.md).

## Creating a Session

Call `modal.open()` to show the wallet selection modal, then `provider.connect()` to start the pairing. The modal displays a QR code and a list of wallets — when the user selects Freighter or scans the QR code, the connection is established automatically. `connect()` resolves once the wallet approves.

```typescript
// Open the modal (shows a spinner, then the QR code and wallet list)
modal.open();

// Connect — resolves when the wallet approves
const session = await provider.connect({
  requiredNamespaces: {
    stellar: {
      methods: [
        "stellar_signXDR",
        "stellar_signAndSubmitXDR",
        "stellar_signMessage",
        "stellar_signAuthEntry",
      ],
      chains: ["stellar:pubnet"],
      events: ["accountsChanged"],
    },
  },
});

if (!session) {
  throw new Error("Connection failed");
}

modal.close();
console.log("Connected! Session topic:", session.topic);
```

The connected session is also accessible at any time via `provider.session`.

Accounts are stored in `session.namespaces.stellar.accounts` as `"stellar:pubnet:G..."` strings — split on `:` to extract the public key:

```typescript
const publicKey = session.namespaces.stellar.accounts[0].split(":")[2];
```

{% hint style="info" %}
Use `requiredNamespaces` for methods your dapp needs to function. Use `optionalNamespaces` for methods that enhance the experience but aren't essential.
{% endhint %}

## Handling Events

Listen for session lifecycle events to keep your UI in sync:

```typescript
// Session was disconnected by the wallet
provider.on("session_delete", ({ topic }) => {
  console.log("Session deleted:", topic);
});

// Session expired
provider.on("session_expire", ({ topic }) => {
  console.log("Session expired:", topic);
});
```

## Disconnecting

When the user wants to disconnect:

```typescript
await provider.disconnect();
```

## Next steps

Once connected, you can [sign transactions, messages, and auth entries](signing.md).
