import { storage, postsCollection } from '@/firebaseConfig.js'
import Post from "@/models/Post"

const getPosts = async () => {
    const posts = await postsCollection.get()

    
    if (posts) {
        return await Promise.all(posts.docs.map(async snapshot => {
            const cloudStorage = storage

            let data = snapshot.data()
            const images = await Promise.all(data.images.map(async image => {
                let path = image.location?.path
                if (path == null) {
                    return null
                }

                let fixedPath = path.replace("gs:/", "gs://")
    
                let url = await cloudStorage.refFromURL(fixedPath).getDownloadURL()
                return {
                    isMain: image.isMain,
                    isThumbnail: image.isThumbnail,
                    url
                }
            }));

            return new Post({
                ...data,
                images
            }, snapshot.id)
        }));
    }
}

export default {
    getPosts
}