import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
const Gallery = import(/* webpackChunkName: "about" */ '@/views/gallery/Gallery.vue')

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
	  path: '/gallery',
	  name: 'Gallery',
	  // route level code-splitting
	  // this generates a separate chunk (about.[hash].js) for this route
	  // which is lazy-loaded when the route is visited.
	  component: () => Gallery
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
