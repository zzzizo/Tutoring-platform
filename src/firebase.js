// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXvIoSwIet5DTqSHgxAuh6Nadrwq9xAJU",
  authDomain: "ai-tutoring-platform-ebdfd.firebaseapp.com",
  databaseURL: "https://ai-tutoring-platform-ebdfd-default-rtdb.firebaseio.com",
  projectId: "ai-tutoring-platform-ebdfd",
  storageBucket: "ai-tutoring-platform-ebdfd.firebasestorage.app",
  messagingSenderId: "198988972257",
  appId: "1:198988972257:web:bece15dcac29085dd477a0",
  measurementId: "G-MB4D7HHM7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Configure auth settings for development
if (process.env.NODE_ENV === 'development') {
  // This allows you to use the same email multiple times in development
  // and disables app verification for phone auth testing
  const authSettings = auth.settings;
  
  // Disable app verification for testing (if needed)
  // authSettings.appVerificationDisabledForTesting = true;
}

// Export the services
export { app, auth, db, storage };
