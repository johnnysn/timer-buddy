<script lang="ts">
	import { darkModeStore } from '$lib/stores/dark-mode-store';
	import Header from './Header.svelte';

	$: darkModeClass = $darkModeStore ? 'dark' : '';
</script>

<div class={darkModeClass}>
	<div
		class="relative min-h-dvh bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300 flex flex-col"
	>
		<div class="fixed top-0 w-full"><Header /></div>

		<div class="w-full flex justify-center flex-1 pt-20">
			<div class="w-full max-w-screen-md px-2 md:px-6 mt-4">
				<slot />
			</div>
		</div>

		<footer class="py-6 text-center">Copyright &copy; {new Date().getFullYear()}</footer>
	</div>
</div>
