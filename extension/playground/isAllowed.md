# isAllowed

`isAllowed()`

Test Freighter's `isAllowed` method:

**Is Freighter allowed to transmit data to this dapp?**

<button class="playground-btn" id="btn-isAllowed">Check Allowed Status</button>

<div class="playground-result" id="result-isAllowed">Click the button to test</div>

<script>
document.getElementById('btn-isAllowed').addEventListener('click', async function() {
  var el = document.getElementById('result-isAllowed');
  el.className = 'playground-result';
  el.textContent = 'Loading...';
  try {
    var res = await window.freighterApi.isAllowed();
    if (res.error) {
      el.className = 'playground-result error';
      el.textContent = 'Error: ' + res.error.message;
    } else {
      el.className = 'playground-result success';
      el.textContent = 'isAllowed: ' + res.isAllowed;
    }
  } catch (e) {
    el.className = 'playground-result error';
    el.textContent = 'Error: ' + e.message;
  }
});
</script>
