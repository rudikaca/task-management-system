import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD4PKNhDO2h-eDGihCWl6orLDWSULW1QC4",
    authDomain: "lufthansa-b423e.firebaseapp.com",
    projectId: "lufthansa-b423e",
    storageBucket: "lufthansa-b423e.appspot.com",
    messagingSenderId: "411644242288",
    appId: "1:411644242288:web:31bb8a1e46e0bf0e7547b5",
    measurementId: "G-NVJ0CXYJTD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app