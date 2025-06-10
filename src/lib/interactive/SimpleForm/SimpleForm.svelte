<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { z } from 'zod';

	const schema = z.object({
		name: z.string().min(1, { message: 'Name is required' }),
		email: z.string().email({ message: 'Invalid email address' })
	});

	let submittedData: any = $state(null);
	let formError: string | null = $state(null);

	const { form, errors, data, isValid, isSubmitting } = createForm({
		extend: validator({ schema }),
		onSubmit: async (values) => {
			submittedData = null;
			formError = null;
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			console.log('Form submitted:', values);
			submittedData = values;
			// Example of a submission error:
			// if (values.name === 'error') {
			//   formError = 'Submission failed on the server!';
			//   throw new Error('Server error'); // Felte can catch this
			// }
		},
		onError: (err) => {
			console.error('onError caught:', err);
			if (err instanceof Error && !(err.name === 'FelteValidationError')) {
                 // Don't overwrite formError if it's a validation error, which is handled by `errors` store
                formError = err.message || 'An unexpected error occurred during submission.';
            } else if (typeof err === 'string') {
				formError = err;
			}
		}
	});
</script>

<form use:form>
	<div>
		<label for="name">Name:</label>
		<input id="name" type="text" name="name" bind:value={$data.name} />
		{#if $errors.name}
			<small class="error">{$errors.name[0]}</small>
		{/if}
	</div>

	<div>
		<label for="email">Email:</label>
		<input id="email" type="email" name="email" bind:value={$data.email} />
		{#if $errors.email}
			<small class="error">{$errors.email[0]}</small>
		{/if}
	</div>

	<button type="submit" disabled={$isSubmitting || !$isValid}>
		{#if $isSubmitting}
			Submitting...
		{:else}
			Submit
		{/if}
	</button>

	{#if formError}
		<p class="error">Error: {formError}</p>
	{/if}

	{#if submittedData}
		<div class="success">
			<h4>Form Submitted Successfully!</h4>
			<pre>{JSON.stringify(submittedData, null, 2)}</pre>
		</div>
	{/if}
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 400px;
		margin: 2rem auto;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 8px;
	}
	div {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	label {
		font-weight: bold;
	}
	input {
		padding: 0.5rem;
		border: 1px solid #ddd;
		border-radius: 4px;
	}
	input:invalid {
		border-color: red; /* Basic HTML5 validation indication, though felte handles errors more explicitly */
	}
	.error {
		color: red;
		font-size: 0.875rem;
	}
	button[type='submit'] {
		padding: 0.75rem;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1rem;
	}
	button[type='submit']:disabled {
		background-color: #aaa;
		cursor: not-allowed;
	}
	.success {
		margin-top: 1rem;
		padding: 1rem;
		background-color: #e6ffed;
		border: 1px solid #b2f5c8;
		border-radius: 4px;
		color: #006422;
	}
	pre {
		background-color: #f0f0f0;
		padding: 0.5rem;
		border-radius: 4px;
		overflow-x: auto;
	}
</style>
