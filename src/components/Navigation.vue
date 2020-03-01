<template>
    <div class="z-50 flex items-center justify-around w-full h-16 text-lg uppercase bg-black-lighter">
        <NavLink v-for="route in routes" :key="route.name" :to="route.to">
            {{ route.name }}
        </NavLink>
    </div>
</template>

<script>
import NavLink from "@/components/NavLink"
    export default {
        name: "Navigation",
        components: {
            NavLink
        },
        data() {
            return {
                routes: [
                    {
                        name: "Home",
                        to: "/"
                    }, {
                        name: "Gallery",
                        to: "/gallery"
                    }, {
                        name: "Gear",
                        to: "/gear"
                    }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>