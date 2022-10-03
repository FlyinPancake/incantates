<script lang="ts">
	import Button, { Label } from '@smui/button';
	import { page } from '$app/stores';
	import RoundedActionButton from '$components/rounded_action_button.svelte';
</script>

<h2>Dashboard</h2>

{#if $page.data.user}
	<p>Welcome, {$page.data.user.name}!</p>
	<!-- <RoundedActionButton href="/logout">Log out</RoundedActionButton> -->
{/if}
