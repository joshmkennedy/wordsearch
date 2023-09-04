<script lang="ts">
    import type { Position } from "../generate";
	export let foundTiles:Position[] = [];
	export let tile:Position
	export let selection:Map<HTMLDivElement, string>; 
	let thisTile:HTMLDivElement;

	let isFound:boolean;
	$:isFound = foundTiles.some(t=>t.column == tile.column && tile.row == t.row && t.ch == tile.ch)
</script>

<div
	bind:this={thisTile}
	class={`font-mono tile border  flex justify-center items-center md:p-1 text-xs md:text-base flex-1 aspect-square
	text-center leading-none uppercase max-w-full md:leading-none 
	${selection.has(thisTile) ? 'text-amber-800 border-amber-200 bg-amber-200' : ''}  
	${isFound ? 'bg-amber-600 text-white border-amber-600' : ''}`} data-row={tile.row}
	data-column={tile.column}
>
	{tile.ch}
</div>
