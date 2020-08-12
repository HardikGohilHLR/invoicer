<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'App',
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