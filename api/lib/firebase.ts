import * as admin from "firebase-admin";
import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = resolve(fileURLToPath(import.meta.url), "..");

let firebaseApp: admin.app.App | null = null;
let serviceAccountKey: any = null;

function loadServiceAccount() {
  if (!serviceAccountKey) {
    try {
      const credentialsPath = resolve(__dirname, "firebase-credentials.json");
      serviceAccountKey = JSON.parse(readFileSync(credentialsPath, "utf8"));
    } catch (error) {
      console.warn("Firebase credentials not found or invalid, Firebase will not be initialized");
      return null;
    }
  }
  return serviceAccountKey;
}

export function initializeFirebase() {
  if (firebaseApp) return firebaseApp;
  
  const credentials = loadServiceAccount();
  if (!credentials) {
    return null;
  }

  try {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(credentials as admin.ServiceAccount),
      projectId: credentials.project_id,
    });
  } catch (error) {
    if ((error as any).code === "app/duplicate-app") {
      firebaseApp = admin.app();
    } else {
      console.error("Failed to initialize Firebase:", error);
      throw error;
    }
  }
  return firebaseApp;
}

export function getFirebaseDb() {
  initializeFirebase();
  return admin.firestore();
}

export function getFirebaseAuth() {
  initializeFirebase();
  return admin.auth();
}
