# isConnected

`isConnected()`

Test Freighter's `isConnected` method:

**Is Freighter currently connected to your browser?**

<button class="playground-btn" id="btn-isConnected">Check Connection</button>

<div class="playground-result" id="result-isConnected">Click the button to test</div>

<script>
document.getElementById('btn-isConnected').addEventListener('click', async function() {
  var el = document.getElementById('result-isConnected');
  el.className = 'playground-result';
  el.textContent = 'Loading...';
  try {
    var res = await window.freighterApi.isConnected();
    if (res.error) {
      el.className = 'playground-result error';
      el.textContent = 'Error: ' + res.error.message;
    } else {
      el.className = 'playground-result success';
      el.textContent = 'isConnected: ' + res.isConnected;
    }
  } catch (e) {
    el.className = 'playground-result error';
    el.textContent = 'Error: ' + e.message;
  }
});
</script>
