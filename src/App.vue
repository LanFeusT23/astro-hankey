<template>
    <div id="app" class="container relative h-full mx-auto overflow-x-hidden">
        <ConnectedVertices v-if="displayConnectedVertices"></ConnectedVertices>
        <Navigation class="absolute top-0 h-16"></Navigation>

        <transition mode="out-in" @leave="leave" @enter="enter">
            <router-view class="h-full" />
        </transition>
        <NewVersion></NewVersion>
    </div>
</template>

<script>
import Navigation from "@/components/Navigation"
import NewVersion from "@/components/shared/NewVersion"
import ConnectedVertices from "@/components/canvas/ConnectedVertices"
import gsap from "gsap"

export default {
    name: "App",
    metaInfo: {
        title: "Jonathan Hankey Astrophotography",
        titleTemplate: "%s | Jonathan Hankey Astrophotography"
    },
    components: {
        Navigation,
        NewVersion,
        ConnectedVertices
    },
    computed: {
        fromRoute() {
            return this.$store.state.route?.from?.name
        },
        fromRouteMeta() {
            return this.$store.state.route?.from?.meta
        },
        currentRouteMeta() {
            return this.$store.state.route?.meta
        },
        directionToGo() {
            const { fromRouteMeta, currentRouteMeta } = this

            if (fromRouteMeta.order === currentRouteMeta.order) {
                return null
            } else if (fromRouteMeta.order > currentRouteMeta.order) {
                return "right"
            }

            return "left"
        }
    },
    methods: {
        async enter(el, done) {
            if (this.fromRoute == null || this.directionToGo == null) {
                done()
                return
            }

            let startXPosition = -200
            if (this.directionToGo === "left") {
                startXPosition = 200
            }

            await gsap.fromTo(
                el,
                {
                    x: startXPosition,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.2
                }
            )

            done()
        },
        async leave(el, done) {
            if (this.directionToGo == null) {
                done()
                return
            }

            let finalXPosition = 200
            if (this.directionToGo === "left") {
                finalXPosition = -200
            }

            await gsap.fromTo(
                el,
                {
                    x: 0,
                    opacity: 1
                },
                {
                    x: finalXPosition,
                    opacity: 0,
                    duration: 0.2,
                    ease: "none"
                }
            )

            done()
        }
    }
}
</script>
