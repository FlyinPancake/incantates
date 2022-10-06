<script lang="ts">
	import Button, { Label, Icon } from '@smui/button';
	// import { page } from '$app/stores';
	import Paper, { Title } from '@smui/paper';
	import CreateCampaigns from '$components/dialogs/create_campaigns.svelte';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import type { PageData, ActionData, Actions } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;

	export let form: ActionData;

	$: {
		console.log(data);
		console.log('form', form);
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
				<Button variant="raised" on:click={() => (create_campaign_dialog_open = true)}>
					<Icon class="material-icons">add</Icon>
					<Label>Add</Label>
				</Button>
			</div>
		</Title>

		<Accordion multiple>
			{#each data.data.campaigns as campaign}
				<Panel color="primary">
					<Header>
						{campaign.name}
					</Header>
					<Content>
						<Paper>
							<p>{campaign.description}</p>
						</Paper>
						<div class="campaign-actions">
							<Button
								variant="text"
								color="secondary"
								style="margin-right: 1rem;"
								on:click={() => console.log('edit campaign', campaign.id)}
							>
								<Icon class="material-icons">edit</Icon>
								<Label>Edit</Label>
							</Button>
							<Button
								variant="raised"
								color="secondary"
								on:click={() => goto(`/campaign/${campaign.id}`)}
							>
								<Label>Open Details</Label>
							</Button>
						</div>
					</Content>
				</Panel>
			{/each}
		</Accordion>
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

	.campaign-actions {
		display: flex;
		justify-content: flex-end;
		margin-top: 1rem;
	}
</style>
