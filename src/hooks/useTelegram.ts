import WebApp from '@twa-dev/sdk';

let ready = false;

export function initTelegram() {
  try {
    if (!ready) {
      WebApp.ready();
      WebApp.expand();
      try {
        WebApp.setHeaderColor('#0f0a16');
        WebApp.setBackgroundColor('#0f0a16');
      } catch {
        /* older clients */
      }
      ready = true;
    }
  } catch {
    /* outside Telegram */
  }
}

export function closeTelegram() {
  try {
    WebApp.close();
  } catch {
    window.history.back();
  }
}

export function hapticLight() {
  try {
    WebApp.HapticFeedback.impactOccurred('light');
  } catch {
    /* noop */
  }
}
