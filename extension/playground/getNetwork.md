# getNetwork

`getNetwork()`

Test Freighter's `getNetwork` method:

<button class="playground-btn" id="btn-getNetwork">Get Network</button>

<span class="playground-label">What network is Freighter using?</span>
<div class="playground-result" id="result-getNetwork-name">Click the button to test</div>

<span class="playground-label">What network passphrase is Freighter using?</span>
<div class="playground-result" id="result-getNetwork-passphrase"></div>

<script>
document.getElementById('btn-getNetwork').addEventListener('click', async function() {
  var nameEl = document.getElementById('result-getNetwork-name');
  var passEl = document.getElementById('result-getNetwork-passphrase');
  nameEl.className = 'playground-result';
  passEl.className = 'playground-result';
  nameEl.textContent = 'Loading...';
  passEl.textContent = '';
  try {
    var res = await window.freighterApi.getNetwork();
    if (res.error) {
      nameEl.className = 'playground-result error';
      nameEl.textContent = 'Error: ' + res.error.message;
    } else {
      nameEl.className = 'playground-result success';
      nameEl.textContent = res.network;
      passEl.className = 'playground-result success';
      passEl.textContent = res.networkPassphrase;
    }
  } catch (e) {
    nameEl.className = 'playground-result error';
    nameEl.textContent = 'Error: ' + e.message;
  }
});
</script>
