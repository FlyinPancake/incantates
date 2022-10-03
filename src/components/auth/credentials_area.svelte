<script lang="ts">
	import Paper from '@smui/paper';
</script>

<Paper class="credentials-area">
	<div class="centered">
		<slot />
	</div>
</Paper>

<style>
	.centered {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	:global(.credentials-area) {
		margin: auto;
		width: 90%;
		max-width: 600px;
	}
</style>
