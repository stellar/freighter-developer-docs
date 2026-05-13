# getNetworkDetails

`getNetworkDetails()`

Test Freighter's `getNetworkDetails` method:

<button class="playground-btn" id="btn-getNetworkDetails">Get Network Details</button>

<span class="playground-label">What network is Freighter using?</span>
<div class="playground-result" id="result-getNetworkDetails">Click the button to test</div>

<script>
document.getElementById('btn-getNetworkDetails').addEventListener('click', async function() {
  var el = document.getElementById('result-getNetworkDetails');
  el.className = 'playground-result';
  el.textContent = 'Loading...';
  try {
    var res = await window.freighterApi.getNetworkDetails();
    if (res.error) {
      el.className = 'playground-result error';
      el.textContent = 'Error: ' + res.error.message;
    } else {
      el.className = 'playground-result success';
      el.textContent = JSON.stringify({
        network: res.network,
        networkUrl: res.networkUrl,
        networkPassphrase: res.networkPassphrase,
        sorobanRpcUrl: res.sorobanRpcUrl
      }, null, 2);
    }
  } catch (e) {
    el.className = 'playground-result error';
    el.textContent = 'Error: ' + e.message;
  }
});
</script>
