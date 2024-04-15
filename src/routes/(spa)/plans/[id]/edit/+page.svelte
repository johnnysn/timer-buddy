<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import { planFormSchema } from '$lib/schemas/plan-schema';
	import { plans } from '$lib/stores/plans-store';
	import { addToast } from '$lib/stores/toast-store';
	import type { Plan } from '$lib/types/plan';

	let plan: Plan | undefined;

	$: {
		plan = $plans.find((p) => p.id === $page.params.id);
	}

	function submit(e: SubmitEvent) {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		try {
			const data = planFormSchema.parse(formData);

			plans.update(plan!.id, data.name, data.description ?? '');
			goto(`/plans/${plan!.id}`);
		} catch (e) {
			addToast({ message: 'The input data is invalid!', type: 'error' });
		}
	}
</script>

<form
	class="flex flex-col gap-2 mt-2 mb-4 max-w-screen-md border rounded-lg border-gray-200 dark:border-gray-700 p-4"
	on:submit={submit}
>
	<Input name="name" id="name" required label="Plan name" maxlength={40} value={plan?.name} />
	<Textarea
		name="description"
		id="description"
		label="Description"
		maxlength={255}
		value={plan?.description}
	/>

	<div class="w-full flex justify-around">
		<a href={`/plans/${plan?.id}`}>
			<Button class="secondary" type="button">Cancel</Button>
		</a>
		<Button class="success">Update</Button>
	</div>
</form>
