<template>
    <div :class="{'thumbnail--animating': animatingOut}" class="relative w-24 h-24 overflow-hidden bg-center bg-cover rounded-lg cursor-pointer thumbnail md:w-48 md:h-48">
        <img
            :src="thumbnailUrl"
            :alt="title"
            class="absolute object-cover max-h-full min-w-full min-h-full"
            loading="lazy"
        />
        <div class="absolute flex flex-col justify-end w-full h-full p-2 uppercase rounded-lg opacity-0 bg-black-50"
            :class="{ 'hover:opacity-100': !animatingOut }">
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
        imageTakenDate: Date,
        animatingOut: false
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
    box-shadow: 2px 2px 8px 0px rgba(255, 255, 255, 0.1);

    &--animating {
        box-shadow: unset;
    }
}
</style>