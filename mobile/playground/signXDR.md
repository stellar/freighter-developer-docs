# stellar_signXDR

`stellar_signXDR`

Sign a transaction and return the signed XDR. The transaction is **not** submitted to the network.

> [Connect to Freighter Mobile](mobile/playground/connect.md) first before testing.

<span class="playground-label">Transaction XDR:</span>
<div style="display: flex; gap: 8px; margin: 4px 0 8px 0;">
  <input class="playground-input" id="input-wc-signXDR" placeholder="Base64-encoded TransactionEnvelope XDR" style="margin: 0; flex: 1;" />
  <button class="playground-btn" id="btn-paste-wc-signXDR" type="button" style="margin: 0; white-space: nowrap;">Paste</button>
</div>

<button class="playground-btn" id="btn-wc-signXDR">Sign Transaction</button>

<span class="playground-label">Result:</span>
<div class="playground-result" id="result-wc-signXDR">Connect to Freighter Mobile first</div>

<script>
document.getElementById('btn-paste-wc-signXDR').addEventListener('click', function() {
  window.playgroundPaste('input-wc-signXDR', 'result-wc-signXDR');
});

document.getElementById('btn-wc-signXDR').addEventListener('click', async function() {
  var el = document.getElementById('result-wc-signXDR');

  if (!window._wcClient || !window._wcSession) {
    el.className = 'playground-result error';
    el.textContent = 'Not connected — go to the Connect page first';
    return;
  }

  var xdr = document.getElementById('input-wc-signXDR').value.trim();
  if (!xdr) {
    el.className = 'playground-result error';
    el.textContent = 'Please enter a transaction XDR';
    return;
  }

  el.className = 'playground-result';
  el.textContent = 'Waiting for approval in Freighter Mobile...';

  try {
    var result = await window._wcClient.request({
      topic: window._wcSession.topic,
      chainId: window._wcChainId || 'stellar:pubnet',
      request: {
        method: 'stellar_signXDR',
        params: { xdr: xdr }
      }
    });
    el.className = 'playground-result success';
    el.textContent = JSON.stringify(result, null, 2);
  } catch (e) {
    el.className = 'playground-result error';
    el.textContent = 'Error: ' + (e.message || JSON.stringify(e));
  }
});
</script>
