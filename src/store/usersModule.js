
import fireStoreRepo from "@/repositories/fireStoreRepo"

export default {
    namespaced: true,
    state: {
		user: undefined,
        isAdmin: false
    },
	getters: {
		isLoggedIn(state) {
			return state.user != null;
		}
	},
	mutations: {
		setUser: (state, user) => state.user = user,
		clearUser: (state) => state.user = undefined,
        setIsAdmin: (state, isAdmin) => state.isAdmin = isAdmin
    },
    actions: {
        async getIsAdmin({ commit }) {
            const isAdmin = await fireStoreRepo.getIsAdmin()
            commit("setIsAdmin", isAdmin)
        },
		setUser({ commit }, user) {                    
			commit('setUser', {
				uid: user.uid,
				refreshToken: user.token,
				displayName: user.displayName,
				photoURL: user.photoURL,
				email: user.email
			})
		},
		clearUser({ commit }) {
			commit('clearUser')
		},
        // async addData() {
        //     fireStoreRepo.addData()
        // }
    }
}