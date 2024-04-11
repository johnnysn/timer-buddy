<script lang="ts">
	import { darkModeStore } from '$lib/stores/dark-mode-store';
	import Header from './Header.svelte';

	$: darkModeClass = $darkModeStore ? 'dark' : '';
</script>

<div class={darkModeClass}>
	<div class="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300 flex flex-col">
		<Header />

		<div class="w-full flex justify-center flex-1">
			<slot />
		</div>

		<footer class="py-6 text-center">Copyright &copy; {new Date().getFullYear()}</footer>
	</div>
</div>
