<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { plans } from '$lib/stores/plans-store';
	import type { Plan } from '$lib/types/plan';

	let plan: Plan | undefined;

	$: {
		plan = $plans.find((p) => p.id === $page.params.id);
		if (!plan) {
			goto('/plans');
		}
	}
</script>

<div class="flex flex-col">
	<h2 class="text-3xl mb-4 font-semibold font-title text-center w-full">
		{plan?.name}
	</h2>

	<slot />
</div>
