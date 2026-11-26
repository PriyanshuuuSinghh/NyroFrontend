import React, { useLayoutEffect, useRef, useState } from 'react';
import { Icon } from '@shared/ui/Icon.jsx';
import { LoginBackdrop } from '../components/LoginBackdrop.jsx';
import { LoginForm } from '../components/LoginForm.jsx';
import { OtpModal } from '../components/OtpModal.jsx';
import { usePointerDepth } from '../hooks/usePointerDepth.js';

export function LoginPage({ logo, phase, challenge, error, onSignIn, onClearError, onSubmitOtp, onResendOtp, onCancelOtp, onEntered }) {
  const [motionPaused, setMotionPaused] = useState(false);
  const scene = useRef(null);
  const card = useRef(null);
  const heading = useRef(null);
  const hadOtp = useRef(false);
  const returnedToLogin = useRef(phase === 'signed-out');
  const leaving = phase === 'leaving';
  const showOtp = Boolean(challenge) || phase === 'success' || leaving;
  const returnedAfterAttemptLimit = phase === 'idle' && Boolean(error);
  usePointerDepth(scene);

  useLayoutEffect(() => {
    if (returnedToLogin.current || returnedAfterAttemptLimit) {
      heading.current?.focus({ preventScroll: true });
    } else if (hadOtp.current && !showOtp) {
      card.current?.querySelector('button[type="submit"]')?.focus();
    }
    hadOtp.current = showOtp;
    returnedToLogin.current = false;
  }, [showOtp, returnedAfterAttemptLimit]);

  return (
    <main className={leaving ? 'auth-page is-leaving' : 'auth-page'} ref={scene} data-motion-paused={motionPaused}
      onAnimationEnd={event => {
        if (leaving && event.target === event.currentTarget) onEntered();
      }}>
      <LoginBackdrop />
      <div className="auth-card-shadow" aria-hidden="true" />
      <section className={showOtp ? 'auth-card is-behind' : 'auth-card'} ref={card} aria-labelledby="auth-heading"
        inert={showOtp ? '' : undefined} aria-hidden={showOtp || undefined}>
        <span className="auth-card-sheen" aria-hidden="true" />
        <header className="auth-card-header">
          <img className="auth-logo" src={logo} width="840" height="250" alt="NYRO Technologies" />
          <h1 id="auth-heading" ref={heading} tabIndex={-1}>Welcome back.</h1>
          <p>Sign in to your NYRO workspace.</p>
        </header>
        <div role="status">{returnedAfterAttemptLimit && <p className="auth-error">{error}</p>}</div>
        {/* Remount the form to clear its credentials as soon as the OTP challenge opens. */}
        <LoginForm key={showOtp ? 'behind' : 'active'} phase={phase} onSignIn={onSignIn} onClearError={onClearError} />
      </section>
      <button
        type="button"
        className="auth-motion-control"
        aria-hidden={showOtp || undefined}
        tabIndex={showOtp ? -1 : undefined}
        onClick={() => setMotionPaused(paused => !paused)}
      >
        <Icon name={motionPaused ? 'play' : 'pause'} size={14} />
        {motionPaused ? 'Resume background motion' : 'Pause background motion'}
      </button>
      {showOtp && (
        <OtpModal phase={phase} maskedMobile={challenge?.maskedMobile} error={error}
          onSubmit={onSubmitOtp} onResend={onResendOtp} onCancel={onCancelOtp} />
      )}
    </main>
  );
}
