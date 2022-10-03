<script lang="ts">
	import TextField from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';

	export let value: string | undefined;
	export let invalid: boolean = false;
</script>

<TextField
	variant="outlined"
	label="Password"
	type="password"
	bind:invalid
	bind:value
	required
	name="password"
>
	<HelperText slot="helper">A string and complicated password</HelperText>
</TextField>
