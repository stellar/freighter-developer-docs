# requestAccess

`requestAccess()`

Test Freighter's `requestAccess` method:

<button class="playground-btn" id="btn-requestAccess">Request Access</button>

<span class="playground-label">What is your public key?</span>
<div class="playground-result" id="result-requestAccess">Click the button to test</div>

<script>
document.getElementById('btn-requestAccess').addEventListener('click', async function() {
  var el = document.getElementById('result-requestAccess');
  el.className = 'playground-result';
  el.textContent = 'Waiting for user approval...';
  try {
    var res = await window.freighterApi.requestAccess();
    if (res.error) {
      el.className = 'playground-result error';
      el.textContent = 'Error: ' + res.error.message;
    } else {
      el.className = 'playground-result success';
      el.textContent = res.address;
    }
  } catch (e) {
    el.className = 'playground-result error';
    el.textContent = 'Error: ' + e.message;
  }
});
</script>
