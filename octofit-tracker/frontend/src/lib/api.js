export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const normalized = typeof codespaceName === 'string' ? codespaceName.trim() : '';

  if (normalized && !normalized.toLowerCase().includes('your-codespace-name')) {
    return `https://${normalized}-8000.app.github.dev`;
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

  return [];
}

export async function fetchCollection(resource) {
  const response = await fetch(buildApiUrl(resource));

  if (!response.ok) {
    throw new Error(`Failed to load ${resource}: ${response.status}`);
  }

  const payload = await response.json();
  return normalizeCollection(payload);
}
