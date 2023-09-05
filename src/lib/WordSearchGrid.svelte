<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { generate } from "../generate";
	import type { Position } from "../generate";
	import Tile from "./Tile.svelte";
	export let words: string[];
	export let foundTiles: Position[] = [];

	function fitToScreen(){
		const {innerWidth:w, innerHeight:h} = window
		if(h > w) {
			return {columns:15, rows:25}
		}
		return {columns:25, rows:25}
	}

	const [grid, wordPositions] = generate(words,fitToScreen());

	const dispatch = createEventDispatcher();

	let isSelecting = false;
	let selection: Map<HTMLDivElement, string> = new Map();
	let pointerPos = { x: 0, y: 0 };
	function startSelecting() {
		isSelecting = true;
	}
	function stopSelecting(e:PointerEvent|MouseEvent) {
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
		pointerPos = {x:-1, y:-1}
	}
	function selectWord(
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		}
	) {
		if (!isSelecting) return;
		pointerPos = {
			x: e.clientX,
			y: e.clientY,
		};
	}
</script>

<div
	on:pointerdown={startSelecting}
	on:pointerup={stopSelecting}
	on:pointerleave={stopSelecting}
	on:mouseup={stopSelecting}
	on:pointermove={selectWord}
	class="bg-zinc-50 "
	style="touch-action:none;"
>
	{#each grid as row}
		<div class="row flex select-none">
			{#each row as tile}
				<Tile {tile} bind:selection {isSelecting} {foundTiles} {pointerPos} />
			{/each}
		</div>
	{/each}
</div>
