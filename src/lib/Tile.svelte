<script lang="ts">
    import type { Position } from "../generate";

	export let tile:Position
	export let selection:Map<HTMLDivElement, string>; 
	let thisTile:HTMLDivElement;
</script>

<div
	bind:this={thisTile}
	class={`font-mono tile border flex justify-center items-center md:p-1 text-xs md:text-base flex-1 aspect-square text-center leading-none uppercase max-w-full md:leading-none ${selection.has(thisTile) ? 'text-amber-800 bg-amber-200' : ''} `}
	data-row={tile.row}
	data-column={tile.column}
>
	{tile.ch}
</div>
