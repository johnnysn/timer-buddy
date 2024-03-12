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
	<div class="w-full flex flex-row">
		<div class="w-3/12 flex justify-start items-center">
			<a href="/activities">
				<button
					class="rounded-full md:w-auto h-6 px-2 py-0 bg-primary-600 text-gray-50 hover:bg-primary-500 transition-colors duration-300"
					type="button"
				>
					<Undo2 />
				</button>
			</a>
		</div>
		<h2 class="w-9/12 flex justify-start md:justify-center text-3xl mb-4 font-semibold font-title">
			{activity?.name}
		</h2>
	</div>

	<slot />
</div>
