import fireStoreRepo from "@/repositories/fireStoreRepo"
import orderBy from "lodash/orderBy"

export default {
    namespaced: true,
    state: {
        posts: []
    },
    getters: {
        sortedPosts(state) {
            return orderBy(state.posts, ["imageTakenDate"], ["desc"])
        },
        selectedPost(state, getters, rootState) {
            let postId = rootState.route?.params?.id
            if (postId == null) {
                return undefined
            }

            return state.posts.find(x => x.id === postId)
        },
        currentPostIndex(state, getters, rootState) {
            let postId = rootState.route?.params?.id
            return getters.sortedPosts.findIndex(x => x.id === postId)
        },
        nextPostId(state, getters) {
            return getters.sortedPosts[getters.currentPostIndex - 1]?.id
        },
        previousPostId(state, getters) {
            return getters.sortedPosts[getters.currentPostIndex + 1]?.id
        }
    },
    mutations: {
        setPosts: (state, posts) => (state.posts = posts)
    },
    actions: {
        async getImagesAsync({ commit }) {
            let posts = await fireStoreRepo.getImages()
            commit("setPosts", posts)
        },
        async addData(_, documentId, data) {
            fireStoreRepo.addData(documentId, data)
        }
    }
}
