<script>
	import { Activity, DatabaseBackup, NotepadText } from 'lucide-svelte';
	import Toggle from '$lib/components/Toggle.svelte';
	import { darkModeStore } from '$lib/stores/dark-mode-store';
</script>

<header class="w-full flex justify-center bg-main-light dark:bg-main-dark">
	<div class="w-full h-20 px-2 md:px-6 flex justify-between items-center max-w-screen-xl">
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

		<div class="flex items-center">
			<div class="flex items-center border-r border-main-dark dark:border-main p-3">
				<Toggle bind:checked={$darkModeStore} />
			</div>

			<ul class="ml-2 md:ml-6 flex items-center gap-3 md:gap-4">
				<li>
					<a href="/activities" class="flex items-center gap-1">
						<button aria-label="Activities">
							<Activity class="size-6 md:size-5" />
						</button>
						<span class="font-medium hidden md:block">Activities</span>
					</a>
				</li>
				<li>
					<a href="/plans" class="flex items-center gap-1">
						<button aria-label="Plans">
							<NotepadText class="size-6 md:size-5" />
						</button>
						<span class="font-medium hidden md:block">Plans</span>
					</a>
				</li>
				<li>
					<a href="/backup" class="flex items-center gap-1">
						<button aria-label="Plans">
							<DatabaseBackup class="size-6 md:size-5" />
						</button>
						<span class="font-medium hidden md:block">Backup</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</header>
