<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let targetTime: Date;
	export let averageDuration: number;

	let interval: number;
	let countdown = '';

	function updateCountdown() {
		const now = new Date();

		var timeDifference = targetTime.getTime() - now.getTime() - averageDuration * 1000;

		if (timeDifference <= 0) {
			clearInterval(interval);
			return '0h 0m 0s';
		}

		var hours = Math.floor(timeDifference / (1000 * 60 * 60));
		var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

		return hours + 'h ' + minutes + 'm ' + seconds + 's';
	}

	onMount(() => {
		interval = setInterval(() => {
			countdown = updateCountdown();
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div>
	{countdown}
</div>
