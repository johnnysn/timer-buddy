<script lang="ts">
	import Header from './Header.svelte';
</script>

<div>
	<div class="min-h-screen bg-white text-black flex flex-col">
		<Header />

		<div class="w-full flex justify-center flex-1">
			<slot />
		</div>

		<footer class="py-6 text-center">Copyright &copy; {new Date().getFullYear()}</footer>
	</div>
</div>
