import React, { useRef, useState } from 'react';
import { Button, IconButton } from '@shared/ui/Button.jsx';
import { Icon } from '@shared/ui/Icon.jsx';
import { validateLogin } from '../domain/loginRules.js';
import { demoCredentials } from '../services/demoAuthService.js';

export function LoginForm({ phase, onSignIn, onClearError }) {
  const [fields, setFields] = useState({ mobile: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [visiblePassword, setVisiblePassword] = useState(false);
  const form = useRef(null);
  const busy = phase === 'checking';

  function updateField(field, value) {
    setFields(previous => ({ ...previous, [field]: value }));
    if (errors[field]) setErrors(previous => ({ ...previous, [field]: undefined }));
    if (field !== 'remember') onClearError();
  }

  function fillDemo() {
    setFields(previous => ({ ...previous, ...demoCredentials }));
    setVisiblePassword(false);
    setErrors({});
    onClearError();
  }

  function submit(event) {
    event.preventDefault();
    if (busy) return;

    const nextErrors = validateLogin(fields);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      form.current.elements.namedItem(firstInvalid).focus();
      return;
    }
    onSignIn(fields);
  }

  return (
    <form className="auth-form" ref={form} onSubmit={submit} autoComplete="off" noValidate>
      <div className="auth-field">
        <label htmlFor="auth-mobile">Mobile number</label>
        <div className="auth-input">
          <Icon name="mobile" size={18} />
          <input id="auth-mobile" name="mobile" type="tel" inputMode="numeric" autoComplete="off"
            placeholder="Enter 10-digit number" value={fields.mobile} readOnly={busy} required
            aria-invalid={Boolean(errors.mobile)} aria-describedby={errors.mobile ? 'auth-mobile-error' : undefined}
            onChange={event => updateField('mobile', event.target.value)} />
        </div>
        <div aria-live="polite" id="auth-mobile-error">
          {errors.mobile && <p className="auth-error">{errors.mobile}</p>}
        </div>
      </div>
      <div className="auth-field">
        <label htmlFor="auth-password">Password</label>
        <div className="auth-input">
          <Icon name="lock" size={18} />
          <input id="auth-password" name="password" type={visiblePassword ? 'text' : 'password'}
            autoComplete="off" placeholder="Enter your password" value={fields.password} readOnly={busy} required
            aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'auth-password-error' : undefined}
            onChange={event => updateField('password', event.target.value)} />
          <IconButton className="auth-password-toggle" name={visiblePassword ? 'eyeoff' : 'eye'}
            aria-controls="auth-password" label={visiblePassword ? 'Hide password' : 'Show password'}
            onClick={() => setVisiblePassword(visible => !visible)} />
        </div>
        <div aria-live="polite" id="auth-password-error">
          {errors.password && <p className="auth-error">{errors.password}</p>}
        </div>
      </div>
      <div className="auth-options">
        <label className="auth-remember">
          <input type="checkbox" checked={fields.remember} disabled={busy}
            onChange={event => updateField('remember', event.target.checked)} />
          Keep me signed in
        </label>
        <span className="auth-reset-note">Password reset unavailable</span>
      </div>
      <div className="auth-submit-group">
        <Button className="btn auth-submit" type="submit" disabled={busy}
          label={<><span>{busy ? 'Signing in…' : 'Sign in'}</span>{busy
            ? <span className="auth-spinner" aria-hidden="true" />
            : <Icon name="arrowright" size={18} className="auth-submit-arrow" />}</>} />
        <div role="status" className="auth-live-status">
          {busy && <span className="auth-visually-hidden">Checking demo credentials.</span>}
          {phase === 'invalid' && <p className="auth-error">Incorrect demo credentials. Try again or use the demo details below.</p>}
        </div>
      </div>
      <div className="auth-demo">
        <div>
          <p className="auth-demo-label">Demo access</p>
          <p className="auth-demo-note">Use fictional credentials only.</p>
        </div>
        <Button className="btn auth-demo-button" label="Use demo details" onClick={fillDemo} disabled={busy} />
      </div>
    </form>
  );
}