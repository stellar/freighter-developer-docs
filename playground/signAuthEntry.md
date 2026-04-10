# signAuthEntry

`signAuthEntry(entryXdr: string, opts: { address: string })`

Test Freighter's `signAuthEntry` method:

<span class="playground-label">Enter entry preimage XDR:</span>
<input class="playground-input" id="input-signAuth-xdr" placeholder="Base64-encoded HashIdPreimage XDR" />

<span class="playground-label">Enter network passphrase (optional):</span>
<input class="playground-input" id="input-signAuth-passphrase" placeholder="e.g. Test SDF Network ; September 2015" />

<span class="playground-label">Request signature from specific public key (optional):</span>
<input class="playground-input" id="input-signAuth-address" placeholder="G..." />

<button class="playground-btn" id="btn-signAuthEntry">Sign Authorization Entry XDR</button>

<span class="playground-label">Result:</span>
<div class="playground-result" id="result-signAuth">Click the button to test</div>

<span class="playground-label">Signer address:</span>
<div class="playground-result" id="result-signAuth-signer"></div>

<script>
document.getElementById('btn-signAuthEntry').addEventListener('click', async function() {
  var resultEl = document.getElementById('result-signAuth');
  var signerEl = document.getElementById('result-signAuth-signer');
  resultEl.className = 'playground-result';
  signerEl.className = 'playground-result';
  resultEl.textContent = 'Waiting for user approval...';
  signerEl.textContent = '';

  var entryXdr = document.getElementById('input-signAuth-xdr').value;
  var passphrase = document.getElementById('input-signAuth-passphrase').value;
  var address = document.getElementById('input-signAuth-address').value;

  if (!entryXdr) {
    resultEl.className = 'playground-result error';
    resultEl.textContent = 'Please enter an entry preimage XDR';
    return;
  }

  var opts = {};
  if (passphrase) opts.networkPassphrase = passphrase;
  if (address) opts.address = address;

  try {
    var res = await window.freighterApi.signAuthEntry(entryXdr, opts);
    if (res.error) {
      resultEl.className = 'playground-result error';
      resultEl.textContent = 'Error: ' + res.error.message;
    } else {
      resultEl.className = 'playground-result success';
      resultEl.textContent = res.signedAuthEntry;
      signerEl.className = 'playground-result success';
      signerEl.textContent = res.signerAddress;
    }
  } catch (e) {
    resultEl.className = 'playground-result error';
    resultEl.textContent = 'Error: ' + e.message;
  }
});
</script>
