# getAddress

`getAddress()`

Test Freighter's `getAddress` method:

<button class="playground-btn" id="btn-getAddress">Get Address</button>

<span class="playground-label">What is your wallet address?</span>
<div class="playground-result" id="result-getAddress">Click the button to test</div>

<script>
document.getElementById('btn-getAddress').addEventListener('click', async function() {
  var el = document.getElementById('result-getAddress');
  el.className = 'playground-result';
  el.textContent = 'Loading...';
  try {
    var res = await window.freighterApi.getAddress();
    if (res.error) {
      el.className = 'playground-result error';
      el.textContent = 'Error: ' + res.error.message;
    } else {
      el.className = 'playground-result success';
      el.textContent = res.address || '(empty — app may not be authorized)';
    }
  } catch (e) {
    el.className = 'playground-result error';
    el.textContent = 'Error: ' + e.message;
  }
});
</script>
