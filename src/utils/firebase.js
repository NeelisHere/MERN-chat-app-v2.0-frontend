import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA95oZ6fZzXu1pBcv27IObgXVG5oJeOK3Y",
    authDomain: "chat-app-v2-storage.firebaseapp.com",
    projectId: "chat-app-v2-storage",
    storageBucket: "chat-app-v2-storage.appspot.com",
    messagingSenderId: "811520133524",
    appId: "1:811520133524:web:fa20529c579e19308b6781",
    measurementId: "G-JYQRK3ZQG8"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);