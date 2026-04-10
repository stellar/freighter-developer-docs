# stellar_signAndSubmitXDR

`stellar_signAndSubmitXDR`

Sign a transaction **and** submit it to Horizon in one step.

> [Connect to Freighter Mobile](mobile/playground/connect.md) first before testing.

<span class="playground-label">Transaction XDR:</span>
<input class="playground-input" id="input-wc-signSubmitXDR" placeholder="Base64-encoded TransactionEnvelope XDR" />

<button class="playground-btn" id="btn-wc-signSubmitXDR">Sign & Submit Transaction</button>

<span class="playground-label">Result:</span>
<div class="playground-result" id="result-wc-signSubmitXDR">Connect to Freighter Mobile first</div>

<script>
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
