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
	watch: {
        // Update Title
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || 'Invoice - Invoicia';
            }
        },
    }
}
</script>