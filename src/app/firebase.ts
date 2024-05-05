import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAc4_A0HK3eozjRpN2s2AzKAhym9ZhEyXQ",
    authDomain: "pneuzin-reviews.firebaseapp.com",
    databaseURL: "https://pneuzin-reviews-default-rtdb.firebaseio.com",
    projectId: "pneuzin-reviews",
    storageBucket: "pneuzin-reviews.appspot.com",
    messagingSenderId: "578192099583",
    appId: "1:578192099583:web:bc2cefce2a115626a264ca",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fireDb = getDatabase(app);
