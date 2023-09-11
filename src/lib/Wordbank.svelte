<script lang="ts">
    import { slide } from "svelte/transition";

	export let words: string[] = [];
	export let isOpen = true;
	export let foundWords: string[] = [];
</script>

<article class="border-b py-5">
	<header class="p-2 flex justify-between gap-1 items-stretch">
		<h2 class="font-bold">WordBank</h2>
		<button
			class="p-1 bg-amber-100 hover:bg-amber-300 hover:text-amber-700 rounded px-2 text-xs"
			on:click={()=>(isOpen = !isOpen)}
		>
			{#if isOpen }
				hide
			{:else}
				show
			{/if}
		</button>
	</header>
	{#if isOpen}
	<ol transition:slide class="list-decimal px-2">
		{#each words as word}
			<li class={`list-decimal ml-5 ${foundWords.includes(word) ? 'line-through' :''}`}>{word}</li>
		{/each}
	</ol>
	{/if}
</article>
