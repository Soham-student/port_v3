import { useCallback, useEffect, useState } from 'react';
import { api, ApiError } from '../../api.js';

const fmt = (iso) =>
  new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

export default function Messages({ onUnauthorized }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');

  const handle = useCallback(
    (err) => {
      if (err instanceof ApiError && err.status === 401) return onUnauthorized();
      setError(err.message);
    },
    [onUnauthorized]
  );

  const load = useCallback(async () => {
    try {
      setItems(await api('/admin/messages', { auth: true }));
    } catch (err) {
      handle(err);
    }
  }, [handle]);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleRead(m) {
    try {
      const updated = await api(`/admin/messages/${m._id}`, {
        method: 'PATCH',
        body: { read: !m.read },
        auth: true,
      });
      setItems((list) => list.map((x) => (x._id === m._id ? updated : x)));
    } catch (err) {
      handle(err);
    }
  }

  async function remove(m) {
    if (!window.confirm(`Delete the message from ${m.name}?`)) return;
    try {
      await api(`/admin/messages/${m._id}`, { method: 'DELETE', auth: true });
      setItems((list) => list.filter((x) => x._id !== m._id));
    } catch (err) {
      handle(err);
    }
  }

  const unread = items?.filter((m) => !m.read).length ?? 0;

  return (
    <section>
      <div className="admin__head">
        <h2>Messages</h2>
        {items && <p className="a-muted">{unread} unread</p>}
      </div>

      {error && (
        <p className="a-error" role="alert">
          {error}
        </p>
      )}

      {items === null ? (
        <p className="a-muted">Loading…</p>
      ) : items.length === 0 ? (
        <p className="a-muted">No messages yet.</p>
      ) : (
        <ul className="a-list">
          {items.map((m) => (
            <li key={m._id} className={`a-item a-item--msg${m.read ? '' : ' is-unread'}`}>
              <div className="a-msg">
                <p className="a-item__title">
                  {!m.read && <span className="a-dot" aria-label="Unread" />}
                  {m.name}
                  <span className="a-muted"> · {m.email}</span>
                </p>
                <p className="a-muted a-msg__date">{fmt(m.createdAt)}</p>
                {/* React escapes the text; pre-wrap keeps the sender's line breaks. */}
                <p className="a-msg__body">{m.message}</p>
              </div>
              <div className="a-actions">
                <a
                  className="a-btn"
                  href={`mailto:${encodeURIComponent(m.email)}?subject=${encodeURIComponent('Re: your message')}`}
                >
                  Reply
                </a>
                <button className="a-btn" onClick={() => toggleRead(m)}>
                  {m.read ? 'Mark unread' : 'Mark read'}
                </button>
                <button className="a-btn a-btn--danger" onClick={() => remove(m)}>
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
