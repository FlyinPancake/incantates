<script lang="ts">
	import Button, { Label, Group } from '@smui/button';
	import Dialog, { Actions, Content, Title } from '@smui/dialog';
	import TextField, { HelperLine } from '@smui/textfield';

	enum DialogActions {
		close = 'close',
		submit = 'submit',
	}

	export let campaignId: string;
	export let open = false;
	export const onCloseAction = (e: {
		returnValue: boolean;
		detail: { action: keyof DialogActions };
	}) => {
		console.log(e.detail);
	};

	let data: { name: string; characterName: string } = { name: '', characterName: '' };
</script>

<Dialog
	bind:open
	surface$style="width: 850px; max-width: calc(100vw - 32px);"
	on:SMUIDialog:closed={onCloseAction}
>
	<Title>Add Player</Title>
	<form action="/campaign/{campaignId}?/addPlayer" method="post">
		<Content>
			<div class="player-data">
				<div class="player-field">
					<TextField
						label="Player Name"
						bind:value={data.name}
						variant="outlined"
						style="width: 100%;"
						input$name="name"
					/>
				</div>
				<div class="player-data">
					<TextField
						label="Character Name"
						bind:value={data.characterName}
						variant="outlined"
						style="width: 100%;"
						action="submit"
						input$name="characterName"
					/>
				</div>
			</div>
		</Content>
		<Actions>
			<Group>
				<!-- <Button action="cancel" variant="outlined">
					<Label>Cancel</Label>
				</Button> -->
				<Button action="submit" variant="raised">
					<Label>Add</Label>
				</Button>
			</Group>
		</Actions>
	</form>
</Dialog>

<style>
	.player-data {
		display: flex;
		flex-direction: column;
	}
	.player-field {
		margin-bottom: 1rem;
		width: 100%;
	}
</style>
