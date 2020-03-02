import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
const Gallery = import(/* webpackChunkName: "gallery" */ '@/views/gallery/Gallery.vue')
const Post = import(/* webpackChunkName: "post" */ '@/views/post/Post.vue')

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
	  component: () => Gallery
	},
	{
		path: '/post/:id',
		name: "Post",
		component: () => Post
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
