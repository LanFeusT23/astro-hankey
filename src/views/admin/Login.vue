<template>
    <div class="flex items-center justify-end">
        <div v-if="!isAdmin" class="text-sm">You are not an admin... yet!</div>
        <div v-else class="text-sm">You are an admin!</div>

        <Button class="ml-6" @click="login" v-show="!isLoggedIn">Login</Button>
        <Button class="ml-6" @click="logout" v-show="isLoggedIn">Logout</Button>
    </div>
</template>

<script>
import Button from "@/components/shared/forms/Button"

import { authProvider, firebaseAuth } from "@/firebaseConfig.js"

export default {
    name: "Login",
    components: {
        Button
    },
    data() {
        return {
            loading: false
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters["users/isLoggedIn"]
        },
        isAdmin() {
            return this.$store.state.users.isAdmin
        }
    },
    methods: {
        login() {
            firebaseAuth().signInWithRedirect(authProvider)
        },
        async logout() {
            try {
                await firebaseAuth().signOut()
            } catch (error) {
                alert("Signing out was unsuccessful!")
            }
        }
    },
    async created() {
        firebaseAuth().onAuthStateChanged(async user => {
            this.loading = true
            if (user) {
                console.log("user authenticated", user)
                await this.$store.dispatch("users/setUser", user)
                await this.$store.dispatch("users/getIsAdmin")
            } else {
                console.log("user not authenticated", user)
                await this.$store.dispatch("users/clearUser")
                await this.$store.dispatch("users/getIsAdmin")
            }

            this.loading = false
        })
    }
}
</script>