<template>
    <div class="grid justify-center gap-4 p-4 pt-24 md:p-12 md:pt-24 lg:p-24 lg:pt-32 gallery ">
        <router-link
            v-for="post in sortedPosts"
            :to="`/gallery/${post.id}`"
            :key="post.id">
            <Thumbnail v-bind="post" />
        </router-link>
    </div>
</template>

<script>
    import Thumbnail from "@/components/gallery/Thumbnail"

    export default {
        name: "ImageList",
        components: {
            Thumbnail
        },
        computed: {
            sortedPosts() {
                return [
                    ...this.$store.getters["posts/sortedPosts"],
                ]
            }
        },
		created() {
			this.$store.dispatch("posts/getImagesAsync")
		}
    }
</script>

<style lang="scss">
    .gallery {
        grid-template-columns: repeat(auto-fit, 6rem);
        grid-template-rows: repeat(auto-fit, 6rem);

        @screen md {
            grid-template-columns: repeat(auto-fit, 12rem);
            grid-template-rows: repeat(auto-fit, 12rem);
        }
    }
</style>