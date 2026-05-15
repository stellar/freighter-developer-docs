# signMessage

`signMessage(message: string, opts?: { networkPassphrase?: string; address?: string })`

Test Freighter's `signMessage` method:

The signed message from the response is a base64 encoded string of the signature.

<span class="playground-label">Enter message to sign:</span>
<div style="display: flex; gap: 8px; margin: 4px 0 8px 0;">
  <input class="playground-input" id="input-signMsg-message" placeholder="e.g. Verify account ownership" style="margin: 0; flex: 1;" />
  <button class="playground-btn" id="btn-paste-signMsg-message" type="button" style="margin: 0; white-space: nowrap;">Paste</button>
</div>

<span class="playground-label">Enter network passphrase (optional):</span>
<div style="display: flex; gap: 8px; margin: 4px 0 8px 0;">
  <input class="playground-input" id="input-signMsg-passphrase" placeholder="e.g. Test SDF Network ; September 2015" style="margin: 0; flex: 1;" />
  <button class="playground-btn" id="btn-paste-signMsg-passphrase" type="button" style="margin: 0; white-space: nowrap;">Paste</button>
</div>

<span class="playground-label">Request signature from specific public key (optional):</span>
<div style="display: flex; gap: 8px; margin: 4px 0 8px 0;">
  <input class="playground-input" id="input-signMsg-address" placeholder="G..." style="margin: 0; flex: 1;" />
  <button class="playground-btn" id="btn-paste-signMsg-address" type="button" style="margin: 0; white-space: nowrap;">Paste</button>
</div>

<button class="playground-btn" id="btn-signMessage">Sign message</button>

<span class="playground-label">Result:</span>
<div class="playground-result" id="result-signMsg">Click the button to test</div>

<span class="playground-label">Signer address:</span>
<div class="playground-result" id="result-signMsg-signer"></div>

### Verifying the signature

`res.signedMessage` is a base64-encoded 64-byte Ed25519 signature over
`SHA256("Stellar Signed Message:\n" + message)`. Reconstruct the same hash
bytes and verify with the signer's `Keypair`:

```javascript
import { Keypair, hash } from "@stellar/stellar-sdk";
import { signMessage } from "@stellar/freighter-api";

const message = "hi";
const res = await signMessage(message);
// res.signedMessage is a base64 string, res.signerAddress is the G... public key

const SIGN_MESSAGE_PREFIX = "Stellar Signed Message:\n";
const messageHash = hash(Buffer.from(SIGN_MESSAGE_PREFIX + message, "utf8"));
const signatureBytes = Buffer.from(res.signedMessage, "base64");

const kp = Keypair.fromPublicKey(res.signerAddress);
const passes = kp.verify(messageHash, signatureBytes);
// true
```

<script>
document.getElementById('btn-paste-signMsg-message').addEventListener('click', function() {
  window.playgroundPaste('input-signMsg-message', 'result-signMsg');
});
document.getElementById('btn-paste-signMsg-passphrase').addEventListener('click', function() {
  window.playgroundPaste('input-signMsg-passphrase', 'result-signMsg');
});
document.getElementById('btn-paste-signMsg-address').addEventListener('click', function() {
  window.playgroundPaste('input-signMsg-address', 'result-signMsg');
});

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
