<template>
    <router-view v-touch:swipe.left="moveRight" v-touch:swipe.right="moveLeft" :key="currentPostId"></router-view>
</template>

<script>
    export default {
        name: "Gallery",
        computed: {
            currentPostId() {
                return this.$store.state.route?.params?.id
            },
            nextPostId() {
                return this.$store.getters["posts/nextPostId"]
            },
            previousPostId() {
                return this.$store.getters["posts/previousPostId"]
            }
        },
        methods: {
            keyPressed(e) {
                if (this.$store.state.route.name !== "ImagePost") {
                    return
                }
                
                if (e.key === "ArrowRight") {
                    this.moveRight()
                }

                if (e.key === "ArrowLeft") {
                    this.moveLeft()
                }
            },
            moveRight() {
                if (this.nextPostId) {
                    this.$router.push({ name: "ImagePost", params: { id: this.nextPostId } })
                }
            },
            moveLeft() {
                if (this.previousPostId) {
                    this.$router.push({ name: "ImagePost", params: { id: this.previousPostId } })
                }
            }
        },
        mounted() {
            document.addEventListener("keyup", this.keyPressed)
        },
        destroyed() {
            document.removeEventListener("keyup", this.keyPressed)
        },
		created() {
			this.$store.dispatch("posts/getImagesAsync")
		}
    }
</script>