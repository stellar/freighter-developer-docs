# Connecting

Establish a WalletConnect session with Freighter Mobile, handle session lifecycle events, and disconnect.

## Creating a Session

Request a connection with the Stellar namespace. This generates a URI you can display as a QR code or use as a deep link for mobile users.

```typescript
const { uri, approval } = await client.connect({
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

// Display `uri` as a QR code for the user to scan with Freighter Mobile
console.log("Scan this URI:", uri);

// Wait for the user to approve in Freighter Mobile
const session = await approval();
console.log("Connected! Session topic:", session.topic);
```

{% hint style="info" %}
Use `requiredNamespaces` for methods your dapp needs to function. Use `optionalNamespaces` for methods that enhance the experience but aren't essential.
{% endhint %}

## Handling Events

Listen for session lifecycle events to keep your UI in sync:

```typescript
// Session was disconnected by the wallet
client.on("session_delete", ({ topic }) => {
  console.log("Session deleted:", topic);
});

// Session expired
client.on("session_expire", ({ topic }) => {
  console.log("Session expired:", topic);
});
```

## Disconnecting

When the user wants to disconnect:

```typescript
await client.disconnect({
  topic: session.topic,
  reason: {
    code: 6000,
    message: "User disconnected",
  },
});
```

## Next steps

Once connected, you can [sign transactions, messages, and auth entries](signing.md).
