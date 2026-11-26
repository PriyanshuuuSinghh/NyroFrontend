import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@shared/ui/Icon.jsx';
import { LoginBackdrop } from '../components/LoginBackdrop.jsx';
import { LoginForm } from '../components/LoginForm.jsx';

export function LoginPage({ logo, phase, onSignIn, onClearError }) {
  const [motionPaused, setMotionPaused] = useState(false);
  const heading = useRef(null);
  const returnedToLogin = useRef(phase === 'signed-out');

  useEffect(() => {
    if (returnedToLogin.current) heading.current?.focus({ preventScroll: true });
  }, []);

  return (
    <main className="auth-page" data-motion-paused={motionPaused}>
      <LoginBackdrop />
      <section className="auth-card" aria-labelledby="auth-heading">
        <header className="auth-card-header">
          <img className="auth-logo" src={logo} width="840" height="250" alt="NYRO Technologies" />
          <h1 id="auth-heading" ref={heading} tabIndex={-1}>Welcome back.</h1>
          <p>Sign in to your NYRO workspace.</p>
        </header>
        <LoginForm phase={phase} onSignIn={onSignIn} onClearError={onClearError} />
      </section>
      <button
        type="button"
        className="auth-motion-control"
        onClick={() => setMotionPaused(paused => !paused)}
      >
        <Icon name={motionPaused ? 'play' : 'pause'} size={14} />
        {motionPaused ? 'Resume background motion' : 'Pause background motion'}
      </button>
    </main>
  );
}