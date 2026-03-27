import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDj2xGIKr4IoFrVr0dEOihlRgKvOlCtpVw",
  authDomain: "bluorbittech.firebaseapp.com",
  projectId: "bluorbittech",
  storageBucket: "bluorbittech.firebasestorage.app",
  messagingSenderId: "311554595735",
  appId: "1:311554595735:web:a477a3d8af2ea64de102d2",
  measurementId: "G-QHV6KR99JN",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
