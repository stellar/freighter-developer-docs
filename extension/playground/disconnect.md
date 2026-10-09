# disconnect

`disconnect()`

Test Freighter's `disconnect` method:

**Remove this app from Freighter's Allow List for the active account and network.**

<button class="playground-btn" id="btn-disconnect">Disconnect</button>

<div class="playground-result" id="result-disconnect">Click the button to test</div>

<script>
document.getElementById('btn-disconnect').addEventListener('click', async function() {
  var el = document.getElementById('result-disconnect');
  el.className = 'playground-result';
  el.textContent = 'Disconnecting...';
  if (typeof window.freighterApi.disconnect !== 'function') {
    el.className = 'playground-result error';
    el.textContent = 'Error: the loaded version of @stellar/freighter-api does not include disconnect()';
    return;
  }
  try {
    var res = await window.freighterApi.disconnect();
    if (res.error) {
      el.className = 'playground-result error';
      el.textContent = 'Error: ' + res.error.message;
    } else {
      el.className = 'playground-result success';
      el.textContent = 'Disconnected';
    }
  } catch (e) {
    el.className = 'playground-result error';
    el.textContent = 'Error: ' + e.message;
  }
});
</script>
