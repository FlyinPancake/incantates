<script lang="ts">
	import { enhance } from '$app/forms';
	import { Label } from '@smui/button';
	import type { ActionData } from './$types';
	import Button from '@smui/button/src/Button.svelte';
	import { Title } from '@smui/paper';

	import CredentialsArea from '$components/auth/credentials_area.svelte';
	import UsernameTextField from '$components/auth/username_textfield.svelte';
	import PasswordTextField from '$components/auth/password_textfield.svelte';

	export let form: ActionData;

	let username = '';
	let password = '';
</script>

<form action="?/register" method="POST" use:enhance>
	<CredentialsArea>
		<Title>Register</Title>
		<div class="input-container">
			<UsernameTextField bind:value={username} invalid={form?.user} />
			<input type="hidden" name="username" bind:value={username} />
		</div>

		<div class="input-container">
			<PasswordTextField bind:value={password} />
			<input type="hidden" name="password" bind:value={password} />
		</div>

		<Button variant="raised"><Label>Register</Label></Button>
	</CredentialsArea>
</form>

<style lang="postcss">
	.input-container {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}

	form {
		margin: auto;
	}
</style>
