self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', event => {
  let payload = {};
  if (event.data) {
    try {
      payload = event.data.json();
    } catch (_) {
      payload = { body: event.data.text() };
    }
  }

  event.waitUntil(self.registration.showNotification(payload.title || 'School Tracker', {
    body: payload.body || 'You have a homework reminder.',
    data: { url: './index.html' }
  }));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const targetUrl = new URL('./index.html', self.registration.scope).href;
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
    const existingClient = clients.find(client => client.url === targetUrl);
    if (existingClient) return existingClient.focus();
    return self.clients.openWindow(targetUrl);
  }));
});
