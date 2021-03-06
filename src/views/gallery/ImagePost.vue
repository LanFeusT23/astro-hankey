<template>
    <div class="relative flex flex-col justify-end w-full h-full">
        <img
            class="absolute z-0 object-center w-full h-full"
            :class="{ 'object-contain': !dontContainImage, 'object-none': dontContainImage, 'hidden': !imageDisplaying.url }"
            :src="imageDisplaying.url"
        />

        <div v-if="nextPostId" class="absolute left-0 flex items-end h-full pb-32">
            <i
                @click="navigateNext"
                class="z-20 p-2 text-5xl opacity-25 cursor-pointer fas fa-chevron-left hover:opacity-50"
            ></i>
        </div>

        <div v-if="previousPostId" class="absolute right-0 flex items-end h-full pb-32">
            <i
                @click="navigatePrevious"
                class="z-20 p-2 text-5xl opacity-25 cursor-pointer fas fa-chevron-right hover:opacity-50"
            ></i>
        </div>

        <div class="z-10 pb-10 pl-6" v-if="hasData">
            <div
                class="text-3xl font-bold leading-tight uppercase truncate font-header text-shadow"
            >{{ selectedPost.title }}</div>
            <div
                class="text-2xl font-bold leading-tight uppercase font-header text-shadow"
            >{{ selectedPost.subTitle }}</div>
            <div class="leading-none text-shadow">{{ selectedPost.location }} | {{ formattedDate }}</div>
        </div>
    </div>
</template>

<script>
import sortBy from "lodash/sortBy"
import { format } from "date-fns"

export default {
    name: "Post",
    metaInfo() {
        return {
            meta: [
                {
                    property: "og:type",
                    content: "website",
                },
                {
                    property: "og:url",
                    content: `https://astrohankey.space/gallery/${this.selectedPost?.id}`,
                },
                {
                    property: "og:title",
                    content: "Jonathan Hankey Astrophotography",
                },
                {
                    property: "og:image:secure_url",
                    content: this.selectedPost?.thumbnailUrl,
                },
            ],
        }
    },
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

            return sortBy(this.selectedPost?.images, "isMain")
        },
        imageDisplaying() {
            return this.backgroundImages[0] ?? {}
        },
        formattedDate() {
            return format(this.selectedPost?.imageTakenDate, "MM/dd/yyyy")
        },
        nextPostId() {
            return this.$store.getters["posts/nextPostId"]
        },
        previousPostId() {
            return this.$store.getters["posts/previousPostId"]
        },
        dontContainImage() {
            return this.selectedPost?.dontContainImage
        },
    },
    methods: {
        navigatePrevious() {
            this.$emit("navigatePrevious")
        },
        navigateNext() {
            this.$emit("navigateNext")
        },
    },
}
</script>