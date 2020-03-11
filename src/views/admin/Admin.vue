<template>
    <div class="pt-24">
        <div class="flex items-center justify-end">
            <div v-if="!isAdmin">
                You are not an admin... yet!
            </div>
            <div v-else>
                You are an admin!
            </div>

            <button class="px-4 py-2 ml-6 bg-gray-700 rounded" @click="login" v-show="!isLoggedIn">Login</button>
            <button class="px-4 py-2 ml-6 bg-red-900 rounded" @click="logout" v-show="isLoggedIn">Logout</button>
        </div>

        <div class="mt-6">
            New image form here
        </div>
    </div>
</template>

<script>
    import { authProvider, firebaseAuth } from "@/firebaseConfig.js"

    export default {
        name: "Admin",
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
                    const token = await firebaseAuth().currentUser.getIdToken()
                    user.token = token
                    console.log("user authenticated", user)
                    await this.$store.dispatch("users/setUser", user)
                    await this.$store.dispatch("users/getIsAdmin")
                } else {
                    console.log("user not authenticated", user) 
                    await this.$store.dispatch("users/clearUser")
                    await this.$store.dispatch("users/getIsAdmin")
                }
                
                this.loading = false
            });

            try {
                const result = await firebaseAuth().getRedirectResult()
                if (result.credential) {
                    var user = result.user
                    var token = result.credential.accessToken
                    user.token = token
                    await this.$store.dispatch("users/setUser", user)
                    await this.$store.dispatch("users/getIsAdmin")
                }
            } catch (error) {
                console.log(error);
                alert("There was an error authenticating!")
            }
        }
    }
</script>