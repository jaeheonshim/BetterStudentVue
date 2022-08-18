/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js')

const firebaseConfig = {
  apiKey: "AIzaSyBudofncgIZ1Sf52ucJPYM4NSPlxGOTZmQ",
  authDomain: "betterstudentvue.firebaseapp.com",
  projectId: "betterstudentvue",
  storageBucket: "betterstudentvue.appspot.com",
  messagingSenderId: "441663558373",
  appId: "1:441663558373:web:a5581f5fdd5387fea5ba0c",
  measurementId: "G-PEQWDGKBSH"
};

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || payload.notification.image,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('notificationclick', (event) => {
  if (event.action) {
    clients.openWindow(event.action)
  }
  event.notification.close()
})
