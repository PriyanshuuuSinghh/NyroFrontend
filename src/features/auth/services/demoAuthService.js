export const demoCredentials = Object.freeze({
  mobile: '9000000000',
  password: 'NyroDemo!',
});

export const demoSessionKey = 'nyro.demo-auth';
const sessionValue = 'signed-in';

export function matchesDemoCredentials({ mobile, password }) {
  return mobile.trim() === demoCredentials.mobile && password === demoCredentials.password;
}

export function readDemoSession() {
  return [true, false].some(remember => {
    try {
      return browserStorage(remember).getItem(demoSessionKey) === sessionValue;
    } catch {
      return false;
    }
  });
}

export function saveDemoSession(remember) {
  clearDemoSession();
  try {
    browserStorage(remember).setItem(demoSessionKey, sessionValue);
  } catch {
    // Authentication still works for the current page when storage is blocked.
  }
}

export function clearDemoSession() {
  for (const remember of [true, false]) {
    try {
      browserStorage(remember).removeItem(demoSessionKey);
    } catch {
      // Either storage area can be unavailable independently.
    }
  }
}

function browserStorage(remember) {
  return remember ? window.localStorage : window.sessionStorage;
}