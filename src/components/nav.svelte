<script lang="ts">
	import Button, { Label } from '@smui/button';
	import { page } from '$app/stores';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
</script>

<div class="top-app-bar-container flexor">
	<TopAppBar variant="static" color="secondary" dense={true}>
		<Row>
			<Section>
				<Title>Incantates</Title>
			</Section>
			{#if $page.data.user}
				<Section align="end">
					<Button variant="text" href="/dashboard" color="primary"><Label>Dashboard</Label></Button>
					<form action="logout" method="post">
						<Button variant="raised"><Label>Log out</Label></Button>
					</form>
				</Section>
			{:else}
				<Section align="end">
					<Button variant="text" href="/login" color="primary"><Label>Login</Label></Button>
					<Button variant="raised" href="/register"><Label>Register</Label></Button>
				</Section>
			{/if}
		</Row>
	</TopAppBar>
</div>

<style>
	.top-app-bar-container {
		width: 100%;
		/* height: 320px; */
		margin: 0 18px 18px 0;

		overflow: auto;
		display: inline-block;
	}

	@media (max-width: 480px) {
		.top-app-bar-container {
			margin-right: 0;
		}
	}

	.flexor {
		display: inline-flex;
		flex-direction: column;
	}

	.flexor-content {
		flex-basis: 0;
		height: 0;
		flex-grow: 1;
		overflow: auto;
	}
</style>
