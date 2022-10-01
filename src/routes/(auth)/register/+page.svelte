<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form action="?/register" method="POST" use:enhance>
	<div>
		<label for="username">Username</label>
		<input type="text" name="username" id="username" />
	</div>

	<div>
		<label for="password">Password</label>
		<input type="password" name="password" id="password" />
	</div>

	{#if form?.user}
		<p class="error">This username is taken</p>
	{/if}

	<button type="submit">Register</button>
</form>
