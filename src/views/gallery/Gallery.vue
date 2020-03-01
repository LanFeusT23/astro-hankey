<template>
    <div class="grid gap-4 gallery">
        <div class="w-24 h-24 bg-center bg-cover rounded-lg md:w-32 md:h-32" v-for="post in sortedPosts" :key="makeid()"
            :style="{ 'background-image': `url(${post.images[0].url})` }">

        </div>
    </div>
</template>

<script>
    export default {
        name: "Gallery",
        computed: {
            sortedPosts() {
                return [
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                    ...this.$store.getters["posts/sortedPosts"],
                ]
            }
        },
        methods: {
            makeid() {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < 5; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }

        },
		created() {
			this.$store.dispatch("posts/getPostsAsync")
		}
    }
</script>

<style lang="scss">
    .gallery {
        grid-template-columns: repeat(auto-fit, 8rem);
        grid-template-rows: repeat(auto-fit, 8rem);
    }
</style>