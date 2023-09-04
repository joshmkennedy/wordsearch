
export type Position = {
	column: number;
	row: number;
	ch?:string;
}
export type Word = {
	name: string;
	positions: Position[];
	direction: "V" | "H";
}

export function generate(words:string[]): [Position[][], Word[]]{
	const grid = generateGrid(25,25);
	const placedWords = generateWords(words)
	for(let word of placedWords){
		for(let pos of word.positions){
			grid[pos.row][pos.column] = pos;
		}
	}
	return [ grid, placedWords];
}

function generateGrid(rowsLength: number, columnsLength: number) {
	const grid: Position[][] = [];
	for (let y = 0; y < rowsLength; y++) {
		grid[y] = [];
		for (let x = 0; x < columnsLength; x++) {
			grid[y][x] = {ch:String.fromCharCode((Math.floor(Math.random() * 26)) + 97), column:x, row:y}
		}
	}
	return grid;
}

function generateWords(words: string[]): Word[] {
	const placedWords: Word[] = [];
	for (let word of words) {
		placedWords.push(placeWord(word, placedWords, 25))
	}

	return placedWords
}

function placeWord(word: string, placedWords: Word[], gridSize: number):Word {
	// 1. pick a direction
	const direction = Math.random() > .5 ? "H" : "V"
	// 2. pick a start
	const wLength = word.length
	const maxStart = gridSize - wLength
	const startPos:Position = {
		[direction == "V" ? "row" : "column"] : Math.floor(Math.random() * maxStart),
		[direction != "V" ? "row" : "column"] : Math.floor(Math.random() * gridSize)
	}
	let placedWord:Word = {name:word, positions:[],direction};
	let cachedPositions = placedWords.flatMap(pw=>pw.positions)
	// 4. check each position
	for(let i = 0; i < word.length; i++){
		let ch = word[i]	

		let position:Position = {row:0, column:0, ch};
		if(direction == "V"){
			position.row = startPos.row + i 
			position.column = startPos.column
		} else{
			position.column = startPos.column + i 
			position.row = startPos.row
		}
		if(cachedPositions.some(cp=> cp.row == position.row && cp.column == position.column && cp?.ch != position.ch )){
			return placeWord(word, placedWords, gridSize)
		}
		placedWord.positions.push(position)
	}
	return placedWord
}
