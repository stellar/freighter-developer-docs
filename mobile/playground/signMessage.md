# stellar_signMessage

`stellar_signMessage`

Sign an arbitrary UTF-8 message following [SEP-53](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0053.md).

> [Connect to Freighter Mobile](mobile/playground/connect.md) first before testing.

<span class="playground-label">Message:</span>
<div style="display: flex; gap: 8px; margin: 4px 0 8px 0;">
  <input class="playground-input" id="input-wc-signMsg" placeholder="e.g. Verify account ownership" style="margin: 0; flex: 1;" />
  <button class="playground-btn" id="btn-paste-wc-signMsg" type="button" style="margin: 0; white-space: nowrap;">Paste</button>
</div>

<button class="playground-btn" id="btn-wc-signMsg">Sign Message</button>

<span class="playground-label">Result:</span>
<div class="playground-result" id="result-wc-signMsg">Connect to Freighter Mobile first</div>

<script>
document.getElementById('btn-paste-wc-signMsg').addEventListener('click', async function() {
  var input = document.getElementById('input-wc-signMsg');
  var resultEl = document.getElementById('result-wc-signMsg');
  try {
    input.value = await navigator.clipboard.readText();
  } catch (e) {
    // clipboard.readText() throws NotAllowedError when the browser hasn't
    // granted permission yet. On iOS Safari this happens before the native
    // "Paste" prompt appears — the user can tap that prompt to paste.
    // On other platforms the user may need to grant clipboard permission.
    if (e && (e.name === 'NotAllowedError' || /not allowed/i.test(e.message || ''))) {
      resultEl.className = 'playground-result';
      resultEl.textContent = 'Tap the Paste prompt if shown, or grant clipboard permission and try again.';
      return;
    }
    resultEl.className = 'playground-result error';
    resultEl.textContent = 'Clipboard read failed: ' + (e.message || 'permission denied');
  }
});

document.getElementById('btn-wc-signMsg').addEventListener('click', async function() {
  var el = document.getElementById('result-wc-signMsg');

  if (!window._wcClient || !window._wcSession) {
    el.className = 'playground-result error';
    el.textContent = 'Not connected — go to the Connect page first';
    return;
  }

  var message = document.getElementById('input-wc-signMsg').value;
  if (!message) {
    el.className = 'playground-result error';
    el.textContent = 'Please enter a message';
    return;
  }

  el.className = 'playground-result';
  el.textContent = 'Waiting for approval in Freighter Mobile...';

  try {
    var result = await window._wcClient.request({
      topic: window._wcSession.topic,
      chainId: window._wcChainId || 'stellar:pubnet',
      request: {
        method: 'stellar_signMessage',
        params: { message: message }
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
