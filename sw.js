self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'School Tracker Reminder';
  const options = {
    body: data.body || 'You have pending homework due soon!',
    icon: '/icon-192x192.png'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
