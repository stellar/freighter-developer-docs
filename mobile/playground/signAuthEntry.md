# stellar_signAuthEntry

`stellar_signAuthEntry`

Sign a Soroban authorization entry preimage following [SEP-43](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0043.md).

> [Connect to Freighter Mobile](mobile/playground/connect.md) first before testing.

<span class="playground-label">Entry preimage XDR:</span>
<input class="playground-input" id="input-wc-signAuth" placeholder="Base64-encoded HashIdPreimage XDR" />

<button class="playground-btn" id="btn-wc-signAuth">Sign Auth Entry</button>

<span class="playground-label">Result:</span>
<div class="playground-result" id="result-wc-signAuth">Connect to Freighter Mobile first</div>

<script>
document.getElementById('btn-wc-signAuth').addEventListener('click', async function() {
  var el = document.getElementById('result-wc-signAuth');

  if (!window._wcClient || !window._wcSession) {
    el.className = 'playground-result error';
    el.textContent = 'Not connected — go to the Connect page first';
    return;
  }

  var entryXdr = document.getElementById('input-wc-signAuth').value.trim();
  if (!entryXdr) {
    el.className = 'playground-result error';
    el.textContent = 'Please enter an entry preimage XDR';
    return;
  }

  el.className = 'playground-result';
  el.textContent = 'Waiting for approval in Freighter Mobile...';

  try {
    var result = await window._wcClient.request({
      topic: window._wcSession.topic,
      chainId: window._wcChainId || 'stellar:pubnet',
      request: {
        method: 'stellar_signAuthEntry',
        params: { entryXdr: entryXdr }
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
