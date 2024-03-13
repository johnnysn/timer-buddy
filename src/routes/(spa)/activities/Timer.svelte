<script lang="ts">
	import intervalFormatter from '$lib/utils/interval-formatter';
	import { onMount, onDestroy, afterUpdate } from 'svelte';

	export let startAt: Date = new Date();

	let elapsedTime = calculateElapsedTime();
	let interval: NodeJS.Timeout;

	function calculateElapsedTime() {
		const startDateTime = new Date(startAt).getTime();
		const currentDateTime = new Date().getTime();
		const elapsedMilliseconds = currentDateTime - startDateTime;
		return elapsedMilliseconds;
	}

	onMount(() => {
		interval = setInterval(() => {
			elapsedTime = calculateElapsedTime();
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	afterUpdate(() => {
		elapsedTime = calculateElapsedTime();
	});
</script>

<div>
	<p>
		<span class="font-medium">Elapsed time:</span>
		{intervalFormatter.format(Math.floor(elapsedTime / 1000))}
	</p>
</div>
