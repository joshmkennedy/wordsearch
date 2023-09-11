<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { generate, fitToScreen } from "../generate";
	import { positionListsEqual } from "../utils";
	import type { Position } from "../generate";
	import Tile from "./Tile.svelte";
	
	const dispatch = createEventDispatcher();
	
	export let words: string[];
	export let foundTiles: Position[] = [];

	let [grid, wordPositions] = generate(words, fitToScreen());

	let isSelecting = false;
	let selection: Map<HTMLDivElement, string> = new Map();
	let pointerPos = { x: 0, y: 0 };

	function startSelecting() {
		isSelecting = true;
	}

	function stopSelecting(e: PointerEvent | MouseEvent) {
		isSelecting = false;
		//setup
		let word = [...selection.values()].join("");
		const reversedWord = word.split("").reverse().join("");
		const tiles: Position[] = [...selection.entries()].map(([el, ch]) => {
			const { row, column } = el.dataset;
			if (!row || !column)
				throw new Error("tiles do not have proper attributes");
			return {
				row: +row,
				column: +column,
				ch: ch,
			};
		});
		//checks
		const foundAsDrawn = words.includes(word);
		const foundReversed = words.includes(reversedWord);
		if (foundAsDrawn || foundReversed) {
			const foundWord = wordPositions.find(
				(w) => w.name === reversedWord || w.name === word
			);
			if (foundReversed) {
				tiles.reverse();
				word = reversedWord
			}
			if (foundWord && positionListsEqual(foundWord.positions, tiles)){
				foundTiles.push(...tiles);
			}
			foundTiles = foundTiles;
			dispatch("foundWord", { word });
		}
		//clean up
		selection.clear();
		selection = selection;
		pointerPos = { x: -1, y: -1 };
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

	export const restart = ()=>{
		[grid, wordPositions] = generate(words, fitToScreen())
		foundTiles = [];
	}

</script>

<div
	on:pointerdown={startSelecting}
	on:pointerup={stopSelecting}
	on:pointerleave={stopSelecting}
	on:mouseup={stopSelecting}
	on:pointermove={selectWord}
	class="bg-zinc-50"
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
