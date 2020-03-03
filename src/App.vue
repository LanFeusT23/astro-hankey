<template>
	<div id="app" class="container relative h-full mx-auto">
		<Navigation class="absolute top-0 h-16"></Navigation>

		<router-view class="h-full" />
	</div>
</template>


<script>
	import Navigation from "@/components/Navigation"

	export default {
		name: "App",
		metaInfo: {
			title: "Jonathan Hankey Astrophotography",
			titleTemplate: "%s | Jonathan Hankey Astrophotography"
		},
		components: {
			Navigation
		}
	}
</script>