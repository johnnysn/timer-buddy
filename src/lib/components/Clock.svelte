<script lang="ts">
	import dateFormatter from '$lib/utils/date-formatter';
	import { onMount, onDestroy } from 'svelte';

	let interval: number;
	let formattedDateTime = dateFormatter.formatShort(new Date());

	export let secondsToAdd = 0;

	onMount(() => {
		interval = setInterval(() => {
			formattedDateTime = dateFormatter.formatShort(
				new Date(new Date().getTime() + secondsToAdd * 1000)
			);
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div>
	<p>{formattedDateTime}</p>
</div>
