<script lang="ts">
	import type { Position } from "../generate";
	export let foundTiles: Position[] = [];
	export let pointerPos: { x: number; y: number };
	export let tile: Position;
	export let isSelecting:boolean = false
	export let selection: Map<HTMLDivElement, string>;
	let thisTile: HTMLDivElement;

	let isFound: boolean;
	$: isFound = foundTiles.some(
		(t) => t.column == tile.column && tile.row == t.row && t.ch == tile.ch
	);
	function inRange(coord: { x: number; y: number }) {
		if (!thisTile || !pointerPos) return false;
		const { x, y, width, height } = thisTile.getBoundingClientRect();
		if (
			coord.y >= y &&
			coord.y < y + height &&
			coord.x >= x &&
			coord.x < x + width
		) {
			console.log(thisTile);
			return true;
		}
		return false;
	}
	$: {
		if (inRange(pointerPos)) {
			if (thisTile && tile.ch && isSelecting) {
				selection.set(thisTile, tile.ch);
				selection = selection
			}
		}
	}
</script>

<div
	bind:this={thisTile}
	class={`font-mono tile border  flex justify-center items-center md:p-1 text-xs md:text-base flex-1 aspect-square
	text-center leading-none uppercase max-w-full md:leading-none 
	${
		selection.has(thisTile)
			? "text-amber-800 border-amber-200 bg-amber-200"
			: ""
	}  
	${isFound ? "bg-amber-600 text-white border-amber-600" : ""}`}
	data-row={tile.row}
	data-column={tile.column}
>
	{tile.ch}
</div>
