<script lang="ts">
	import Nav from '$components/nav.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="/smui.css" media="(prefers-color-scheme: light)" />
	<link rel="stylesheet" href="/smui-dark.css" media="screen and (prefers-color-scheme: dark)" />
	<link rel="stylesheet" href="/mixins.css" />
	<title>Incantates</title>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
</svelte:head>

<Nav />

<main>
	<slot />
</main>

<style lang="postcss">
	main {
		@apply m-6;
	}

	:global(body) {
		margin: 0%;
		min-height: 100vh;
	}
</style>
