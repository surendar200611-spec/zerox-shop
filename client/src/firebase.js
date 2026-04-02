import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-MgNbJrprsxC3Zlu1fRbzmrV8xzOgEY4",
  authDomain: "zerox-web.firebaseapp.com",
  projectId: "zerox-web",
  storageBucket: "zerox-web.firebasestorage.app",
  messagingSenderId: "687569597544",
  appId: "1:687569597544:web:7f3c6e80093ccd0e2c77dd",
  measurementId: "G-VC2VKRTF8B"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
