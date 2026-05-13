# signTransaction

`signTransaction(xdr: string, opts?: { network?: string, networkPassphrase?: string, address?: string })`

Test Freighter's `signTransaction` method:

<span class="playground-label">Enter transaction XDR:</span>
<div style="display: flex; gap: 8px; margin: 4px 0 8px 0;">
  <input class="playground-input" id="input-signTx-xdr" placeholder="Base64-encoded transaction XDR" style="margin: 0; flex: 1;" />
  <button class="playground-btn" id="btn-paste-signTx-xdr" type="button" style="margin: 0; white-space: nowrap;">Paste</button>
</div>

<span class="playground-label">Enter network passphrase (optional):</span>
<div style="display: flex; gap: 8px; margin: 4px 0 8px 0;">
  <input class="playground-input" id="input-signTx-passphrase" placeholder="e.g. Test SDF Network ; September 2015" style="margin: 0; flex: 1;" />
  <button class="playground-btn" id="btn-paste-signTx-passphrase" type="button" style="margin: 0; white-space: nowrap;">Paste</button>
</div>

<span class="playground-label">Request signature from specific public key (optional):</span>
<div style="display: flex; gap: 8px; margin: 4px 0 8px 0;">
  <input class="playground-input" id="input-signTx-address" placeholder="G..." style="margin: 0; flex: 1;" />
  <button class="playground-btn" id="btn-paste-signTx-address" type="button" style="margin: 0; white-space: nowrap;">Paste</button>
</div>

<button class="playground-btn" id="btn-signTransaction">Sign Transaction XDR</button>

<span class="playground-label">Result:</span>
<div class="playground-result" id="result-signTx">Click the button to test</div>

<span class="playground-label">Signer address:</span>
<div class="playground-result" id="result-signTx-signer"></div>

<script>
document.getElementById('btn-paste-signTx-xdr').addEventListener('click', function() {
  window.playgroundPaste('input-signTx-xdr', 'result-signTx');
});
document.getElementById('btn-paste-signTx-passphrase').addEventListener('click', function() {
  window.playgroundPaste('input-signTx-passphrase', 'result-signTx');
});
document.getElementById('btn-paste-signTx-address').addEventListener('click', function() {
  window.playgroundPaste('input-signTx-address', 'result-signTx');
});

document.getElementById('btn-signTransaction').addEventListener('click', async function() {
  var resultEl = document.getElementById('result-signTx');
  var signerEl = document.getElementById('result-signTx-signer');
  resultEl.className = 'playground-result';
  signerEl.className = 'playground-result';
  resultEl.textContent = 'Waiting for user approval...';
  signerEl.textContent = '';

  var xdr = document.getElementById('input-signTx-xdr').value;
  var passphrase = document.getElementById('input-signTx-passphrase').value;
  var address = document.getElementById('input-signTx-address').value;

  if (!xdr) {
    resultEl.className = 'playground-result error';
    resultEl.textContent = 'Please enter a transaction XDR';
    return;
  }

  var opts = {};
  if (passphrase) opts.networkPassphrase = passphrase;
  if (address) opts.address = address;

  try {
    var res = await window.freighterApi.signTransaction(xdr, opts);
    if (res.error) {
      resultEl.className = 'playground-result error';
      resultEl.textContent = 'Error: ' + res.error.message;
    } else {
      resultEl.className = 'playground-result success';
      resultEl.textContent = res.signedTxXdr;
      signerEl.className = 'playground-result success';
      signerEl.textContent = res.signerAddress;
    }
  } catch (e) {
    resultEl.className = 'playground-result error';
    resultEl.textContent = 'Error: ' + e.message;
  }
});
</script>
