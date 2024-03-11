<script>
	import { Activity, Timer, User2, NotepadText } from 'lucide-svelte';
</script>

<header class="w-full flex justify-center bg-primary-400">
	<div class="w-full h-16 px-2 md:px-6 flex justify-between items-center max-w-screen-xl">
		<a href="/" class="flex justify-items-center">
			<button>
				<Timer />
			</button>
			Timer Buddy
		</a>

		<div class="flex items-center">
			<ul class="ml-3 flex items-center gap-2">
				<li></li>
				<li>
					<a href="/activities"><Activity /></a>
				</li>
				<li>
					<a href="/"><NotepadText /></a>
				</li>
				<li>
				</li>
			</ul>
		</div>
	</div>
</header>
