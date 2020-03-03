<template>
    <div class="w-24 h-24 bg-center bg-cover rounded-lg cursor-pointer thumbnail md:w-48 md:h-48" 
        :style="{ 'background-image': `url(${thumbnailUrl})` }">
        <div class="flex flex-col justify-end w-full h-full p-2 uppercase rounded-lg opacity-0 hover:opacity-100 bg-black-50">
            <div class="min-w-0 text-sm font-bold leading-tight truncate">{{ title }}</div>
            <div class="text-xs leading-none">{{ formattedDate }}</div>
        </div>
    </div>
</template>

<script>
    import { format } from "date-fns"
    export default {
        name: "Thumbnail",
        props: {
            thumbnailUrl: String,
            title: String,
            imageTakenDate: Date
        },
        computed: {
            formattedDate() {
                return format(this.imageTakenDate, "MM/dd/yyyy")
            }
        }
    }
</script>

<style lang="scss" scoped>
    .thumbnail {
        box-shadow: 2px 2px 8px 0px rgba(255,255,255,.1);
    }
</style>