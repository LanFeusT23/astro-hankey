<template>
    <div class="grid justify-center gap-4 p-4 pt-24 md:p-12 md:pt-24 lg:p-24 lg:pt-32 gallery ">
        <router-link
            ref="thumbnail"
            :class="{'opacity-0': hideImages }"
            v-for="post in sortedPosts"
            :to="`/gallery/${post.id}`"
            :key="post.id">
            <Thumbnail v-bind="post" />
        </router-link>
    </div>
</template>

<script>
    import { gsap } from "gsap"
    import Thumbnail from "@/components/gallery/Thumbnail"

    export default {
        name: "ImageList",
        components: {
            Thumbnail
        },
        data() {
            return {
                hideImages: true
            }
        },
        computed: {
            sortedPosts() {
                return [
                    ...this.$store.getters["posts/sortedPosts"],
                ]
            }
        },
        methods: {
            animateGridIn() {
                const thumbnails = this.$refs.thumbnail?.map(x => x.$el)

                let self = this
                gsap.fromTo(thumbnails, {
                    scale: 0.1,
                    y: 60,
                    opacity: 0
                },{
                    scale: 1,
                    duration: .5,
                    opacity: 1,
                    y: 0,
                    ease: "power1.inOut",
                    stagger: {
                        amount: 0.5,
                        from: "start"
                    }
                })
            }
        },
        watch: {
            sortedPosts: {
                async handler(val) {
                    if (val.length > 0) {
                        await this.$nextTick() 
                        this.animateGridIn()
                    }
                }, immediate: false
            }
        },
        mounted() {
            if (this.$store.state.route.from?.name === "ImagePost") {
                this.hideImages = false
            }
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