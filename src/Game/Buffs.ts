import { ContentNode } from "../Components/Common";
import { localize } from "../Components/Localization";
import { BuffType, MarkerColor } from "./Common";

export class BuffInfo {
	readonly name: BuffType;
	readonly shortName: ContentNode;
	readonly duration: number;
	readonly potencyFactor: number;
	readonly color: MarkerColor;

	constructor(name: BuffType, shortName: ContentNode, duration: number, potencyFactor: number, color: MarkerColor) {
		this.name = name;
		this.shortName = shortName;
		this.duration = duration;
		this.potencyFactor = potencyFactor;
		this.color = color;
	}
}

const buffInfos = [
	new BuffInfo(BuffType.TechnicalStep, localize({en: "tech", zh: "todo"}), 15, 1.05, MarkerColor.Red),
	new BuffInfo(BuffType.Mug, localize({en: "mug", zh: "todo"}), 20, 1.05, MarkerColor.Yellow)
];

const buffInfosMap: Map<BuffType, BuffInfo> = new Map();
buffInfos.forEach(info=>{
	buffInfosMap.set(info.name, info);
});

export class Buff {
	readonly name: BuffType;
	info: BuffInfo;

	constructor(name: BuffType) {
		this.name = name;
		let info = buffInfosMap.get(name);
		if (!info) {
			info = buffInfos[0];
			console.error("Buff info not found!");
		}
		this.info = info;
	}
}

export var buffConstants = {
	buffInfos
}
