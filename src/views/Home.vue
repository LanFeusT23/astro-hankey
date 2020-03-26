<template>
    <div class="relative h-full p-6 pt-24 bg-center bg-no-repeat bg-cover md:p-12 md:pt-24 lg:p-24 lg:pt-32 home">
        <div class="flex justify-center mt-10">
            <div ref="title" class="flex flex-col items-center text-white uppercase text-shadow-md">
                <div ref="name" class="text-3xl font-bold leading-6 lg:leading-10 lg:text-5xl">
                    Jonathan Hankey
                </div>

                <div ref="line" class="w-full h-px my-1 bg-purple-500 lg:my-2"></div>

                <div ref="astrophotography" class="flex justify-between w-full text-xl font-bold leading-none uppercase home__subtitle lg:text-2xl">
                    <span>A</span>
                    <span>S</span>
                    <span>T</span>
                    <span>R</span>
                    <span>O</span>
                    <span>P</span>
                    <span>H</span>
                    <span>O</span>
                    <span>T</span>
                    <span>O</span>
                    <span>G</span>
                    <span>R</span>
                    <span>A</span>
                    <span>P</span>
                    <span>H</span>
                    <span>Y</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { gsap } from "gsap"
export default {
    name: "Home",
    mounted() {
        if (!this.$store.state.route.from?.name) {
            let nameEl = this.$refs.name
            let lineEl = this.$refs.line
            let astrophotographyEl = this.$refs.astrophotography

            gsap.fromTo(
                nameEl,
                {
                    opacity: 0
                },
                {
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.3
                }
            )

            gsap.fromTo(
                astrophotographyEl,
                {
                    opacity: 0,
                    y: "-1rem"
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.5
                }
            )

            gsap.fromTo(
                lineEl,
                {
                    width: 0
                },
                {
                    width: "100%",
                    ease: "easeIn",
                    duration: 0.8,
                    delay: 1.7
                }
            )
        } else {
            let titleEl = this.$refs.title

            gsap.fromTo(
                titleEl,
                {
                    x: "-12rem"
                },
                {
                    x: 0,
                    duration: 0.3
                }
            )
        }
    },
    beforeDestroy() {
        let titleEl = this.$refs.title

        gsap.fromTo(
            titleEl,
            {
                x: 0
            },
            {
                x: "-12rem",
                duration: 0.3
            }
        )
    }
}
</script>

<style lang="scss" scoped>
.home {
    background-image: url("../assets/images/landing-page-milkyway-lin.jpg");
}
</style>
