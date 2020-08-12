<template>
	<div id="app">
		<router-view />

		<!-- Footer -->
		<app-footer />
	</div>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
export default {
	name: 'App',
	components: {
		AppFooter
	},
}
</script>