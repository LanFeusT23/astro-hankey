<template>
    <div>
        <img class="mb-3 h-72" :src="imageUrl" />
    </div>
</template>

<script>
export default {
    name: "ImagePreview",
    props: {
        imageUrl: String
    }
}
</script>