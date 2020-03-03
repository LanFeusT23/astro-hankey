import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
const Gallery = import(/* webpackChunkName: "gallery" */ '@/views/gallery/Gallery.vue')
const ImageList = import(/* webpackChunkName: "imagelist" */ '@/views/gallery/ImageList.vue')
const ImagePost = import(/* webpackChunkName: "imagepost" */ '@/views/gallery/ImagePost.vue')

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
	  component: () => Gallery,
	  children: [
			{
				path: '/',
				name: "ImageList",
				component: () => ImageList
			},
			{
				path: ':id',
				name: "Post",
				component: () => ImagePost
			}
		]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
