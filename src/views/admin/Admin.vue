<template>
    <div class="pt-24">
        <Login />

        <template v-if="isAdmin">
            <div class="my-6 text-xl font-bold">Upload new image post</div>

            <div class="flex px-2 sm:flex-wrap lg:flex-no-wrap">
                <div>
                    <FileUpload
                        class="flex-1"
                        @image-uploaded="setImageName"
                        :resetUpload="resetUpload"
                    ></FileUpload>

                    <TextInput class="mb-3" v-model="documentId" label="Document ID" disabled />

                    <TextInput class="mb-3" v-model="title" label="Title" />

                    <TextInput class="mb-3" v-model="subTitle" label="SubTitle" />

                    <TextInput class="mb-3" v-model="location" label="Location" />

                    <DateInput class="mb-3" v-model="dateImageTaken" label="Date image taken" />

                    <Button
                        class="mt-10"
                        :disabled="disabledButton"
                        @click="addNewImage"
                    >Add new image post!</Button>
                </div>

                <ImagePreview v-if="imageUrl != null" :imageUrl="imageUrl" />
            </div>
        </template>
    </div>
</template>

<script>
import Login from "@/views/admin/Login"
import TextInput from "@/components/shared/forms/TextInput"
import DateInput from "@/components/shared/forms/DateInput"
import FileUpload from "@/components/shared/forms/FileUpload"
import ImagePreview from "@/components/shared/forms/ImagePreview"
import Button from "@/components/shared/forms/Button"
import isEmpty from "lodash/isEmpty"

export default {
    name: "Admin",
    components: {
        Login,
        TextInput,
        DateInput,
        FileUpload,
        ImagePreview,
        Button
    },
    data() {
        return {
            title: undefined,
            subTitle: undefined,
            location: undefined,
            dateImageTaken: new Date(),
            imageFileName: undefined,
            imageUrl: undefined,
            addingPost: false,
            resetUpload: false
        }
    },
    computed: {
        isAdmin() {
            return this.$store.state.users.isAdmin
        },
        disabledButton() {
            const { location, subTitle, title, imageFileName, addingPost } = this

            return isEmpty(title) || isEmpty(location) || isEmpty(imageFileName) || addingPost
        },
        documentId() {
            if (this.imageFileName === undefined) {
                return
            }

            let splitName = this.imageFileName.split(".")

            var fileExt = splitName.pop()
            return splitName.join(".")
        },
        thumbnailPath() {
            if (this.imageFileName === undefined) {
                return
            }

            let splitName = this.imageFileName.split(".")

            var fileExt = splitName.pop()

            return `gallery/thumbnails/${this.documentId}_200x200.${fileExt}`
        }
    },
    methods: {
        resetPost() {
            this.title = undefined
            this.subTitle = undefined
            this.location = undefined
            this.dateImageTaken = new Date()
            this.imageFileName = undefined
            this.imageUrl = undefined
            this.resetUpload = true
        },
        setImageName(imageFile) {
            this.imageFileName = imageFile.name
            this.imageUrl = imageFile.url
        },
        async addNewImage() {
            const { documentId, dateImageTaken, location, subTitle, title, imageFileName, getThumbnailPath } = this

            this.addingPost = true
            this.resetUpload = false
            const data = {
                imageTakenDate: dateImageTaken,
                location: location,
                subTitle: subTitle,
                title: title,
                thumbnail: this.thumbnailPath,
                images: [
                    {
                        isMain: true,
                        cloudLocation: `gallery/${imageFileName}`
                    }
                ]
            }

            await this.$store.dispatch("posts/addData", { documentId, data })
            this.addingPost = false
            alert("Success!")
            this.resetPost()
        }
    }
}
</script>
