import { useState, useEffect } from "react";
import { api, ApiError } from "../api.js";
import { contactCopy } from "../content.js";
import { Arrow } from "./Hero.jsx";

const empty = { name: "", email: "", message: "", website: "" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({
    state: "idle",
    error: "",
    fields: {},
  });
  const [isProjectInquiry, setIsProjectInquiry] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("projectInquiry") === "true") {
        setIsProjectInquiry(true);
        sessionStorage.removeItem("projectInquiry");
      }
    } catch {}
  }, []);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    if (status.state === "sending") return;
    setStatus({ state: "sending", error: "", fields: {} });
    try {
      await api("/contact", { method: "POST", body: form });
      setForm(empty);
      setStatus({ state: "sent", error: "", fields: {} });
    } catch (err) {
      const fields = err instanceof ApiError && err.fields ? err.fields : {};
      setStatus({ state: "error", error: err.message, fields });
    }
  }

  const fieldError = (k) => status.fields[k];

  return (
    <section className='contact' id='contact'>
      <div className='container contact__grid'>
        <div className='contact__intro'>
          <h2 className='contact__title'>
            {isProjectInquiry ? (
              <>
                Want to know
                <br />
                more about
                <br />
                this project ?
              </>
            ) : (
              <>
                {contactCopy.title[0]}
                <br />
                {contactCopy.title[1]}
              </>
            )}
          </h2>
          <p className='contact__body'>{contactCopy.body}</p>
        </div>

        <form className='form' onSubmit={submit} noValidate>
          <div className='form__pair'>
            <div className='field'>
              <label className='mono' htmlFor='c-name'>
                Name
              </label>
              <input
                id='c-name'
                name='name'
                type='text'
                autoComplete='name'
                placeholder='Your name'
                value={form.name}
                onChange={set("name")}
                aria-invalid={Boolean(fieldError("name"))}
                aria-describedby={fieldError("name") ? "c-name-err" : undefined}
                required
              />
              {fieldError("name") && (
                <p className='field__err' id='c-name-err'>
                  {fieldError("name")}
                </p>
              )}
            </div>
            <div className='field'>
              <label className='mono' htmlFor='c-email'>
                Email
              </label>
              <input
                id='c-email'
                name='email'
                type='email'
                autoComplete='email'
                placeholder='you@company.com'
                value={form.email}
                onChange={set("email")}
                aria-invalid={Boolean(fieldError("email"))}
                aria-describedby={
                  fieldError("email") ? "c-email-err" : undefined
                }
                required
              />
              {fieldError("email") && (
                <p className='field__err' id='c-email-err'>
                  {fieldError("email")}
                </p>
              )}
            </div>
          </div>

          <div className='field'>
            <label className='mono' htmlFor='c-message'>
              Message
            </label>
            <textarea
              id='c-message'
              name='message'
              rows='5'
              placeholder='What shall we discuss ?'
              value={form.message}
              onChange={set("message")}
              aria-invalid={Boolean(fieldError("message"))}
              aria-describedby={
                fieldError("message") ? "c-message-err" : undefined
              }
              required
            />
            {fieldError("message") && (
              <p className='field__err' id='c-message-err'>
                {fieldError("message")}
              </p>
            )}
          </div>

          {/* Honeypot: hidden from people and assistive tech, bots tend to fill it in. */}
          <div className='hp' aria-hidden='true'>
            <label htmlFor='c-website'>Website</label>
            <input
              id='c-website'
              name='website'
              type='text'
              tabIndex={-1}
              autoComplete='off'
              value={form.website}
              onChange={set("website")}
            />
          </div>

          <div className='form__actions'>
            <button
              type='submit'
              className='btn btn--cream mono'
              disabled={status.state === "sending"}>
              {status.state === "sending" ? "Sending…" : "Send message"}{" "}
              <Arrow />
            </button>
            <p className='form__status' role='status' aria-live='polite'>
              {status.state === "sent" &&
                "Thanks — your message is in. I’ll reply soon."}
              {status.state === "error" && status.error}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
