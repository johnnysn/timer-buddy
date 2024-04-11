<script>
	import Toggle from '$lib/components/Toggle.svelte';
	import { darkModeStore } from '$lib/stores/dark-mode-store';
</script>

<header class="w-full flex justify-center bg-main-light dark:bg-main-dark mb-4">
	<div class="w-full h-20 px-2 md:px-6 flex justify-between items-center max-w-screen-xl">
		<div class="w-2/5">
			<a href="/" class="flex items-center gap-2">
				{#if $darkModeStore}
					<img
						src="/Logo-Dark.png"
						alt="Timer Buddy"
						width="95"
						height="75"
						class="w-auto h-[48px]"
					/>
				{:else}
					<img src="/Logo.png" alt="Timer Buddy" width="95" height="75" class="w-auto h-[48px]" />
				{/if}
				<h1 class="text-lg font-title leading-tight">
					<span class="text-main-dark dark:text-main-light font-bold italic text-lg leading-none"
						>Timer</span
					> <br />
					<span class="font-semibold">Buddy</span>
				</h1>
			</a>
		</div>

		<div class="flex justify-end items-center w-3/5">
			<div class="flex items-center border-2 rounded-full border-gray-300 dark:border-gray-800 p-3">
				<Toggle bind:checked={$darkModeStore} />
			</div>
			
			<ul class="ml-2 md:ml-6 flex items-center gap-2 md:gap-4">
				<li>
					<a href="/activities" class="flex items-center gap-1 hover:underline">
						<span class="flex justify-center font-medium">Start now</span>
					</a>
				</li>
				<li>
					<a href="/about" class="flex items-center gap-1 hover:underline">
						<span class="font-medium">About</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</header>
