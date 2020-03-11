<template>
    <div class="relative flex flex-col justify-end w-full h-full">
        <div class="absolute z-0 w-full h-full bg-center bg-no-repeat bg-contain"
            :style="{ 'background-image': `url(${imageDisplaying.url})` }">
        </div>

        <div class="z-10 pb-10 pl-6" v-if="hasData">
            <div class="text-3xl font-bold leading-tight uppercase truncate text-shadow">
                {{ selectedPost.title }}
            </div>
            <div class="text-2xl font-bold leading-tight uppercase text-shadow">
                {{ selectedPost.subTitle }}
            </div>
            <div class="leading-none text-shadow">
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
            hasData() {
                return this.$store.state.posts.posts.length > 0
            },
            selectedPost() {
                return this.$store.getters["posts/selectedPost"]
            },
            backgroundImages() {
                if (this.selectedPost == null) {
                    return []
                }

                return sortBy(this.selectedPost?.images, 'isMain')
            },
            imageDisplaying() {
                return this.backgroundImages[0] ?? {}
            },
            formattedDate() {
                return format(this.selectedPost?.imageTakenDate, "MM/dd/yyyy")
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>