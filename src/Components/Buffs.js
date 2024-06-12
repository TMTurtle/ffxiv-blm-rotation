import {BuffType} from "../Game/Common";
import {updateTimelineView} from "./Timeline";

export let displayedSkills = [
	BuffType.Brotherhood,
	BuffType.DragonSight,
	BuffType.Mug,
    BuffType.TechnicalStep,
];

// seems useful: https://na.finalfantasyxiv.com/lodestone/special/fankit/icon/
export const buffIcons = new Map();
buffIcons.set(BuffType.Brotherhood, require("./Asset/OtherJobs/brotherhood.png"));
buffIcons.set(BuffType.DragonSight, require("./Asset/OtherJobs/dragon_sight.png"));
buffIcons.set(BuffType.Mug, require("./Asset/OtherJobs/mug.png"));
buffIcons.set(BuffType.TechnicalStep, require("./Asset/OtherJobs/technical_step.png"));

export const buffIconImages = new Map();
buffIcons.forEach((path, skillName)=>{
	let imgObj = new Image();
	imgObj.src = path;
	imgObj.onload = function() {
		updateTimelineView();
	}
	buffIconImages.set(skillName, imgObj);
});
