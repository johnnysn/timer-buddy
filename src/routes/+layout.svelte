<script>
	import '../app.css';
	import Header from './Header.svelte';
	import Toasts from '$lib/components/Toasts.svelte';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Quicksand:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
	<title>Timer Buddy</title>
</svelte:head>

<div class={`font-standard antialiased`}>
	<div
		class="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300 flex flex-col"
	>
		<Header />

		<Toasts />

		<div class="w-full flex justify-center flex-1">
			<slot />
		</div>

		<footer class="py-6 text-center">Copyright &copy; {new Date().getFullYear()}</footer>
	</div>
</div>
