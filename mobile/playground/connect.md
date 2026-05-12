# Connect

Establish a WalletConnect v2 session with Freighter Mobile.

This playground uses the same `@walletconnect/universal-provider` + `@reown/appkit` stack documented in [Installation](mobile/installation.md). Clicking **Connect** opens the WalletConnect modal — it shows a QR for desktop and a wallet list with one-tap deep-links on mobile.

<span class="playground-label">WalletConnect Project ID:</span>
<input class="playground-input" id="wc-project-id" placeholder="Enter your WalletConnect Cloud project ID" />

<span class="playground-label">Chain:</span>
<select class="playground-input" id="wc-chain">
  <option value="stellar:pubnet">Mainnet (stellar:pubnet)</option>
  <option value="stellar:testnet">Testnet (stellar:testnet)</option>
</select>

<button class="playground-btn" id="btn-wc-connect">Connect to Freighter Mobile</button>
<button class="playground-btn" id="btn-wc-disconnect" disabled>Disconnect</button>

<span class="playground-label">Status:</span>
<div class="playground-result" id="wc-status">Not connected</div>

<span class="playground-label">Session:</span>
<div class="playground-result" id="wc-session"></div>

<script>
document.getElementById('btn-wc-connect').addEventListener('click', async function() {
  var statusEl = document.getElementById('wc-status');
  var sessionEl = document.getElementById('wc-session');
  var connectBtn = document.getElementById('btn-wc-connect');
  var disconnectBtn = document.getElementById('btn-wc-disconnect');

  var projectId = document.getElementById('wc-project-id').value.trim();
  var chainId = document.getElementById('wc-chain').value;

  if (!projectId) {
    statusEl.className = 'playground-result error';
    statusEl.textContent = 'Please enter a WalletConnect Project ID';
    return;
  }

  statusEl.className = 'playground-result';
  statusEl.textContent = 'Loading WalletConnect SDK...';
  sessionEl.textContent = '';

  var modal = null;

  try {
    var providerMod = await import('https://esm.sh/@walletconnect/universal-provider@2');
    var appkitMod = await import('https://esm.sh/@reown/appkit/core');
    var networksMod = await import('https://esm.sh/@reown/appkit/networks');

    statusEl.textContent = 'Initializing provider...';
    var provider = await providerMod.UniversalProvider.init({
      projectId: projectId,
      metadata: {
        name: 'Freighter Docs Playground',
        description: 'Interactive playground for testing Freighter Mobile',
        url: window.location.origin,
        icons: []
      }
    });

    // AppKit requires at least one network. Stellar is not built-in,
    // so we pass mainnet as a placeholder — manualWCControl tells
    // AppKit not to use it for chain switching; the modal is just
    // a UI shell over the URI emitted by UniversalProvider.
    //
    // featuredWalletIds surfaces Freighter at the top of the modal
    // regardless of the EVM-shaped network filter — see the
    // "Featuring Freighter" doc for how to look up / rotate this id.
    modal = appkitMod.createAppKit({
      projectId: projectId,
      networks: [networksMod.mainnet],
      universalProvider: provider,
      manualWCControl: true,
      featuredWalletIds: [
        '997a355c8f682468706a76cff1b004a7115f505fb962dac54b6e9b442dd1c380', // Freighter
      ],
    });

    window._wcProvider = provider;
    window._wcModal = modal;
    statusEl.textContent = 'Opening WalletConnect modal...';

    modal.open();

    var session = await provider.connect({
      namespaces: {
        stellar: {
          methods: [
            'stellar_signXDR',
            'stellar_signAndSubmitXDR',
            'stellar_signMessage',
            'stellar_signAuthEntry'
          ],
          chains: [chainId],
          events: ['accountsChanged']
        }
      }
    });

    modal.close();

    if (!session) {
      throw new Error('Connection cancelled');
    }

    window._wcSession = session;
    window._wcChainId = chainId;
    // The other playground pages call window._wcClient.request(...).
    // UniversalProvider wraps a sign-client and exposes it at .client,
    // so other pages keep working without changes.
    window._wcClient = provider.client;

    var accounts = session.namespaces.stellar ? session.namespaces.stellar.accounts : [];
    sessionEl.className = 'playground-result success';
    sessionEl.textContent = JSON.stringify({
      topic: session.topic,
      accounts: accounts,
      methods: session.namespaces.stellar ? session.namespaces.stellar.methods : []
    }, null, 2);

    statusEl.className = 'playground-result success';
    statusEl.textContent = 'Connected!';

    connectBtn.disabled = true;
    disconnectBtn.disabled = false;

    provider.on('session_delete', function() {
      window._wcSession = null;
      window._wcClient = null;
      statusEl.className = 'playground-result';
      statusEl.textContent = 'Session disconnected by wallet';
      sessionEl.textContent = '';
      connectBtn.disabled = false;
      disconnectBtn.disabled = true;
    });

  } catch (e) {
    if (modal) { try { modal.close(); } catch (_) {} }
    statusEl.className = 'playground-result error';
    statusEl.textContent = 'Error: ' + (e.message || String(e));
  }
});

document.getElementById('btn-wc-disconnect').addEventListener('click', async function() {
  var statusEl = document.getElementById('wc-status');
  var sessionEl = document.getElementById('wc-session');

  try {
    if (window._wcProvider) {
      await window._wcProvider.disconnect();
    }
    window._wcSession = null;
    window._wcClient = null;
    statusEl.className = 'playground-result';
    statusEl.textContent = 'Disconnected';
    sessionEl.textContent = '';
    document.getElementById('btn-wc-connect').disabled = false;
    document.getElementById('btn-wc-disconnect').disabled = true;
  } catch (e) {
    statusEl.className = 'playground-result error';
    statusEl.textContent = 'Error: ' + (e.message || String(e));
  }
});
</script>
