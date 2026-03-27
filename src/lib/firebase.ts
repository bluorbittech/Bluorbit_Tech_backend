import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "apikey",
  authDomain: "doamin",
  projectId: "id",
  storageBucket: "bucket",
  messagingSenderId: "id",
  appId: "appid",
  measurementId: "mid",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
