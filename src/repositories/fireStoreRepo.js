import { storage, firestore, imagesCollection, usersCollection } from "@/firebaseConfig.js"
import Post from "@/models/Post"

async function getImageUrlFromStorage(imagePath) {
    let url = ""
    try {
        url = await storage
            .ref()
            .child(imagePath)
            .getDownloadURL()
    } catch (error) {
        console.log(error)
    }

    return url
}

const getIsAdmin = async () => {
    try {
        const users = await usersCollection.get()
        return true
    } catch (error) {
        return false
    }
}

const getImages = async () => {
    const posts = await imagesCollection.get()

    if (posts) {
        return await Promise.all(
            posts.docs.map(async snapshot => {
                let data = snapshot.data()
                const images = await Promise.all(
                    data.images.map(async image => {
                        const url = await getImageUrlFromStorage(image.cloudLocation)

                        return {
                            isMain: image.isMain,
                            url
                        }
                    })
                )

                const thumbnailUrl = await getImageUrlFromStorage(data.thumbnail)

                return new Post(
                    {
                        ...data,
                        images,
                        thumbnailUrl
                    },
                    snapshot.id
                )
            })
        )
    }
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
    }
}

export default {
    getImages,
    getIsAdmin,
    addData
}
