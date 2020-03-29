<template>
    <transition-group 
        name="animate-grid"
        tag="div"
        class="grid justify-center gap-4 p-4 pt-24 md:p-12 md:pt-24 lg:p-24 lg:pt-32 gallery "
        @enter="enter"
        v-bind:css="false">
        <router-link
            ref="thumbnail"
            v-for="(post, index) in sortedPosts"
            :to="`/gallery/${post.id}`"
            :data-index="index"
            :key="post.id">
            <Thumbnail v-bind="post" />
        </router-link>
    </transition-group>
</template>

<script>
    import { gsap } from "gsap"
    import Thumbnail from "@/components/gallery/Thumbnail"
    const DELAY_BETWEEN_IMAGES_IN_MS = 50

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
        methods: {
            enter(el, done) {
                var delay = el.dataset.index * DELAY_BETWEEN_IMAGES_IN_MS / 1000

                gsap.fromTo(el, {
                    scale: 0.1,
                    x: "10rem",
                    opacity: 0
                },{
                    scale: 1,
                    duration: .5,
                    opacity: 1,
                    x: 0,
                    delay: delay,
                    ease: "power1.inOut",
                    onComplete: done
                })
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