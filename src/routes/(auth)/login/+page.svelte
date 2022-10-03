<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionData } from './$types';

	import Button, { Label } from '@smui/button';
	import { Title } from '@smui/paper';
	import TextField, { Input } from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';

	import CredentialsArea from '$components/auth/credentials_area.svelte';
	import UsernameTextField from '$components/auth/username_textfield.svelte';
	import PasswordTextField from '$components/auth/password_textfield.svelte';

	let username = '';
	let password = '';

	export let form: ActionData;
</script>

<form
	action="?/login"
	method="POST"
	use:enhance={() => {
		return async ({ result }) => {
			await invalidateAll();
			await applyAction(result);
		};
	}}
>
	<CredentialsArea>
		<Title>Login</Title>
		<div class="input-form-member">
			<UsernameTextField bind:value={username} invalid={form?.credentials ?? false} />
			<input name="username" bind:value={username} type="hidden" />
		</div>
		<div class="input-form-member">
			<PasswordTextField bind:value={password} invalid={form?.credentials ?? false} />
			<input name="password" bind:value={password} type="hidden" />
		</div>
		<Button variant="raised">
			<Label>Login</Label>
		</Button>
	</CredentialsArea>
</form>

<style lang="postcss">
	form {
		margin: auto;
	}

	/* .centered {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	} */

	.input-form-member {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}
</style>
