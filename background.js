/**
 * Background service worker: forwards prompts to the Supabase Edge Function
 * and returns the streamed text back to the popup client.
 */

const SUPABASE_FUNCTION_URL = 'https://dfzwlqpyjzeibuvilmcd.supabase.co/functions/v1/ai-proxy';

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request?.action !== 'generate') {
    return false;
  }

  forwardPrompt(request.prompt)
    .then((text) => sendResponse({ success: true, text }))
    .catch((error) => sendResponse({ success: false, error: error.message || 'Request failed.' }));

  return true; // keep the message channel open for the async response
});

async function forwardPrompt(prompt) {
  if (!prompt) {
    throw new Error('Prompt is required.');
  }

  const response = await fetch(SUPABASE_FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Proxy ${response.status}: ${body || 'No details'}`);
  }

  const payload = await response.json();

  if (!payload?.success || !payload?.text) {
    throw new Error(payload?.error || 'Invalid proxy response.');
  }

  return payload.text;
}
