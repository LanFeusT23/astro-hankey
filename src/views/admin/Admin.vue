<template>
    <div class="px-2 pt-24">
        <Login class="mb-4" />

        <template v-if="isAdmin">
            <div class="mb-3 flex gap-4 p-4 rounded-lg bg-gray-900 hover:bg-gray-800" v-for="post in sortedPosts" :key="post.id">
                <div class="w-24 h-24">
                    <img
                        :src="post.thumbnailUrl"
                        :alt="post.title"
                        class="object-cover max-h-full min-w-full min-h-full"
                        loading="lazy"
                    />
                </div>


                <div class="flex flex-col justify-between">
                    <div class="text-2xl font-bold uppercase">{{ post.title }}</div>
                    <div class="text-lg uppercase">{{ post.subtitle }}</div>
                    <div>{{ post.location }} | {{ formattedDate(post.imageTakenDate) }}</div>
                </div>
                
            </div>
        </template>
    </div>
</template>

<script>
import Login from "@/views/admin/Login"
import { format } from "date-fns"

export default {
    name: "Admin",
    components: {
        Login,
    },
    data() {
        return {
        }
    },
    computed: {
        isAdmin() {
            return this.$store.state.users.isAdmin
        },
        sortedPosts() {
            return this.$store.getters["posts/sortedPosts"]
        }
    },
    methods: {
        formattedDate(date) {
            return format(date, "MM/dd/yyyy")
        }
    },
    created() {
        this.$store.dispatch("posts/getImagesAsync")
    }
}
</script>
