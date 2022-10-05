<script lang="ts">
	import Button, { Label } from '@smui/button';
	import Dialog, { Actions, Content, Title } from '@smui/dialog';
	import TextField from '@smui/textfield';

	enum DialogActions {
		close = 'close',
		submit = 'submit',
	}

	export let onCloseAction: (e: {
		returnValue: boolean;
		detail: { action: keyof DialogActions };
	}) => void;
	export let open = false;
	export let data: { name: string; description: string } = { name: '', description: '' };
</script>

<Dialog
	bind:open
	surface$style="width: 850px; max-width: calc(100vw - 32px);"
	on:SMUIDialog:closed={onCloseAction}
>
	<Title>Create Campaign</Title>
	<form action="/dashboard?/createCampaign" method="post">
		<main>
			<Content>
				<div class="campaign-data">
					<div class="campaign-field">
						<TextField
							variant="outlined"
							bind:value={data.name}
							style="width: 100%;"
							label="Campaign Name"
						>
							<!-- <HelperText>The title of the campaign</HelperText> -->
						</TextField>
					</div>
					<TextField
						variant="outlined"
						bind:value={data.description}
						style="width: 100%;"
						textarea
						helperLine$style="width: 100%;"
						label="Campaign Description"
						helperText="The description of the campaign"
					>
						<!-- <Label>Campaign name</Label> -->
					</TextField>
				</div>
			</Content>
		</main>

		<Actions>
			<Button action="submit">
				<Label>Create</Label>
			</Button>
		</Actions>
		<input type="hidden" name="name" bind:value={data.name} />
		<input type="hidden" name="description" bind:value={data.description} />
	</form>
</Dialog>

<style lang="postcss">
	main {
		width: 100%;
	}

	.campaign-data {
		display: flex;
		flex-direction: column;
	}

	.campaign-field {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
</style>
