// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBVOgNJOykXWHm7V92Evo5agw2BYZkrO3o",
    authDomain: "vuephoto-32b34.firebaseapp.com",
    projectId: "vuephoto-32b34",
    storageBucket: "vuephoto-32b34.appspot.com",
    messagingSenderId: "227742103088",
    appId: "1:227742103088:web:e9008ec4ac20fab0e3dff5",
    measurementId: "G-X9W7NCKX6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const postCollection = collection(db, "posts")
const videoCollection = collection(db, "videos")
const documentCollection = collection(db, "documents") 
export { addDoc, getDocs, postCollection, videoCollection, documentCollection }
// module.exports = {
//     postCollection
// }
// const analytics = getAnalytics(app);