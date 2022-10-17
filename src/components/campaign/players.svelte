<script lang="ts">
	import Button, { Label } from '@smui/button';
	import List, { Item, Text, PrimaryText, SecondaryText, Meta, Separator } from '@smui/list';
	import IconButton from '@smui/icon-button';
	import Paper, { Content, Title } from '@smui/paper';

	export let players: { name: string; characterName: string; id: string | undefined }[] = [];
	export let addPlayerDialogOpen = false;
</script>

<Paper style="margin-bottom: 1rem;">
	<Title>
		<div class="title-contents">
			Players
			<Button
				on:click={() => (addPlayerDialogOpen = true)}
				variant="raised"
				class="button-shaped-round"
			>
				<Label>Add Player</Label>
			</Button>
		</div>
	</Title>
	<Content>
		<List nonInteractive twoLine>
			{#each players as player, ii}
				<Item>
					<Text>
						<PrimaryText>{player.characterName}</PrimaryText>
						<SecondaryText>{player.name}</SecondaryText>
					</Text>
					<Meta>
						<form action="?/removePlayer" method="post">
							<IconButton class="material-icons">delete</IconButton>
							<input type="hidden" value={player.id} name="playerID" />
						</form>
					</Meta>
				</Item>

				{#if ii < players.length - 1}
					<Separator />
				{/if}
			{/each}
		</List>
	</Content>
</Paper>

<style>
	.title-contents {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
