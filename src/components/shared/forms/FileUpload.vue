<template>
    <div>
        <div class="mb-1 text-sm text-gray-600">Image upload (append date to the end of file name)</div>
        <div class="flex items-center mb-3">
            <input
                class="flex items-center mr-3 rounded min-w-24"
                @change="previewImage"
                type="file"
                accept="image/*"
            />

            <Button :disabled="disableBtn" @click="onUpload">Upload</Button>
        </div>

        <div class="mb-3">
            Progress: {{ uploadProgress }}
            <progress id="progress" :value="uploadValue" max="100"></progress>
        </div>
    </div>
</template>

<script>
import Button from "@/components/shared/forms/Button"
import { storage } from "@/firebaseConfig.js"

export default {
    name: "FileUpload",
    components: {
        Button,
    },
    data() {
        return {
            imageData: null,
            picture: null,
            uploadValue: 0,
        }
    },
    computed: {
        uploadProgress() {
            return `${this.uploadValue.toFixed()}%`
        },
        disableBtn() {
            return this.uploadValue !== 0 || this.imageData == null
        },
    },
    methods: {
        previewImage(event) {
            this.uploadValue = 0
            this.picture = null
            this.imageData = event.target.files[0]
        },
        onSnapshot(snapshot) {
            this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        onCompletion(url) {
            this.uploadValue = 100
            this.picture = url
            this.$emit("image-uploaded", {
                name: this.imageData.name,
                url: url,
            })
            this.resetForm()
        },
        resetForm() {
            this.imageData = null
            this.picture = null
            this.uploadValue = 0
        },
        async onUpload() {
            this.picture = null
            let { imageData, onSnapshot, onCompletion } = this

            await this.$store.dispatch("posts/uploadFile", {
                imageData,
                onSnapshot,
                onCompletion,
            })
        },
    },
}
</script>