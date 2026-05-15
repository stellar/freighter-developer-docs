# stellar_signAndSubmitXDR

`stellar_signAndSubmitXDR`

Sign a transaction **and** submit it to Horizon in one step.

> [Connect to Freighter Mobile](mobile/playground/connect.md) first before testing.

<span class="playground-label">Transaction XDR:</span>
<div style="display: flex; gap: 8px; margin: 4px 0 8px 0;">
  <input class="playground-input" id="input-wc-signSubmitXDR" placeholder="Base64-encoded TransactionEnvelope XDR" style="margin: 0; flex: 1;" />
  <button class="playground-btn" id="btn-paste-wc-signSubmitXDR" type="button" style="margin: 0; white-space: nowrap;">Paste</button>
</div>

<button class="playground-btn" id="btn-wc-signSubmitXDR">Sign & Submit Transaction</button>

<span class="playground-label">Result:</span>
<div class="playground-result" id="result-wc-signSubmitXDR">Connect to Freighter Mobile first</div>

<script>
document.getElementById('btn-paste-wc-signSubmitXDR').addEventListener('click', function() {
  window.playgroundPaste('input-wc-signSubmitXDR', 'result-wc-signSubmitXDR');
});

document.getElementById('btn-wc-signSubmitXDR').addEventListener('click', async function() {
  var el = document.getElementById('result-wc-signSubmitXDR');

  if (!window._wcClient || !window._wcSession) {
    el.className = 'playground-result error';
    el.textContent = 'Not connected — go to the Connect page first';
    return;
  }

  var xdr = document.getElementById('input-wc-signSubmitXDR').value.trim();
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
        method: 'stellar_signAndSubmitXDR',
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
