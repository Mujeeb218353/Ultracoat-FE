const STORAGE_KEY = "ucp_device_token";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

export const getStoredDeviceToken = () =>
  typeof window === "undefined" ? null : localStorage.getItem(STORAGE_KEY);

export const storeDeviceToken = (token: string) => localStorage.setItem(STORAGE_KEY, token);

export const clearStoredDeviceToken = () => localStorage.removeItem(STORAGE_KEY);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Returns an FCM registration token, or null if push is unavailable/denied.
export const getDeviceToken = async (): Promise<string | null> => {
  if (typeof window === "undefined" || !("serviceWorker" in navigator) || !(await isSupported())) {
    console.warn("[device] FCM not supported in this browser/context (needs https or localhost)");
    return null;
  }
  const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY?.replace(/["'\s]/g, "");
  if (!vapidKey) {
    console.warn("[device] NEXT_PUBLIC_VAPID_PUBLIC_KEY missing - restart dev server after editing .env");
    return null;
  }

  const permission = Notification.permission === "default" ? await Notification.requestPermission() : Notification.permission;
  if (permission !== "granted") {
    console.warn("[device] notification permission:", permission);
    return null;
  }

  // SW is only auto-registered in production, so ensure it exists (otherwise `ready` never resolves)
  const registration = (await navigator.serviceWorker.getRegistration("/")) ?? (await navigator.serviceWorker.register("/sw.js", { scope: "/" }));
  await navigator.serviceWorker.ready;

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return getToken(getMessaging(app), { vapidKey, serviceWorkerRegistration: registration });
};
