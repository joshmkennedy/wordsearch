<script lang="ts">
	import { fade } from "svelte/transition";
	import WordSearchGrid from "./lib/WordSearchGrid.svelte";
	import Wordbank from "./lib/Wordbank.svelte";
	import { getWords } from "./words";
	const wordlist = new URLSearchParams(window.location.search).get("wordlist");
	console.log(wordlist);
	const words = getWords(wordlist);
	let isSidebarActive = true;
	function toggleSidebar() {
		isSidebarActive = !isSidebarActive;
	}

	let foundWords: string[] = [];
	function handleFoundWord(e: CustomEvent<{ word: string }>) {
		const word = e.detail.word;
		foundWords.push(word);
		foundWords = foundWords;
	}
	let restart: () => void;
</script>

<div class="flex gap-4 min-h-[100vh]">
	<button
		class="p-2 bg-amber-600 text-white fixed z-50"
		on:click={toggleSidebar}
		title={isSidebarActive ? "close sidebar" : "show sidebar"}
	>
		{#if isSidebarActive}
			{@html "&larr;"}
		{:else}
			{@html "menu"}
		{/if}
	</button>
	{#if isSidebarActive}
		<aside
			transition:fade
			class="md:max-w-[252px] shadow z-10 md:shadow-none absolute w-[80vw] h-full md:h-auto md:relative flex-1 bg-zinc-50 text-amber-700 pt-12"
		>
		<div class="sticky top-12 ">
			<article class="border-b pb-5">
				<header class="p-2 flex items-baseline justify-between gap-1">
					<h2 class="font-bold">Found Words</h2>
					<span class="text-sm block p-2 bg-zinc-100"
						>{foundWords.length} / {words.length}</span
					>
				</header>

				<div class="p-2">
					{#each foundWords as word}
						<p class="line-through">{word}</p>
					{/each}
				</div>
			</article>
			<Wordbank {words} {foundWords} />
			<div>
		</aside>
	{/if}
	<main class="flex flex-col justify-start pt-10 items-center flex-1">
		<div class="p-2 aspect-square max-w-[900px] h-auto max-h-screen w-full">
			<WordSearchGrid bind:restart {words} on:foundWord={handleFoundWord} />
		</div>
	</main>
</div>

{#if foundWords.length == words.length}
	<div class="fixed backdrop-blur z-50 bg-black bg-opacity-40 inset-0 flex justify-center items-center">
		<div class=" relative z-50 max-w-xs text-center p-5 bg-white rounded shadow-2xl">
			<h2 class="text-2xl text-amber-600 mb-5">Congrats!</h2>
			<p class="mb-5">You found all {words.length} words</p>
			<button
				class="bg-amber-600 text-white hover:bg-amber-700 p-3 rounded font-bold px-4"
				on:click={()=>{
					foundWords = []
					restart()
				}}
			>Play again?</button>
		</div>
	</div>
{/if}

<style>
	:global(html, body) {
		overscroll-behavior-x: none !important;
	}
	:global(body, #app) {
		min-height: 100vh;
		margin: 0;
		padding: 0;
	}
	:global(:root) {
		overflow-x: hidden;
		@apply bg-amber-50 text-amber-900;
	}
	#app {
		padding-bottom: 1rem;
	}
</style>
