<template>
    <transition-group
        name="animate-grid"
        tag="div"
        class="grid justify-center gap-4 p-4 pt-24 md:p-12 md:pt-24 lg:p-24 lg:pt-32 gallery"
        @enter="enter"
        v-bind:css="false"
    >
        <router-link
            ref="thumbnail"
            class="gallery__post"
            v-for="(post, index) in sortedPosts"
            :id="`Post-${post.id}`"
            :to="`/gallery/${post.id}`"
            :data-index="index"
            :key="post.id"
        >
            <Thumbnail v-bind="post" :animatingOut="animatingOut" />
        </router-link>
    </transition-group>
</template>

<script>
import { gsap, MotionPathPlugin } from "gsap/all"
import Thumbnail from "@/components/gallery/Thumbnail"
gsap.registerPlugin(MotionPathPlugin)

const DELAY_BETWEEN_IMAGES_IN_MS = 50

export default {
    name: "ImageList",
    components: {
        Thumbnail
    },
    data() {
        return {
            animatingOut: false
        }
    },
    computed: {
        sortedPosts() {
            return [...this.$store.getters["posts/sortedPosts"]]
        }
    },
    methods: {
        enter(el, done) {
            var delay = (el.dataset.index * DELAY_BETWEEN_IMAGES_IN_MS) / 1000

            gsap.fromTo(
                el,
                {
                    scale: 0.1,
                    x: "10rem",
                    opacity: 0
                },
                {
                    scale: 1,
                    duration: 0.5,
                    opacity: 1,
                    x: 0,
                    delay: delay,
                    ease: "power1.inOut",
                    onComplete: done
                }
            )
        }
    },
    beforeRouteLeave(to, from, next) {
        if (to.name === "ImagePost") {
            this.animatingOut = true
            var nextPostId = to.params.id
            var el = document.getElementById(`Post-${nextPostId}`)
            var thumbnails = this.$refs.thumbnail.map(x => x.$el)

            el.style.zIndex = 999

            var parentElement = el.parentElement
            parentElement.style.overflow = "hidden"

            gsap.to(thumbnails, {
                opacity: 0,
                scale: 0.1,
                duration: 0.3
            })

            var body = document.querySelector("body")
            var p = MotionPathPlugin.getRelativePosition(el, body, [0.5, 0.5], [0.5, 0.5])
            gsap.to(el, {
                x: "+=" + p.x,
                y: "+=" + p.y,
                scale: 5,
                opacity: 0.5,
                duration: 0.5,
                onComplete() {
                    parentElement.style.overflow = "hidden"
                    next()
                }
            })
        } else {
            next()
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

    &__post {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
}
</style>