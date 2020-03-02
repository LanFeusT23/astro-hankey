import { storage, postsCollection } from '@/firebaseConfig.js'
import Post from "@/models/Post"

async function getImageUrlFromStorage(imagePath) {
    return await storage.ref(imagePath).getDownloadURL()
}

const getPosts = async () => {
    const posts = await postsCollection.get()

    if (posts) {
        return await Promise.all(posts.docs.map(async snapshot => {
            let data = snapshot.data()
            const images = await Promise.all(data.images.map(async image => {
                let url = await getImageUrlFromStorage(image.location.path)

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



export default {
    getPosts
}