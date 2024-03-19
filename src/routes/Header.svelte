<script>
	import { Activity, Timer, User2, NotepadText } from 'lucide-svelte';
</script>

<header class="w-full flex justify-center bg-main-light">
	<div class="w-full h-16 px-2 md:px-6 flex justify-between items-center max-w-screen-xl">
		<a href="/" class="flex items-center gap-1">
			<button>
				<Timer />
			</button>
			<span class="font-medium">Timer Buddy</span>
		</a>

		<div class="flex items-center">
			<ul class="ml-3 flex items-center gap-2 md:gap-4">
				<li></li>
				<li>
					<a href="/activities" class="flex items-center gap-1">
						<button aria-label="Activities">
							<Activity class="size-6 md:size-5" />
						</button>
						<span class="font-medium hidden md:block">Activities</span>
					</a>
				</li>
				<li>
					<a href="/" class="flex items-center gap-1">
						<button aria-label="Plans">
							<NotepadText class="size-6 md:size-5" />
						</button>
						<span class="font-medium hidden md:block">Plans</span>
					</a>
				</li>
				<li></li>
			</ul>
		</div>
	</div>
</header>
