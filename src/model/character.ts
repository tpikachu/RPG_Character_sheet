import {
  Character,
  MAIN_ATTRIBUTES_KEYS,
  COMPUTED_ATTRIBUTES_CACLUATION_MAP,
  COMPUTED_ATTRIBUTES_KEYS,
  M_S_RELATION,
  SKILLS_KEYS,
  RANKS
} from "./constants";

function isNumber(n: any) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class CCharacter {
  name: string;
  mAttrs: Map<string, number>;
  cAttrs: Map<string, number>;
  skills: Map<string, number>;

  constructor(character: Character) {
    const { name, main_attributes: mAttrs, skills, weapons, traits } = character;
    this.name = name;
    this.mAttrs = mAttrs ? new Map(MAIN_ATTRIBUTES_KEYS.map((mKey) => [ mKey, mAttrs[mKey] ])) : this.initMAttrs();
    this.skills = skills ? new Map(SKILLS_KEYS.map((sKey) => [ sKey, skills[sKey] ])) : this.initSkills();
    this.computeCAttrs();
  }

  public initMAttrs() {
    return new Map(MAIN_ATTRIBUTES_KEYS.map((mKey) => [ mKey, 0 ]));
  }

  public initSkills(): Map<string, number> {
    return new Map(SKILLS_KEYS.map((sKey) => [ sKey, this.renewSkillValue(sKey) ]));
  }

  public getMAttrValue(mKey: string) {
    return this.mAttrs.get(mKey);
  }

  public setMAttrValue(mKey: string, value: number) {
    this.mAttrs.set(mKey, value);
    this.computeCAttrs();
    this.renewSkillValuesByMAttr(mKey);
  }

  public getCAttrValue(cKey: string) {
    return this.cAttrs.get(cKey);
  }

  public setCAttrValue(cKey: string, value: number) {
    this.cAttrs.set(cKey, value);
  }

  public getSkillValue(sKey: string) {
    return this.skills.get(sKey);
  }

  public setSkillValue(sKey: string, value: number) {
    this.skills.set(sKey, value);
  }
  public computeCAttrs() {
    this.cAttrs = new Map(COMPUTED_ATTRIBUTES_KEYS.map((cKey) => [ cKey, this.computeCAttrValue(cKey) ]));
  }
  /**
	 * Compute Computed attribute value based on keyname
	 * @param cKey 
	 */
  private computeCAttrValue(cKey: string): number {
    const rule = COMPUTED_ATTRIBUTES_CACLUATION_MAP[cKey];
    let value = 0;

    for (const variable of rule.split("+")) {
      if (MAIN_ATTRIBUTES_KEYS.includes(variable)) {
        value += this.getMAttrValue(variable);
      } else if (isNumber(variable)) {
        value += parseInt(variable);
      } else {
        // TODO: Weapon_armor
      }
    }
    return value;
  }

  /**
	 * Get Skill Rank by skill name
	 * @param sKey : Skill Key
	 */
  public getSkillRank(sKey: string): number {
    let rank = 0;

    Object.keys(M_S_RELATION).forEach((mKey) => {
      const skillsKeys = M_S_RELATION[mKey];
      if (skillsKeys.includes(sKey)) {
        rank = Math.max(rank, this.getMAttrValue(mKey));
      }
    });
    return rank;
  }

  public getRankName(sKey: string): string {
    return RANKS[this.getSkillRank(sKey)];
  }
  /**
	 * Renew Skill Value by skill name
	 * @param sKey : Skill Key
	 */
  private renewSkillValue(sKey: string): number {
    const rank = this.getSkillRank(sKey);
    if (rank === 0) {
      return getRandomInt(1, 20);
    } else {
      let value = 0;
      for (let i = 0; i < 2 * (rank + 1); i++) {
        value += getRandomInt(1, 20);
      }
      return value;
    }
  }

  /**
	 * Renew Skill Values by changed main attribute
	 * @param mKey : Main Attribute Key
	 */
  public renewSkillValuesByMAttr(mKey: string) {
    M_S_RELATION[mKey].forEach((sKey) => {
      this.setSkillValue(sKey, this.renewSkillValue(sKey));
    });
  }
  /**
	 * Renew Skill Value by Skill name
	 * @param sKey : Main Attribute Key
	 */
  public renewSkillValueBySkey(sKey: string) {
    this.setSkillValue(sKey, this.renewSkillValue(sKey));
  }

  public get MainAttributes() {
    const keys = [];
    this.mAttrs.forEach((_, key) => {
      keys.push(key);
    });
    return keys;
  }

  public get ComputedAttributes() {
    const keys = [];
    this.cAttrs.forEach((_, key) => {
      keys.push(key);
    });
    return keys;
  }

  public get Skills() {
    const keys = [];
    this.skills.forEach((_, key) => {
      keys.push(key);
    });
    return keys;
  }

  public toObject() {
    let mAttrObj = {};
    for (let [ mKey, mValue ] of this.mAttrs) {
      mAttrObj[mKey] = mValue;
    }
    let skillsObj = {};
    for (let [ sKey, sValue ] of this.skills) {
      skillsObj[sKey] = sValue;
    }

    return {
      name: this.name,
      main_attributes: mAttrObj,
      skills: skillsObj,
      weapons: {},
      traits: {}
    };
  }
}
