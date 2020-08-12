<template>
	<div id="app">
		<router-view />

		<!-- Footer -->
		<Footer />
	</div>
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
	name: 'App',
	components: {
		Footer
	},
	watch: {
		// Update Title
		$route: {
			immediate: true,
			handler(to) {
				document.title = to.meta.title || 'Invoice - Invoice Builder';
			}
		},
	}
}
</script>