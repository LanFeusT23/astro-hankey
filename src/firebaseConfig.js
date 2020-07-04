import * as firebase from "firebase/app"

import "firebase/analytics"
import "firebase/firestore"
import "firebase/storage"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAprZOEz6qLiC0jqOReyfC665yXvMqQ-Fc",
    authDomain: "astro-hankey.firebaseapp.com",
    databaseURL: "https://astro-hankey.firebaseio.com",
    projectId: "astro-hankey",
    storageBucket: "astro-hankey.appspot.com",
    messagingSenderId: "971314145446",
    appId: "1:971314145446:web:9f5b5de95ccf7899586c67",
    measurementId: "G-93N48DHE98"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

const firestore = firebase.firestore
const db = firestore()
const storage = firebase.app().storage(process.env.VUE_APP_STORAGE_BUCKET)
const authProvider = new firebase.auth.GoogleAuthProvider()
const firebaseAuth = firebase.auth

// firebase collections
const imagesCollection = db.collection(process.env.VUE_APP_IMAGE_COLLECTION)
const usersCollection = db.collection("users")

export { db, firestore, storage, imagesCollection, usersCollection, authProvider, firebaseAuth }
