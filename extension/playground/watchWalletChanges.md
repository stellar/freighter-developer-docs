# WatchWalletChanges

`WatchWalletChanges()`

Test Freighter's `WatchWalletChanges` method:

<button class="playground-btn" id="btn-watch">Start watching</button>
<button class="playground-btn" id="btn-stopWatch" disabled>Stop watching</button>

<span class="playground-label">What is your wallet address?</span>
<div class="playground-result" id="result-watch-address">—</div>

<span class="playground-label">What is your wallet network?</span>
<div class="playground-result" id="result-watch-network">—</div>

<span class="playground-label">What is your wallet network passphrase?</span>
<div class="playground-result" id="result-watch-passphrase">—</div>

<script>
(function() {
  var watcher = null;

  document.getElementById('btn-watch').addEventListener('click', function() {
    var addrEl = document.getElementById('result-watch-address');
    var netEl = document.getElementById('result-watch-network');
    var passEl = document.getElementById('result-watch-passphrase');
    var startBtn = document.getElementById('btn-watch');
    var stopBtn = document.getElementById('btn-stopWatch');

    addrEl.className = 'playground-result';
    netEl.className = 'playground-result';
    passEl.className = 'playground-result';
    addrEl.textContent = 'Watching...';
    netEl.textContent = 'Watching...';
    passEl.textContent = 'Watching...';

    try {
      watcher = new window.freighterApi.WatchWalletChanges(1000);
      watcher.watch(function(changes) {
        addrEl.className = 'playground-result success';
        addrEl.textContent = changes.address || '(none)';
        netEl.className = 'playground-result success';
        netEl.textContent = changes.network || '(none)';
        passEl.className = 'playground-result success';
        passEl.textContent = changes.networkPassphrase || '(none)';
      });
      startBtn.disabled = true;
      stopBtn.disabled = false;
    } catch (e) {
      addrEl.className = 'playground-result error';
      addrEl.textContent = 'Error: ' + e.message;
    }
  });

  document.getElementById('btn-stopWatch').addEventListener('click', function() {
    if (watcher) {
      watcher.stop();
      watcher = null;
    }
    document.getElementById('btn-watch').disabled = false;
    document.getElementById('btn-stopWatch').disabled = true;
  });
})();
</script>
