import { useEffect, useRef, useState } from 'react';
import { clearDemoSession, demoSessionKey, matchesDemoCredentials, readDemoSession, saveDemoSession } from '../services/demoAuthService.js';

export function useDemoAuth() {
  const [signedIn, setSignedIn] = useState(readDemoSession);
  const [phase, setPhase] = useState('idle');
  const timer = useRef(null);

  useEffect(() => {
    function handleStorage(event) {
      if ((event.key === demoSessionKey || event.key === null) && !readDemoSession()) {
        setSignedIn(false);
        setPhase(previous => previous === 'entered' ? 'signed-out' : previous);
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearTimeout(timer.current);
    };
  }, []);

  function signIn(credentials) {
    if (timer.current !== null || signedIn) return;

    setPhase('checking');
    timer.current = setTimeout(() => {
      timer.current = null;
      if (!matchesDemoCredentials(credentials)) {
        setPhase('invalid');
        return;
      }
      saveDemoSession(credentials.remember);
      setPhase('entered');
      setSignedIn(true);
    }, 480);
  }

  function signOut() {
    clearDemoSession();
    setPhase('signed-out');
    setSignedIn(false);
  }

  function clearError() {
    setPhase(previous => previous === 'invalid' ? 'idle' : previous);
  }

  return { signedIn, phase, signIn, signOut, clearError };
}