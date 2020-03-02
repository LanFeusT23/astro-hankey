<template>
    <div class="relative flex flex-col justify-end w-full h-full">
        <div class="absolute z-0 w-full h-full bg-center bg-cover"
            :style="{ 'background-image': `url(${imageDisplaying.url})` }">
        </div>

        <div class="z-10 p-6 md:p-10">
            <div class="text-3xl font-bold leading-tight uppercase truncate">
                {{ selectedPost.title }}
            </div>
            <div class="text-2xl font-bold leading-tight uppercase">
                {{ selectedPost.subTitle }}
            </div>
            <div class="leading-none">
                {{ selectedPost.location }} | {{ formattedDate }}
            </div>
        </div>

    </div>
</template>

<script>
    import sortBy from "lodash/sortBy"
    import { format } from "date-fns"

    export default {
        name: "Post",
        computed: {
            selectedPost() {
                return this.$store.getters["posts/selectedPost"]
            },
            backgroundImages() {
                if (this.selectedPost === undefined) {
                    return []
                }

                return sortBy(this.selectedPost.images, 'isMain')
            },
            imageDisplaying() {
                return this.backgroundImages[0]
            },
            formattedDate() {
                return format(this.selectedPost.imageTakenDate, "MM/dd/yyyy")
            }
        },
        mounted() {
            if (this.selectedPost === undefined) {
			    this.$store.dispatch("posts/getPostsAsync")
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>