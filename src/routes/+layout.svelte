<script lang="ts">
	import '../app.css';
	import Nav from '$components/nav.svelte';
</script>

<link rel="stylesheet" href="/mixins.css" />
<link rel="stylesheet" href="/smui.css" media="(prefers-color-scheme: light)" />
<link rel="stylesheet" href="/smui-dark.css" media="screen and (prefers-color-scheme: dark)" />

<svelte:head>
	<title>Incantates</title>
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
	}
</style>
