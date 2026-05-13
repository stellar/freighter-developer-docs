# addToken

`addToken({ contractId: string, networkPassphrase?: string })`

Test Freighter's `addToken` method:

<span class="playground-label">Enter Token's Contract Id:</span>
<input class="playground-input" id="input-addToken-contractId" placeholder="CC..." />

<span class="playground-label">Enter network passphrase:</span>
<input class="playground-input" id="input-addToken-passphrase" placeholder="e.g. Test SDF Network ; September 2015" />

<button class="playground-btn" id="btn-addToken">Add Token</button>

<span class="playground-label">Result:</span>
<div class="playground-result" id="result-addToken">Click the button to test</div>

<script>
document.getElementById('btn-addToken').addEventListener('click', async function() {
  var el = document.getElementById('result-addToken');
  el.className = 'playground-result';
  el.textContent = 'Waiting for user approval...';

  var contractId = document.getElementById('input-addToken-contractId').value;
  var passphrase = document.getElementById('input-addToken-passphrase').value;

  if (!contractId) {
    el.className = 'playground-result error';
    el.textContent = 'Please enter a contract ID';
    return;
  }

  var opts = { contractId: contractId };
  if (passphrase) opts.networkPassphrase = passphrase;

  try {
    var res = await window.freighterApi.addToken(opts);
    if (res.error) {
      el.className = 'playground-result error';
      el.textContent = 'Error: ' + res.error.message;
    } else {
      el.className = 'playground-result success';
      el.textContent = 'Token added: ' + res.contractId;
    }
  } catch (e) {
    el.className = 'playground-result error';
    el.textContent = 'Error: ' + e.message;
  }
});
</script>
