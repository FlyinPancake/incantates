<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>Dashboard</h1>

{#if $page.data.user}
	<p>Welcome, {$page.data.user.name}!</p>
{/if}
