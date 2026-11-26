import React from 'react';
import { useDemoAuth } from '../hooks/useDemoAuth.js';
import { LoginPage } from '../pages/LoginPage.jsx';

export function AuthGate({ logo, children }) {
  const { signedIn, phase, signIn, signOut, clearError } = useDemoAuth();

  if (signedIn) return children({ signOut, justSignedIn: phase === 'entered' });

  return <LoginPage logo={logo} phase={phase} onSignIn={signIn} onClearError={clearError} />;
}