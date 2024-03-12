<script lang="ts">
	import type { Activity } from '$lib/types/activity';
	import intervalFormatter from '$lib/utils/interval-formatter';
	import { Info, PlayCircle } from 'lucide-svelte';

	export let activity: Activity;
</script>

<div class="w-full flex flex-col items-center">
	<div class="w-full flex items-center">
		<a class="w-full h-full py-2" href="/activities/{activity.id}">
			<div class="w-full flex items-center">
				<button class="mr-2 text-primary-600">
					<Info />
				</button>
				<span>
					{activity.name}
					{activity.averageDuration
						? `(~${intervalFormatter.format(activity.averageDuration)})`
						: ''}
				</span>
			</div>
		</a>
		{#if !activity.active}
			<button class="mx-1 text-teal-600">
				<PlayCircle />
			</button>
		{/if}
	</div>
</div>
