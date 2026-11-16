import * as sample from './data/seedData.js';

const BASE = import.meta.env.VITE_API_URL || '/api';
const TOKEN_KEY = 'sd_admin_token';

export const token = {
  get() {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set(value) {
    try {
      localStorage.setItem(TOKEN_KEY, value);
    } catch {
      /* storage unavailable: session lasts until reload */
    }
  },
  clear() {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
  },
};

export class ApiError extends Error {
  constructor(message, status, fields) {
    super(message);
    this.status = status;
    this.fields = fields;
  }
}

// When no API is reachable (e.g. a static preview with no backend), public pages fall back to
// the bundled sample content so the site still renders.
function offlineContent(path) {
  const withIds = (list, tag) =>
    [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((d, i) => ({ _id: `${tag}${i}`, ...d }));
  if (path === '/projects') return withIds(sample.projects, 'p');
  if (path === '/skills') return withIds(sample.skills, 's');
  if (path === '/experience') return withIds(sample.experience, 'e');
  const m = path.match(/^\/projects\/([a-z0-9-]+)$/);
  if (m) {
    const found = withIds(sample.projects, 'p').find((p) => p.slug === m[1]);
    if (found) return found;
    throw new ApiError('Project not found', 404);
  }
  return undefined;
}

export async function api(path, { method = 'GET', body, auth = false } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) {
    const t = token.get();
    if (t) headers.Authorization = `Bearer ${t}`;
  }

  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    const offline = method === 'GET' && !auth ? offlineContent(path) : undefined;
    if (offline !== undefined) return offline;
    throw new ApiError('Could not reach the server. Check your connection.', 0);
  }

  if (res.status === 204) return null;
  const data = await res.json().catch(() => undefined);
  if (method === 'GET' && !auth && (data === undefined || res.status >= 500)) {
    // Not an API response (e.g. the dev server answered with index.html) or the API is down.
    const offline = offlineContent(path);
    if (offline !== undefined) return offline;
  }
  if (!res.ok) throw new ApiError(data?.error || 'Request failed', res.status, data?.fields);
  if (data === undefined) throw new ApiError('Unexpected response from the server', res.status);
  return data;
}
