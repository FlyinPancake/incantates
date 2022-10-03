<script lang="ts">
	import TextField from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';

	export let value: string | undefined;
	export let invalid: boolean | undefined;
</script>

<TextField variant="outlined" label="Username" bind:value required bind:invalid>
	<HelperText slot="helper">A unique username to identify you</HelperText>
</TextField>
