
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
        },
        selectedPost(state, getters, rootState) {
            let postId = rootState.route?.params?.id
            if (postId == null) {
                return undefined
            }

            return state.posts.find(x => x.id === postId)
        }
    },
    mutations: {
        setPosts: (state, posts) => state.posts = posts
    },
    actions: {
        async getImagesAsync({ commit }) {
            let posts = await fireStoreRepo.getImages()
            commit("setPosts", posts)
        },
        // async addData() {
        //     fireStoreRepo.addData()
        // }
    }
}