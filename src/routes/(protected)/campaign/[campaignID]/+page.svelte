<script lang="ts">
	import type { PageData } from './$types';
	import Paper, { Title, Content } from '@smui/paper';
	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';
	import List, { Separator, Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list';
	import Players from '$components/campaign/players.svelte';
	import CreatePlayer from '$components/dialogs/create_player.svelte';
	export let data: PageData;

	let addPlayerDialogOpen = false;
</script>

<h2>{data.campaign.name}</h2>
{#if data.campaign.id}
	<CreatePlayer bind:open={addPlayerDialogOpen} campaignId={data.campaign.id} />
{/if}
<article>
	<Paper style="margin-bottom: 1rem;">
		<Title>Sessions</Title>
	</Paper>
	<Players players={data.campaign.players} bind:addPlayerDialogOpen />
</article>

<style>
	article {
		margin: auto;
		max-width: 600px;
		width: 90%;
		display: flex;
		flex-direction: column;
	}

	:global(Paper) {
		margin-bottom: 1rem;
	}
</style>
