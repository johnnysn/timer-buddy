<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Undo2 } from 'lucide-svelte';
	import { activities } from '$lib/stores/activities-store';
	import type { Activity } from '$lib/types/activity';

	let activity: Activity | undefined;

	$: {
		activity = $activities.find((a) => a.id === $page.params.id);
		if (!activity) {
			goto('/activities');
		}
	}
</script>

<div class="flex flex-col">
	<h2 class="text-3xl mb-4 font-semibold font-title w-full text-center">
		{activity?.name}
	</h2>
	<slot />
</div>
