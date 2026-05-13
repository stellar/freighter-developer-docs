# Featuring Freighter

When a user opens the WalletConnect / Reown modal in your dapp, wallets in the **featured row** are shown first — most users pick from there without scrolling or using the search bar. If your dapp is built for Stellar, featuring Freighter makes it discoverable upfront and improves conversion for Stellar users.

## Freighter's WalletConnect Explorer ID

```
997a355c8f682468706a76cff1b004a7115f505fb962dac54b6e9b442dd1c380
```

This is the **public** identifier of Freighter's listing in the [WalletConnect Cloud Explorer](https://walletguide.walletconnect.network/) (a.k.a. Reown Explorer). It is not the same as your dapp's WalletConnect **Project ID** — Project IDs identify the dapp/wallet account on the WalletConnect relay, while Explorer IDs identify a public wallet listing in the directory.

The Explorer ID can change if Freighter's listing is rotated (e.g. after a security key rotation on our end). If Freighter ever stops appearing in the featured row, look up the current ID using one of the following:

- **UI:** Open [WalletGuide](https://walletguide.walletconnect.network/) → search "Freighter" → click the card → copy the `Wallet ID` field from the detail view.
- **API:** `curl "https://explorer-api.walletconnect.com/v3/wallets?projectId=<your-wc-project-id>&search=freighter"` and read `id` from the Freighter entry in the response. Use your own WalletConnect **Project ID** here — the one you got from the [WalletConnect Dashboard](https://dashboard.walletconnect.com/) during [Installation](installation.md). The `projectId` param is just used for rate-limiting and must be a valid registered project ID, but it does not filter results — every valid project ID returns the same global wallet directory, so Freighter will appear in the response regardless of which valid ID you use.

## Option A — Direct WalletConnect / Reown integration

If you set up the modal directly with `@reown/appkit` (as in [Installation](installation.md)), pass `featuredWalletIds` to `createAppKit`:

```typescript
import { createAppKit } from "@reown/appkit/core";
import { mainnet } from "@reown/appkit/networks";

const modal = createAppKit({
  projectId,
  networks: [mainnet],
  universalProvider: provider,
  manualWCControl: true,
  featuredWalletIds: [
    "997a355c8f682468706a76cff1b004a7115f505fb962dac54b6e9b442dd1c380", // Freighter
  ],
});
```

You can include other wallet IDs in the same array — they appear in the featured row in the order you list them.

## Option B — Stellar Wallets Kit

[Stellar Wallets Kit](https://stellarwalletskit.dev/) (SWK) includes Freighter in `featuredWalletIds` by default for its `WalletConnectModule`, so on recent versions of the kit you get featured placement automatically — no extra config needed.

If you're on an older kit version (or the kit's default has gone stale), you can override the value via `appKitOptions.featuredWalletIds`:

```typescript
import { WalletConnectModule } from "@creit-tech/stellar-wallets-kit/modules/wallet-connect";

const wc = new WalletConnectModule({
  // ...your usual config (projectId, allowedChains, ...)
  appKitOptions: {
    featuredWalletIds: [
      "997a355c8f682468706a76cff1b004a7115f505fb962dac54b6e9b442dd1c380", // Freighter
    ],
  } as unknown as ConstructorParameters<typeof WalletConnectModule>[0]["appKitOptions"],
});
```

The cast is needed because `appKitOptions` is typed as the full `CreateAppKit` shape, but the kit only forwards a subset of those options to the underlying modal — so passing just `featuredWalletIds` is correct at runtime but doesn't satisfy the static type. Prefer the narrow `as unknown as ConstructorParameters<...>` cast over `as any`: the runtime behavior is identical, but the assertion stays scoped to this property value rather than erasing type-checking everywhere `appKitOptions` is consumed.
