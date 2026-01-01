// Load saved token on page load
document.addEventListener('DOMContentLoaded', () => {
  const tokenInput = document.getElementById('hfToken');
  const form = document.getElementById('settingsForm');
  const clearBtn = document.getElementById('clearBtn');
  const statusMessage = document.getElementById('statusMessage');

  // Load saved token
  chrome.storage.sync.get(['hfApiToken'], (result) => {
    if (result.hfApiToken) {
      // Show masked version
      tokenInput.value = result.hfApiToken.substring(0, 10) + '...' + result.hfApiToken.substring(-5);
      tokenInput.dataset.saved = result.hfApiToken;
    }
  });

  // Save token
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const token = tokenInput.value.trim();

    if (!token) {
      showStatus('Token cannot be empty', 'error');
      return;
    }

    if (token.length < 10) {
      showStatus('Invalid token format', 'error');
      return;
    }

    // Use saved token if user didn't change it (showing masked version)
    const actualToken = tokenInput.dataset.saved || token;

    chrome.storage.sync.set({ hfApiToken: actualToken }, () => {
      tokenInput.dataset.saved = actualToken;
      tokenInput.value = actualToken.substring(0, 10) + '...' + actualToken.substring(-5);
      showStatus('Token saved successfully!', 'success');
    });
  });

  // Clear token
  clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the saved token?')) {
      chrome.storage.sync.remove('hfApiToken', () => {
        tokenInput.value = '';
        delete tokenInput.dataset.saved;
        showStatus('Token cleared', 'success');
      });
    }
  });

  function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
    setTimeout(() => {
      statusMessage.className = 'status-message';
    }, 4000);
  }
});
