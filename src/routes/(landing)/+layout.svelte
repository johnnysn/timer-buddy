<script lang="ts">
	import Header from './Header.svelte';
</script>

<div>
	<div
		class="min-h-dvh bg-gradient-to-tr from-white via-gray-50 to-main-sub-light to-95% text-black flex flex-col"
	>
		<Header />

		<div class="w-full flex justify-center flex-1">
			<slot />
		</div>

		<footer class="py-6 text-center">
			Copyright &copy; {new Date().getFullYear()}. Released under the MIT License.
		</footer>
	</div>
</div>
