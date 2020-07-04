<template>
    <div class="w-full z-50 bg-black-50">
        <div class="h-full flex items-center justify-around container mx-auto uppercase">
            <NavLink v-for="route in routes" :key="route.name" :to="route.to">
                {{ route.name }}
            </NavLink>
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
