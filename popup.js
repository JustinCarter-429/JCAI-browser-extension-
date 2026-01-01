/**
 * Popup client: renders a minimal chat UI and forwards prompts to background.js.
 * No offline models or caching; everything flows through the Supabase serverless layer.
 */

const chatMessages = document.getElementById('chatMessages');
const promptInput = document.getElementById('promptInput');
const sendBtn = document.getElementById('sendBtn');
const clearChatBtn = document.getElementById('clearChatBtn');

const SYSTEM_MESSAGE = 'Type a prompt to start the conversation.';
let isSending = false;

document.addEventListener('DOMContentLoaded', () => {
  focusInput();
  autoResize();
});

clearChatBtn.addEventListener('click', () => {
  chatMessages.innerHTML = '';
  addMessage('system', SYSTEM_MESSAGE);
  focusInput();
});

sendBtn.addEventListener('click', handleSend);

promptInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    handleSend();
  }
});

promptInput.addEventListener('input', autoResize);

function focusInput() {
  promptInput.focus();
}

function autoResize() {
  promptInput.style.height = 'auto';
  promptInput.style.height = `${Math.min(promptInput.scrollHeight, 120)}px`;
}

function handleSend() {
  const text = promptInput.value.trim();
  if (!text || isSending) {
    return;
  }

  addMessage('user', text);
  promptInput.value = '';
  autoResize();
  focusInput();

  isSending = true;
  sendBtn.disabled = true;

  const thinkingMessage = addMessage('ai', 'AI is thinking...', { thinking: true });

  chrome.runtime.sendMessage({ action: 'generate', prompt: text }, (response) => {
    isSending = false;
    sendBtn.disabled = false;

    if (chrome.runtime.lastError) {
      replaceThinking(thinkingMessage, `Background error: ${chrome.runtime.lastError.message}`, true);
      return;
    }

    if (!response) {
      replaceThinking(thinkingMessage, 'No response from background script.', true);
      return;
    }

    if (response.success) {
      replaceThinking(thinkingMessage, response.text);
    } else {
      const err = response.error || 'Unknown error occurred.';
      replaceThinking(thinkingMessage, `Error: ${err}`, true);
    }
  });
}

function addMessage(role, text, options = {}) {
  const bubble = document.createElement('div');
  bubble.className = `message ${role}`;

  if (options.thinking) {
    bubble.classList.add('thinking');
  }

  const textEl = document.createElement('div');
  textEl.className = 'text';
  textEl.textContent = text;
  bubble.appendChild(textEl);

  const allowCopy = role !== 'system';
  if (allowCopy) {
    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.addEventListener('click', () => handleCopy(textEl, copyBtn));
    bubble.appendChild(copyBtn);
  }

  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return bubble;
}

function replaceThinking(bubble, newText, forceSystem = false) {
  if (!bubble) {
    return;
  }

  const textEl = bubble.querySelector('.text');
  if (textEl) {
    textEl.textContent = newText;
  }

  bubble.classList.remove('thinking');

  if (forceSystem) {
    bubble.classList.remove('ai');
    bubble.classList.add('system');
    const copyBtn = bubble.querySelector('.copy-btn');
    if (copyBtn) {
      copyBtn.remove();
    }
  }
}

function handleCopy(textEl, button) {
  const value = textEl.textContent || '';
  navigator.clipboard.writeText(value).then(() => {
    button.textContent = 'Copied';
    setTimeout(() => {
      button.textContent = 'Copy';
    }, 1200);
  }).catch(() => {
    button.textContent = 'Error';
    setTimeout(() => {
      button.textContent = 'Copy';
    }, 1200);
  });
}

// Seed the conversation with the system hint when the popup opens.
addMessage('system', SYSTEM_MESSAGE);
