<script lang="ts">
	export let action: () => void;
</script>

<button on:click={action}>
	<slot />
</button>

<style lang="postcss">
	button {
		@apply bg-purple-700 text-white font-bold py-2 px-4 rounded-full;
	}
</style>
