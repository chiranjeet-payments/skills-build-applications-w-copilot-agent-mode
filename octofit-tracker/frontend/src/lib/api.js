export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const normalized = typeof codespaceName === 'string' ? codespaceName.trim() : '';

  if (normalized && !normalized.toLowerCase().includes('your-codespace-name')) {
    return `https://${normalized}-8000.app.github.dev`;
  }

  if (typeof window !== 'undefined' && window.location.hostname.endsWith('.app.github.dev')) {
    return `https://${window.location.hostname.replace(/-\d+\.app\.github\.dev$/, '-8000.app.github.dev')}`;
  }

  return 'http://localhost:8000';
}

export function buildApiUrl(resource) {
  const safeResource = String(resource).replace(/^\/+|\/+$/g, '');
  return `${getApiBaseUrl()}/api/${safeResource}/`;
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.docs)) return payload.docs;

  return [];
}

export async function fetchCollection(resource) {
  const url = buildApiUrl(resource);

  let response;
  try {
    response = await fetch(url);
  } catch (networkError) {
    throw new Error(`Network error while loading ${resource}: ${networkError.message}`);
  }

  if (!response.ok) {
    throw new Error(`Failed to load ${resource}: ${response.status}`);
  }

  const payload = await response.json();
  return normalizeCollection(payload);
}
