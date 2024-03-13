<script lang="ts">
	import { activities } from '$lib/stores/activities-store';
	import type { Activity } from '$lib/types/activity';
	import intervalFormatter from '$lib/utils/interval-formatter';
	import { Info, PlayCircle, StopCircle, Trash2 } from 'lucide-svelte';
	import Timer from './Timer.svelte';
	import dateFormatter from '$lib/utils/date-formatter';

	export let activity: Activity;

	function startActivity() {
		activities.start(activity.id);
	}

	function stopActivity() {
		activities.stop(activity.id);
	}
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
			<button class="mx-1 text-teal-600" on:click={startActivity}>
				<PlayCircle />
			</button>
		{/if}
	</div>

	{#if activity.active}
		<div class="w-full flex items-center">
			<div class="w-full flex flex-col h-full pb-2">
				<span>
					<span class="font-medium">Start:</span>
					{activity.activeEventStartedAt
						? dateFormatter.formatShort(activity.activeEventStartedAt)
						: ''}
				</span>
				<Timer startAt={activity.activeEventStartedAt} />
			</div>
			<div class="w-12 flex items-center justify-end">
				<button class="mx-1 text-primary-600" on:click={stopActivity}>
					<StopCircle />
				</button>
				<button class="ml-2 mr-1 text-secondary-600">
					<Trash2 />
				</button>
			</div>
		</div>
	{/if}
</div>
