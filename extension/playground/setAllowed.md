# setAllowed

`setAllowed()`

Test Freighter's `setAllowed` method:

**Prompt the user to add this app to Freighter's Allow List.**

<button class="playground-btn" id="btn-setAllowed">Set Allowed</button>

<div class="playground-result" id="result-setAllowed">Click the button to test</div>

<script>
document.getElementById('btn-setAllowed').addEventListener('click', async function() {
  var el = document.getElementById('result-setAllowed');
  el.className = 'playground-result';
  el.textContent = 'Waiting for user approval...';
  try {
    var res = await window.freighterApi.setAllowed();
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
