<script lang="ts">
	import Button, { Label, Icon } from '@smui/button';
	// import { page } from '$app/stores';
	import Paper, { Title } from '@smui/paper';
	import CreateCampaigns from '$components/dialogs/create_campaigns.svelte';
	import type { CampaignModel } from '$lib/modules/campaign/infrastructure/models';
	import type { PageData } from './$types';

	export let data: PageData;

	$: {
		console.log(data);
	}

	let create_campaign_dialog_open = false;
</script>

<h2>Dashboard</h2>
<CreateCampaigns
	bind:open={create_campaign_dialog_open}
	onCloseAction={(e) => console.log(e.detail)}
/>
<main>
	<Paper>
		<Title>
			<div class="title-container">
				Campaigns
				<Button variant="outlined" on:click={() => (create_campaign_dialog_open = true)}>
					<Icon class="material-icons">add</Icon>
					<Label>Add</Label>
				</Button>
			</div>
		</Title>
		<!-- {#if data?.data.user}
			<p>Welcome, {data.data.user.username}!</p>
		{/if} -->

		{#each data.data.campaigns as campaign}
			<p>{campaign.name}</p>
		{/each}
	</Paper>
</main>

<style lang="postcss">
	main {
		margin: auto;
		max-width: 600px;
	}

	h2 {
		margin-top: 1rem;
		margin-bottom: 2rem;
	}

	.title-container {
		display: flex;
		justify-content: space-between;
	}
</style>
