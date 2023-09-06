import type { Position } from "./generate";

export function positionListsEqual(a:Position[], b:Position[]):boolean{
	console.log({a,b})
	for (let i=0; i<a.length; i++){
		if(a[i].column == b[i].column && a[i].row == b[i].row && a[i]?.ch == b[i]?.ch){
			continue
		}
		return false
	}
	return true
}
