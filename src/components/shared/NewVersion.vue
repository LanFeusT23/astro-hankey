<template>
    <AlertNotification :showNotification="newServiceWorker" class="container z-50 font-bold">
        <span>New version available!</span>
        <a
            @click="refresh"
            class="ml-2 font-bold text-green-600 uppercase cursor-pointer new-version__refresh-page"
        >Refresh</a>
    </AlertNotification>
</template>

<script>
import { EVENTS } from "@/registerServiceWorker.js"
import AlertNotification from "@/components/shared/AlertNotification"

export default {
    name: "NewVersion",
    components: {
        AlertNotification
    },
    data() {
        return {
            newServiceWorker: false
        }
    },
    created() {
        window.document.addEventListener(EVENTS.UPDATED, this.newVersion)
    },
    methods: {
        newVersion(event) {
            this.newServiceWorker = event?.detail?.registration ? true : false
        },
        refresh() {
            console.log("newServiceWorker?", this.newServiceWorker)

            if (this.newServiceWorker) {
                window.document.dispatchEvent(new CustomEvent(EVENTS.REFRESH))
            } else {
                window.location = "/"
            }
        }
    },
    beforeDestroy() {
        window.document.removeEventListener(EVENTS.UPDATED, this.newVersion)
    }
}
</script>
