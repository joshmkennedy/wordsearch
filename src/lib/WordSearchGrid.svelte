<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { generate } from "../generate";
	import type { Position } from "../generate";
	import Tile from "./Tile.svelte";
	export let words: string[];
	export let foundTiles: Position[] = [];

	const [grid, wordPositions] = generate(words);
	const dispatch = createEventDispatcher();

	let isSelecting = false;
	let selection: Map<HTMLDivElement, string> = new Map();
	function startSelecting() {
		isSelecting = true;
	}
	function stopSelecting(e) {
		console.log("stop selecting", e)
		if(e.target != e.currentTarget) return
		isSelecting = false;
		const word = [...selection.values()].join("");
		const tiles = [...selection.entries()].map(([el, ch]) => {
			const { row, column } = el.dataset;
			return {
				row: +row,
				column: +column,
				ch: ch,
			};
		});
		foundTiles = foundTiles;
		if (words.includes(word)) {
			foundTiles.push(...tiles);
			dispatch("foundWord", { word });
		}
		selection.clear();
		selection = selection;
	}
	function selectWord(
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
			target: EventTarget & HTMLDivElement;
		}
	) {
		if (!isSelecting) return;
		const { innerHTML: ch } = e.target;
		if (selection.has(e.target)) return;
		selection.set(e.target, ch);
		selection = selection;
	}
</script>
<!--
# Do do mobile.
- get the target element position.
- get the distance from the start 
- decide how many squares the are between the start and current position
- find what squares those are and add them to the selection.
-->
<div
	on:pointerdown={startSelecting}
	on:pointerup={stopSelecting}
	on:pointerleave={stopSelecting}
	on:pointermove={(e) => {
	e.preventDefault()
		console.log(e)
		selectWord(e);
	}}
	class="bg-zinc-50"
	style="touch-action:none;"
>
	{#each grid as row}
		<div class="row flex select-none">
			{#each row as tile}
				<Tile {tile} {selection} {foundTiles} />
			{/each}
		</div>
	{/each}
</div>
