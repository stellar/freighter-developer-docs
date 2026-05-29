// Shared paste helper for playground pages. Handles missing
// Clipboard API (insecure origins), iOS Safari's NotAllowedError
// (the OS shows its own paste overlay), and real failures.
window.playgroundPaste = async function (inputId, errorElId) {
  var input = document.getElementById(inputId);
  var errorEl = errorElId ? document.getElementById(errorElId) : null;
  if (!navigator.clipboard || typeof navigator.clipboard.readText !== 'function') {
    if (input) input.focus();
    return;
  }
  try {
    input.value = await navigator.clipboard.readText();
  } catch (e) {
    var isNotAllowed = e && (e.name === 'NotAllowedError' || /not allowed/i.test(e.message || ''));
    if (isNotAllowed) return;
    if (errorEl) {
      errorEl.className = 'playground-result error';
      errorEl.textContent = 'Clipboard read failed: ' + (e.message || 'permission denied');
    }
  }
};
