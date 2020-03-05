import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
const Gallery = import(/* webpackChunkName: "gallery" */ '@/views/gallery/Gallery.vue')
const ImageList = import(/* webpackChunkName: "imagelist" */ '@/views/gallery/ImageList.vue')
const ImagePost = import(/* webpackChunkName: "imagepost" */ '@/views/gallery/ImagePost.vue')
const Gear = import(/* webpackChunkName: "gear" */ '@/views/gear/Gear.vue')
const Admin = import(/* webpackChunkName: "admin" */ '@/views/admin/Admin.vue')

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			order: 1
		},
	},
	{
		path: '/gallery',
		component: () => Gallery,
		children: [
			{
				path: '/',
				name: "ImageList",
				component: () => ImageList,
				meta: {
					order: 2
				}
			},
			{
				path: ':id',
				name: "ImagePost",
				component: () => ImagePost,
				meta: {
					order: 2
				}
			}
		]
	},
	{
		path: '/gear',
		name: 'Gear',
		component: () => Gear,
		meta: {
			order: 3
		}
	},
	{
		path: '/admin',
		name: 'Admin',
		component: () => Admin
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
