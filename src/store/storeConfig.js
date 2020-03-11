import Vue from 'vue'
import Vuex from 'vuex'
import posts from "@/store/postsModule"
import users from "@/store/usersModule"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		posts,
		users
	}
})
