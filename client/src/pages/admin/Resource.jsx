import { useCallback, useEffect, useState } from 'react';
import { api, ApiError } from '../../api.js';

// Form state keeps list fields as plain strings; convert on the way in and out.
const toForm = (item, fields) =>
  Object.fromEntries(
    fields.map((f) => {
      const v = item[f.name];
      if (f.type === 'list') return [f.name, (v ?? []).join(', ')];
      if (f.type === 'lines') return [f.name, (v ?? []).join('\n')];
      if (f.type === 'checkbox') return [f.name, Boolean(v)];
      return [f.name, v ?? ''];
    })
  );

const fromForm = (form, fields) =>
  Object.fromEntries(
    fields.map((f) => {
      const v = form[f.name];
      if (f.type === 'list') return [f.name, v.split(',').map((s) => s.trim()).filter(Boolean)];
      if (f.type === 'lines') return [f.name, v.split('\n').map((s) => s.trim()).filter(Boolean)];
      if (f.type === 'number') return [f.name, v === '' ? 0 : Number(v)];
      return [f.name, v];
    })
  );

export default function Resource({ name, config, onUnauthorized }) {
  const { fields, blank, title, summary } = config;
  const [items, setItems] = useState(null);
  const [editing, setEditing] = useState(null); // null | 'new' | item
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const handle = useCallback(
    (err) => {
      if (err instanceof ApiError && err.status === 401) return onUnauthorized();
      setError(err.message);
      setFieldErrors(err.fields || {});
    },
    [onUnauthorized]
  );

  const load = useCallback(async () => {
    try {
      setItems(await api(`/${name}`));
    } catch (err) {
      handle(err);
    }
  }, [name, handle]);

  useEffect(() => {
    load();
  }, [load]);

  function open(item) {
    setError('');
    setFieldErrors({});
    setEditing(item);
    setForm(toForm(item === 'new' ? blank : item, fields));
  }

  function close() {
    setEditing(null);
    setForm(null);
    setError('');
    setFieldErrors({});
  }

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    setFieldErrors({});
    try {
      const body = fromForm(form, fields);
      if (editing === 'new') {
        await api(`/admin/${name}`, { method: 'POST', body, auth: true });
      } else {
        await api(`/admin/${name}/${editing._id}`, { method: 'PUT', body, auth: true });
      }
      close();
      await load();
    } catch (err) {
      handle(err);
    } finally {
      setBusy(false);
    }
  }

  async function remove(item) {
    if (!window.confirm(`Delete "${item.title}"? This can't be undone.`)) return;
    try {
      await api(`/admin/${name}/${item._id}`, { method: 'DELETE', auth: true });
      await load();
    } catch (err) {
      handle(err);
    }
  }

  return (
    <section>
      <div className="admin__head">
        <h2>{name[0].toUpperCase() + name.slice(1)}</h2>
        {!editing && (
          <button className="a-btn a-btn--solid" onClick={() => open('new')}>
            + Add {title.toLowerCase()}
          </button>
        )}
      </div>

      {error && !editing && (
        <p className="a-error" role="alert">
          {error}
        </p>
      )}

      {editing ? (
        <form className="admin-card" onSubmit={save}>
          <h3>{editing === 'new' ? `New ${title.toLowerCase()}` : `Edit ${title.toLowerCase()}`}</h3>
          {fields.map((f) => (
            <label className="a-field" key={f.name}>
              <span className="mono">{f.label}</span>
              {f.type === 'checkbox' ? (
                <input
                  type="checkbox"
                  className="a-check"
                  checked={form[f.name]}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.checked })}
                />
              ) : f.type === 'textarea' || f.type === 'lines' ? (
                <textarea
                  rows={f.type === 'lines' ? 6 : 4}
                  value={form[f.name]}
                  required={f.required}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                />
              ) : (
                <input
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={form[f.name]}
                  required={f.required}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                />
              )}
              {fieldErrors[f.name] && <span className="a-error">{fieldErrors[f.name]}</span>}
            </label>
          ))}
          {error && (
            <p className="a-error" role="alert">
              {error}
            </p>
          )}
          <div className="a-actions">
            <button className="a-btn a-btn--solid" disabled={busy}>
              {busy ? 'Saving…' : 'Save'}
            </button>
            <button type="button" className="a-btn" onClick={close}>
              Cancel
            </button>
          </div>
        </form>
      ) : items === null ? (
        <p className="a-muted">Loading…</p>
      ) : items.length === 0 ? (
        <p className="a-muted">Nothing here yet.</p>
      ) : (
        <ul className="a-list">
          {items.map((item) => (
            <li key={item._id} className="a-item">
              <div>
                <p className="a-item__title">{item.title}</p>
                <p className="a-muted">{summary(item)}</p>
              </div>
              <div className="a-actions">
                <button className="a-btn" onClick={() => open(item)}>
                  Edit
                </button>
                <button className="a-btn a-btn--danger" onClick={() => remove(item)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
