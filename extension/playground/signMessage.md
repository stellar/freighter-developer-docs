# signMessage

`signMessage(message: string, opts: { address: string })`

Test Freighter's `signMessage` method:

The signed message from the response is a base64 encoded string of the signature.

<span class="playground-label">Enter message to sign:</span>
<input class="playground-input" id="input-signMsg-message" placeholder="e.g. Verify account ownership" />

<span class="playground-label">Enter network passphrase (optional):</span>
<input class="playground-input" id="input-signMsg-passphrase" placeholder="e.g. Test SDF Network ; September 2015" />

<span class="playground-label">Request signature from specific public key (optional):</span>
<input class="playground-input" id="input-signMsg-address" placeholder="G..." />

<button class="playground-btn" id="btn-signMessage">Sign message</button>

<span class="playground-label">Result:</span>
<div class="playground-result" id="result-signMsg">Click the button to test</div>

<span class="playground-label">Signer address:</span>
<div class="playground-result" id="result-signMsg-signer"></div>

### Verifying the signature

```javascript
const kp = <signing key pair>
const message = "hi";
const res = await stellarApi.signMessage(message, {
  networkPassphrase: SorobanClient.Networks.TESTNET
});
const SIGN_MESSAGE_PREFIX = "Stellar Signed Message:\n";
const messageHash = SHA256(SIGN_MESSAGE_PREFIX + message);
const passes = kp.verify(Buffer.from(messageHash, "base64"), res.signedMessage);
// true
```

<script>
document.getElementById('btn-signMessage').addEventListener('click', async function() {
  var resultEl = document.getElementById('result-signMsg');
  var signerEl = document.getElementById('result-signMsg-signer');
  resultEl.className = 'playground-result';
  signerEl.className = 'playground-result';
  resultEl.textContent = 'Waiting for user approval...';
  signerEl.textContent = '';

  var message = document.getElementById('input-signMsg-message').value;
  var passphrase = document.getElementById('input-signMsg-passphrase').value;
  var address = document.getElementById('input-signMsg-address').value;

  if (!message) {
    resultEl.className = 'playground-result error';
    resultEl.textContent = 'Please enter a message';
    return;
  }

  var opts = {};
  if (passphrase) opts.networkPassphrase = passphrase;
  if (address) opts.address = address;

  try {
    var res = await window.freighterApi.signMessage(message, opts);
    if (res.error) {
      resultEl.className = 'playground-result error';
      resultEl.textContent = 'Error: ' + res.error.message;
    } else {
      resultEl.className = 'playground-result success';
      resultEl.textContent = res.signedMessage;
      signerEl.className = 'playground-result success';
      signerEl.textContent = res.signerAddress;
    }
  } catch (e) {
    resultEl.className = 'playground-result error';
    resultEl.textContent = 'Error: ' + e.message;
  }
});
</script>
