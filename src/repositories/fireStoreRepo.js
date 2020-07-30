import { storage, firestore, imagesCollection, usersCollection } from "@/firebaseConfig.js"
import Post from "@/models/Post"

const getIsAdmin = async () => {
    try {
        const users = await usersCollection.get()
        return true
    } catch (error) {
        return false
    }
}

const getPosts = async () => {
    const posts = await imagesCollection.get()

    if (posts) {
        return posts.docs.map(snapshot => {
            let data = snapshot.data()
            return new Post(data, snapshot.id)
        })
    }
}

const uploadFile = async (imageData, onSnapshotCb, onCompletionCb) => {
    const storageRef = storage.ref(`gallery/${imageData.name}`).put(imageData)

    storageRef.on(
        `state_changed`,
        snapshot => onSnapshotCb(snapshot),
        error => {
            console.log(error.message)
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case "storage/unauthorized":
                    // User doesn't have permission to access the object
                    break

                case "storage/canceled":
                    // User canceled the upload
                    break

                case "storage/unknown":
                    // Unknown error occurred, inspect error.serverResponse
                    break
            }
        },
        async () => {
            const url = await storageRef.snapshot.ref.getDownloadURL()
            onCompletionCb(url)
        }
    )
}

const addData = async (docId, data) => {
    //let localfirestore = firestore

    try {
        const docRef = await imagesCollection.doc(docId).set({
            ...data,
            dateCreated: firestore.FieldValue.serverTimestamp()
        })
    } catch (error) {
        console.log(error)
        alert("Error uploading data")
        throw error
    }
}

export default {
    getPosts,
    getIsAdmin,
    uploadFile,
    addData
}
