export default class Post {
    constructor(rawPost, postId) {
        this.id = postId
        this.title = rawPost.title
        this.subTitle = rawPost.subTitle
        this.location = rawPost.location
        this.dateCreated = rawPost.dateCreated.toDate()
        this.imageTakenDate = rawPost.imageTakenDate.toDate()
        this.images = rawPost.images
        this.thumbnailUrl = rawPost.thumbnailUrl
    }
}