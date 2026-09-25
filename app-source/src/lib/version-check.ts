export const APP_VERSION = '1.0.1';

/**
 * Checks for app updates, unregisters legacy service workers,
 * and clears stale browser cache when a new version is detected.
 */
export async function checkVersionAndClearCache() {
  if (typeof window === 'undefined') return;

  // 1. Unregister any existing service workers from previous builds
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('[PMT Cache] Unregistered legacy service worker:', registration);
      }
    } catch (err) {
      console.warn('[PMT Cache] Error unregistering service worker:', err);
    }
  }

  // 2. Fetch remote version.json with no-cache headers
  try {
    const res = await fetch(`/version.json?t=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
    });

    if (!res.ok) return;

    const data = await res.json();
    const remoteVersion = data?.version;

    if (!remoteVersion) return;

    const localVersion = localStorage.getItem('pmt_version');

    if (localVersion && localVersion !== remoteVersion) {
      console.log(`[PMT Cache] New version detected: ${localVersion} -> ${remoteVersion}. Clearing cache...`);

      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((name) => caches.delete(name)));
      }

      localStorage.setItem('pmt_version', remoteVersion);

      // Prevent infinite reloads using a session flag
      const reloaded = sessionStorage.getItem('pmt_version_reloaded');
      if (!reloaded) {
        sessionStorage.setItem('pmt_version_reloaded', 'true');
        window.location.reload();
      } else {
        sessionStorage.removeItem('pmt_version_reloaded');
      }
    } else if (!localVersion) {
      localStorage.setItem('pmt_version', remoteVersion);
    }
  } catch (err) {
    console.warn('[PMT Cache] Version check skipped:', err);
  }
}
