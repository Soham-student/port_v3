import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, ApiError, token } from '../../api.js';
import Messages from './Messages.jsx';
import Resource from './Resource.jsx';

const tabs = [
  { id: 'messages', label: 'Messages' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
];

const resources = {
  projects: {
    title: 'Project',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'URL slug (optional, e.g. orbit — made from the title if empty)', type: 'text' },
      { name: 'description', label: 'One-line summary', type: 'textarea', required: true },
      { name: 'role', label: 'Role', type: 'text' },
      { name: 'tags', label: 'Tags (comma separated)', type: 'list' },
      { name: 'year', label: 'Year', type: 'number', required: true },
      { name: 'featured', label: 'Show the “Featured” label', type: 'checkbox' },
      { name: 'image', label: 'Cover image (https:// link or /path — optional, artwork is generated if empty)', type: 'text' },
      { name: 'overview', label: 'Case study: Overview', type: 'textarea' },
      { name: 'challenge', label: 'Case study: The challenge', type: 'textarea' },
      { name: 'approach', label: 'Case study: The approach', type: 'textarea' },
      { name: 'url', label: 'Live site link (https://…, optional)', type: 'text' },
      { name: 'repo', label: 'Source code link (https://…, optional)', type: 'text' },
      { name: 'order', label: 'Order (lower shows first)', type: 'number' },
    ],
    blank: {
      title: '', slug: '', description: '', role: 'Full-stack developer', tags: [],
      year: new Date().getFullYear(), featured: false, image: '', overview: '', challenge: '',
      approach: '', url: '', repo: '', order: 0,
    },
    summary: (p) => `${p.year} · ${p.tags.join(', ')}`,
  },
  experience: {
    title: 'Experience entry',
    fields: [
      { name: 'period', label: 'Period (e.g. 2024 — Present)', type: 'text', required: true },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'org', label: 'Label (e.g. University coursework)', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'order', label: 'Order (lower shows first)', type: 'number' },
    ],
    blank: { period: '', title: '', org: '', description: '', order: 0 },
    summary: (e) => `${e.period} · ${e.org}`,
  },
  skills: {
    title: 'Skill group',
    fields: [
      { name: 'title', label: 'Group name', type: 'text', required: true },
      { name: 'items', label: 'Items (one per line)', type: 'lines' },
      { name: 'order', label: 'Order (lower shows first)', type: 'number' },
    ],
    blank: { title: '', items: [], order: 0 },
    summary: (g) => g.items.join(', '),
  },
};

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await api('/auth/login', { method: 'POST', body: { email, password } });
      token.set(res.token);
      onLogin(res.email);
    } catch (err) {
      setError(err instanceof ApiError && err.status === 400 ? 'Enter a valid email and password' : err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin admin--center">
      <form className="admin-card login" onSubmit={submit}>
        <p className="mono admin-eyebrow">Admin</p>
        <h1>Sign in</h1>
        <label className="a-field">
          <span className="mono">Email</span>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="a-field">
          <span className="mono">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <p className="a-error" role="alert">
          {error}
        </p>
        <button className="a-btn a-btn--solid" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        <Link to="/" className="a-link">
          ← Back to site
        </Link>
      </form>
    </div>
  );
}

export default function AdminApp() {
  const [user, setUser] = useState(undefined); // undefined = checking, null = signed out
  const [tab, setTab] = useState('messages');

  useEffect(() => {
    document.title = 'Admin — Soham Dengale';
    if (!token.get()) {
      setUser(null);
      return;
    }
    api('/auth/me', { auth: true })
      .then((r) => setUser(r.email))
      .catch(() => {
        token.clear();
        setUser(null);
      });
  }, []);

  const logout = useCallback(() => {
    token.clear();
    setUser(null);
  }, []);

  if (user === undefined) return <div className="admin admin--center">Loading…</div>;
  if (user === null) return <Login onLogin={setUser} />;

  return (
    <div className="admin">
      <header className="admin__bar">
        <div>
          <p className="mono admin-eyebrow">Admin</p>
          <p className="admin__user">{user}</p>
        </div>
        <div className="admin__bar-actions">
          <Link to="/" className="a-link">
            View site
          </Link>
          <button className="a-btn" onClick={logout}>
            Sign out
          </button>
        </div>
      </header>

      <nav className="admin__tabs" role="tablist" aria-label="Sections">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`mono${tab === t.id ? ' is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="admin__main">
        {tab === 'messages' ? (
          <Messages onUnauthorized={logout} />
        ) : (
          <Resource key={tab} name={tab} config={resources[tab]} onUnauthorized={logout} />
        )}
      </main>
    </div>
  );
}
