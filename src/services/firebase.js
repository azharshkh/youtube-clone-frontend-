import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBIbXq4EHkfv0aOY0nreLhdk1OW9Pz5LYw",
  authDomain: "clone-31208.firebaseapp.com",
  projectId: "clone-31208",
  storageBucket: "clone-31208.appspot.com",
  messagingSenderId: "932882052520",
  appId: "1:932882052520:web:bb9f5622fb281c1c8e599d",
  measurementId: "G-7TG8BEPFPR"
};

const app = initializeApp(firebaseConfig);
if (typeof window !== 'undefined') getAnalytics(app);

export const db = getFirestore(app);
export { collection, getDocs, doc, getDoc };
