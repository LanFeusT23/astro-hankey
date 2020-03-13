<template>
    <div class="pt-24">
        <Login />

        <template v-if="isAdmin">
            <div class="my-6 text-xl font-bold">Upload new image post</div>

            <div class="flex">
                <div class="flex-1">
                    <TextInput class="mb-3" v-model="title" label="Title" />

                    <TextInput class="mb-3" v-model="subTitle" label="SubTitle" />

                    <TextInput class="mb-3" v-model="location" label="Location" />

                    <DateInput class="mb-3" v-model="dateImageTaken" label="Date image taken" />
                </div>

                <FileUpload class="flex-1" @image-uploaded="setImageRef"></FileUpload>
            </div>

            <Button
                class="mt-10"
                :disabled="disabledButton"
                @click="addNewImage"
            >Add new image post!</Button>
        </template>
    </div>
</template>

<script>
import Login from "@/views/admin/Login"
import TextInput from "@/components/shared/forms/TextInput"
import DateInput from "@/components/shared/forms/DateInput"
import FileUpload from "@/components/shared/forms/FileUpload"
import Button from "@/components/shared/forms/Button"
import isEmpty from "lodash/isEmpty"

export default {
    name: "Admin",
    components: {
        Login,
        TextInput,
        DateInput,
        FileUpload,
        Button
    },
    data() {
        return {
            title: undefined,
            subTitle: undefined,
            location: undefined,
            dateImageTaken: new Date(),
            imageUrl: undefined
        }
    },
    computed: {
        isAdmin() {
            return this.$store.state.users.isAdmin
        },
        disabledButton() {
            const { location, subTitle, title, imageUrl } = this

            return isEmpty(title) && isEmpty(subTitle) && isEmpty(location) && isEmpty(imageUrl)
        }
    },
    methods: {
        setImageRef(imageUrl) {
            this.imageUrl = imageUrl
        },
        addNewImage() {
            const { dateImageTaken, location, subTitle, title, imageUrl } = this

            const data = {
                imageTakenDate: dateImageTaken,
                location: location,
                subTitle: subTitle,
                title: title,
                thumbnail: imageUrl,
                images: [
                    {
                        isMain: true,
                        cloudLocation: imageUrl
                    }
                ]
            }

            this.$store.dispatch("posts/addData", data)
        }
    }
}
</script>
