import { controller } from "../Controller/Controller";
import { BuffType, MarkerColor } from "./Common";

export class BuffInfo {
	readonly name: BuffType;
	readonly duration: number;
	readonly color: MarkerColor;
	readonly damageBonus: number;
	readonly critBonus: number;
	readonly dhBonus: number;

	constructor(name: BuffType, color: MarkerColor, duration: number, damageBonus: number, critBonus: number, dhBonus: number) {
		this.name = name;
		this.duration = duration;
		this.color = color;
		this.damageBonus = damageBonus;
		this.critBonus = critBonus;
		this.dhBonus = dhBonus;
	}

	calculatePotencyModifier() {
		const base = this.#calculatePotencyModifier(controller.gameConfig.criticalHit, controller.gameConfig.directHit);
		const buffed = this.#calculatePotencyModifier(controller.gameConfig.criticalHit, controller.gameConfig.directHit, this.damageBonus, this.critBonus, this.dhBonus);

		return buffed / base;
	}

	#calculatePotencyModifier(crit: number, dh: number, damageBonus?: number, critBonus?: number, dhBonus?: number) {
		let potencyModifier = 1;
		if (damageBonus) potencyModifier *= damageBonus;
				
		let critRate = this.#criticalHitRate(crit)
		if (critBonus) critRate += critBonus;
		let dhRate = this.#directHitRate(dh);
		if (dhBonus) dhRate += dhBonus;

		const critDHRate = critRate * dhRate;
		const normalRate = 1 - critRate - dhRate + critDHRate;
		
		const critDamage = potencyModifier * (1000 * this.#criticalHitStrength(crit)) / 1000;
		const dhDamage = potencyModifier * 1250 / 1000;
		const critDHDamage = critDamage * 1250 / 1000;

		potencyModifier = potencyModifier * normalRate + critDamage * (critRate-critDHRate) + dhDamage * (dhRate-critDHRate) + critDHDamage * critDHRate; 

		return potencyModifier;
	}

	#criticalHitRate(crit: number) {
		return (Math.floor(200 * (crit-420) / 2780) + 50) * 0.001;
	}

	#criticalHitStrength(crit: number) {
		return (Math.floor(200 * (crit-420) / 2780) + 1400) * 0.001;
	}

	#directHitRate(dh: number) {
		return Math.floor(550 * (dh - 420) / 2780) * 0.001;
	}
}

const buffInfos = [
	new BuffInfo(BuffType.Brotherhood, MarkerColor.Orange, 20, 1.05, 0, 0),
	new BuffInfo(BuffType.DragonSight, MarkerColor.Red, 20, 1.05, 0, 0),
	new BuffInfo(BuffType.Mug, MarkerColor.Yellow, 20, 1.05, 0, 0),
	new BuffInfo(BuffType.TechnicalStep, MarkerColor.Blue, 20, 1.05, 0, 0),
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
