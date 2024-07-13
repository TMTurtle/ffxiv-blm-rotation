import {BuffType} from "../Game/Common";
import {updateTimelineView} from "./Timeline";

export let displayedSkills = [
	BuffType.Brotherhood,
	BuffType.DragonSight,
	BuffType.Mug,
	BuffType.RadiantFinale1,
	BuffType.RadiantFinale2,
	BuffType.RadiantFinale3,
    BuffType.TechnicalStep,
];

// seems useful: https://na.finalfantasyxiv.com/lodestone/special/fankit/icon/
export const buffIcons = new Map();
buffIcons.set(BuffType.ArcaneCircle, require("./Asset/OtherJobs/arcane_circle.png"));
buffIcons.set(BuffType.ArmysPaeon, require("./Asset/OtherJobs/army's_paeon.png"));
buffIcons.set(BuffType.BattleLitany, require("./Asset/OtherJobs/battle_litany.png"));
buffIcons.set(BuffType.BattleVoice, require("./Asset/OtherJobs/battle_voice.png"));
buffIcons.set(BuffType.Brotherhood, require("./Asset/OtherJobs/brotherhood.png"));
buffIcons.set(BuffType.Card_TheBalance, require("./Asset/OtherJobs/the_balance.png"));
buffIcons.set(BuffType.Card_TheSpear, require("./Asset/OtherJobs/the_spear.png"));
buffIcons.set(BuffType.ChainStratagem, require("./Asset/OtherJobs/chain_stratagem.png"));
buffIcons.set(BuffType.Devilment, require("./Asset/OtherJobs/devilment.png"));
buffIcons.set(BuffType.Embolden, require("./Asset/OtherJobs/embolden.png"));
buffIcons.set(BuffType.MagesBallad, require("./Asset/OtherJobs/mage's_ballad.png"));
buffIcons.set(BuffType.Mug, require("./Asset/OtherJobs/mug.png"));
buffIcons.set(BuffType.RadiantFinale1, require("./Asset/OtherJobs/radiant_finale.png"));
buffIcons.set(BuffType.RadiantFinale2, require("./Asset/OtherJobs/radiant_finale.png"));
buffIcons.set(BuffType.RadiantFinale3, require("./Asset/OtherJobs/radiant_finale.png"));
buffIcons.set(BuffType.StandardStep, require("./Asset/OtherJobs/standard_step.png"));
buffIcons.set(BuffType.StarryMuse, require("./Asset/OtherJobs/temp_starry_muse.png"));		// Asset not available in Fan Kit
buffIcons.set(BuffType.TechnicalStep, require("./Asset/OtherJobs/technical_step.png"));
buffIcons.set(BuffType.WanderersMinuet, require("./Asset/OtherJobs/the_wanderer's_minuet.png"));

export const buffIconImages = new Map();
buffIcons.forEach((path, skillName)=>{
	let imgObj = new Image();
	imgObj.src = path;
	imgObj.onload = function() {
		updateTimelineView();
	}
	buffIconImages.set(skillName, imgObj);
});
