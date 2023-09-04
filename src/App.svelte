<script lang="ts">
	import WordSearchGrid from "./lib/WordSearchGrid.svelte";
	import Wordbank from "./lib/Wordbank.svelte";
	import { getWords } from "./words"
	const words = getWords();
	let isSidebarActive = false;
	function toggleSidebar() {
		isSidebarActive = !isSidebarActive;
	}
	let foundWords:string[] = [];
	function handleFoundWord(e){
		const word = e.detail.word
		foundWords.push(word)
		foundWords = foundWords	
	}
</script>

<div class="flex gap-4 min-h-[100vh]">
	<button
		class="p-2 bg-amber-600 text-white absolute z-10"
		on:click={toggleSidebar}
		title={isSidebarActive ? "close sidebar" : "show sidebar"}
	>
		{#if isSidebarActive}
			{@html "&larr;"}
		{:else}
			{@html "&rarr;"}
		{/if}
	</button >
	{#if isSidebarActive}
		<aside class="md:max-w-[252px] shadow md:shadow-none absolute w-[80vw] h-full md:relative flex-1 bg-zinc-50 text-amber-700 pt-12">
			<article class="border-b pb-5">
				<header 
					class="p-2"
				>
					<h2 class="font-bold">Found Words</h2>
				</header>

				<div class="p-2">
				{#each foundWords as word}
					<p class="line-through">{word}</p>
				{/each}
				</div>
			</article>
			<Wordbank {words} {foundWords}/>
		</aside>
	{/if}
	<main class="flex flex-col justify-start pt-10 items-center flex-1">
		<div
			class="p-2 bg-zinc-50 aspect-square max-w-full w-auto h-auto max-h-screen"
		>
			<WordSearchGrid {words} on:foundWord={handleFoundWord} />
		</div>
	</main>
</div>

<style>
	:global(body, #app) {
		min-height: 100vh;
		margin: 0;
		padding: 0;
		overflow:hidden;
	}
</style>
