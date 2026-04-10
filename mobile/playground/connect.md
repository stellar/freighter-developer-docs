# Connect

Establish a WalletConnect v2 session with Freighter Mobile.

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

<span class="playground-label">QR Code:</span>
<div id="wc-qr" style="margin: 8px 0; text-align: center;"></div>

<span class="playground-label">URI (copy to Freighter Mobile):</span>
<div class="playground-result" id="wc-uri" style="user-select: all;"></div>

<span class="playground-label">Session:</span>
<div class="playground-result" id="wc-session"></div>

<script>
document.getElementById('btn-wc-connect').addEventListener('click', async function() {
  var statusEl = document.getElementById('wc-status');
  var qrEl = document.getElementById('wc-qr');
  var uriEl = document.getElementById('wc-uri');
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
  qrEl.innerHTML = '';
  uriEl.textContent = '';
  sessionEl.textContent = '';

  try {
    var mod = await import('https://esm.sh/@walletconnect/sign-client@2');
    var SignClient = mod.default || mod.SignClient;

    statusEl.textContent = 'Initializing client...';
    var client = await SignClient.init({
      projectId: projectId,
      metadata: {
        name: 'Freighter Docs Playground',
        description: 'Interactive playground for testing Freighter Mobile',
        url: window.location.origin,
        icons: []
      }
    });

    window._wcClient = client;
    statusEl.textContent = 'Creating session...';

    var connectResult = await client.connect({
      requiredNamespaces: {
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

    var uri = connectResult.uri;
    var approval = connectResult.approval;

    uriEl.textContent = uri;

    if (typeof qrcode === 'function') {
      var qr = qrcode(0, 'M');
      qr.addData(uri);
      qr.make();
      qrEl.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 4 });
    }

    statusEl.className = 'playground-result';
    statusEl.textContent = 'Scan the QR code with Freighter Mobile...';

    var session = await approval();
    window._wcSession = session;
    window._wcChainId = chainId;

    qrEl.innerHTML = '';
    uriEl.textContent = '';
    statusEl.className = 'playground-result success';
    statusEl.textContent = 'Connected!';
    sessionEl.className = 'playground-result success';

    var accounts = session.namespaces.stellar ? session.namespaces.stellar.accounts : [];
    sessionEl.textContent = JSON.stringify({
      topic: session.topic,
      accounts: accounts,
      methods: session.namespaces.stellar ? session.namespaces.stellar.methods : []
    }, null, 2);

    connectBtn.disabled = true;
    disconnectBtn.disabled = false;

    client.on('session_delete', function() {
      window._wcSession = null;
      statusEl.className = 'playground-result';
      statusEl.textContent = 'Session disconnected by wallet';
      sessionEl.textContent = '';
      connectBtn.disabled = false;
      disconnectBtn.disabled = true;
    });

  } catch (e) {
    statusEl.className = 'playground-result error';
    statusEl.textContent = 'Error: ' + e.message;
  }
});

document.getElementById('btn-wc-disconnect').addEventListener('click', async function() {
  var statusEl = document.getElementById('wc-status');
  var sessionEl = document.getElementById('wc-session');

  try {
    if (window._wcClient && window._wcSession) {
      await window._wcClient.disconnect({
        topic: window._wcSession.topic,
        reason: { code: 6000, message: 'User disconnected' }
      });
    }
    window._wcSession = null;
    statusEl.className = 'playground-result';
    statusEl.textContent = 'Disconnected';
    sessionEl.textContent = '';
    document.getElementById('btn-wc-connect').disabled = false;
    document.getElementById('btn-wc-disconnect').disabled = true;
  } catch (e) {
    statusEl.className = 'playground-result error';
    statusEl.textContent = 'Error: ' + e.message;
  }
});
</script>
