
import fireStoreRepo from "@/repositories/fireStoreRepo"
import orderBy from "lodash/orderBy" 

export default {
    namespaced: true,
    state: {
        posts: []
    },
    getters: {
        sortedPosts(state) {
            return orderBy(state.posts, ['imageTakenDate'], ['desc'])
        }
    },
    mutations: {
        setPosts: (state, posts) => state.posts = posts
    },
    actions: {
        async getPostsAsync({ commit }) {
            let posts = await fireStoreRepo.getPosts()
            commit("setPosts", posts)
        }
    }
}