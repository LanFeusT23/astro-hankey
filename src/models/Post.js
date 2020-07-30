const imageStoragePublicUrlBase = `https://storage.googleapis.com/${process.env.VUE_APP_STORAGE_GS_BUCKET_NAME}`

export default class Post {
    constructor(rawPost, postId) {
        this.id = postId
        this.title = rawPost.title
        this.subTitle = rawPost.subTitle
        this.location = rawPost.location
        this.dateCreated = rawPost.dateCreated.toDate()
        this.imageTakenDate = rawPost.imageTakenDate.toDate()
        this.images = rawPost.images.map(img => {
            return {
                isMain: img.isMain,
                url: `${imageStoragePublicUrlBase}/${img.cloudLocation}`
            }
        })
        this.thumbnailUrl = `${imageStoragePublicUrlBase}/${rawPost.thumbnail}`
        this.dontContainImage = rawPost.dontContainImage
    }
}
