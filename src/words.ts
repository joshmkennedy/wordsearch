import {noodles} from "./bdayweek/noodles";
import {dinner, grahms, relaxation, read, choc} from "./bdayweek/week";

const fruitList = [
	"acai",
	"apple",
	"apricot",
	"avocado",
	"banana",
	"blackberry",
	"blueberry",
	"boysenberry",
	"chayote",
	"cherry",
	"clementine",
	"coconut",
	"cranberry",
	"currant",
	"dragonfruit",
	"durian",
	"elderberry",
	"feijoa",
	"fig",
	"grape",
	"grapefruit",
	"guanabana",
	"guava",
	"honeydew",
	"jabuticaba",
	"kiwi",
	"kumquat",
	"lemon",
	"lime",
	"loganberry",
  "longan",
	"lychee",
	"mango",
	"mangosteen",
	"mulberry",
	"nectarine",
	"orange",
	"papaya",
	"passionflower",
	"passionfruit",
	"peach",
	"pear",
	"persimmon",
	"pineapple",
	"plantain",
	"plum",
	"pomegranate",
	"quince",
	"rambutan",
	"raspberry",
	"salak",
	"saskatoon",
	"soursop",
	"starfruit",
	"strawberry",
	"sugarapple",
	"tamarillo",
	"tamarind",
	"tangerine",
	"watermelon",
	"yuzu",
];
let HCS = [
	"school",
	"hillcity",
	"montessori",
	"math",
	"science",
	"language",
	"classroom",
	"teacher",
	"history",
	"playground",
	"lunchbox",
	"backpack",
]


let wordLists:Record<string, string[]> = {
	fruitlist:fruitList,
	hcs:HCS,
	noodles,
	dinner,
	grahms,
	relaxation,
	read,
	choc,
}


export function getWords(wordList:string):string[]{
	let list = fruitList
	if (wordList in wordLists){
		list = wordLists[wordList]
	}
	let ws = [...list]
	ws.sort((a,b)=>Math.random() > .5 ? 1 : -1)
	ws.length = 12 
	ws = ws.filter(Boolean)
	return ws
}
