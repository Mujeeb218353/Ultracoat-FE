import { getApp, getApps, initializeApp } from "firebase/app";
import { deleteToken, getMessaging, getToken, isSupported, onMessage } from "firebase/messaging";
import type { MessagePayload } from "firebase/messaging";

const STORAGE_KEY = "ucp_device_token";

const app = getApps().length ? getApp() : initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

export const getStoredDeviceToken = () => typeof window === "undefined" ? null : localStorage.getItem(STORAGE_KEY);
export const storeDeviceToken = (token: string) => localStorage.setItem(STORAGE_KEY, token);
export const clearStoredDeviceToken = () => localStorage.removeItem(STORAGE_KEY);

export const getDeviceToken = async (): Promise<string | null> => {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return null;
  if (!(await isSupported())) return null;

  const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY?.replace(/["'\s]/g, "");
  if (!vapidKey) {
    console.warn("[push] VAPID key missing");
    return null;
  }

  const permission = Notification.permission === "default" ? await Notification.requestPermission() : Notification.permission;
  if (permission !== "granted") return null;

  try {
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    await navigator.serviceWorker.ready;
    return (
      (await getToken(getMessaging(app), { vapidKey, serviceWorkerRegistration: registration })) ||
      null
    );
  } catch (err) {
    console.error("[push] getToken failed:", err);
    return null;
  }
};

export const removeDeviceToken = async () => {
  if (!(await isSupported())) return;
  await deleteToken(getMessaging(app)).catch(() => {});
};

export const listenForegroundMessages = async (cb: (p: MessagePayload) => void) => {
  if (!(await isSupported())) return () => {};
  return onMessage(getMessaging(app), cb);
};