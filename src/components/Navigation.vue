<template>
    <div class="z-50 w-full">
        <div class="container flex items-center justify-around h-full mx-auto uppercase">
            <NavLink v-for="route in routes" :key="route.name" :to="route.to">{{ route.name }}</NavLink>
        </div>
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
                },
                {
                    name: "Gallery",
                    to: "/gallery"
                }
                // {
                //     name: "Gear",
                //     to: "/gear"
                // }
            ]
        }
    }
}
</script>
