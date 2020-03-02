import { storage, firestore, imagesCollection } from '@/firebaseConfig.js'
import Post from "@/models/Post"
import data from "./data.json"

async function getImageUrlFromStorage(imagePath) {
    let url = ""
    try {
        url = await storage.ref(imagePath).getDownloadURL()
    } catch (error) { }

    return url;
}

const getImages = async () => {
    const posts = await imagesCollection.get()

    if (posts) {
        return await Promise.all(posts.docs.map(async snapshot => {
            let data = snapshot.data()
            const images = await Promise.all(data.images.map(async image => {
                const url = await getImageUrlFromStorage(image.cloudLocation.path)

                return {
                    isMain: image.isMain,
                    url
                }
            }));

            const thumbnailUrl = await getImageUrlFromStorage(data.thumbnail.path)

            return new Post({
                ...data,
                images,
                thumbnailUrl
            }, snapshot.id)
        }));
    }
}

// const addData = () => {
//     let localfirestore = firestore

//     data.forEach(element => {
//         //let storageRef = storage.ref().child(`gallery/${element.filename}`)

//         imagesCollection.add({
//             ...element,
//             dateCreated: firestore.FieldValue.serverTimestamp(),
//             imageTakenDate: new Date(element.imageTakenDate),
//             //thumbnail: storageRef
//         })
//     });
// }

export default {
    getImages,
    //addData
}