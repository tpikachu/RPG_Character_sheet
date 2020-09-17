export interface Character {
  name: string;
  main_attributes: any; // Object keys will be: MAIN_ATTRIBUTES_KEYS
  skills: any; // Object keys will be: SKILLS_KEYS
  weapons: any;
  traits: any;
}
/**
 * Main Attributes Constants
 */
export const STRENGTH = "strength";
export const DEXTERITY = "dexterity";
export const MIND = "mind";
export const PRESENCE = "presence";
export const MAIN_ATTRIBUTES_KEYS = [ STRENGTH, DEXTERITY, MIND, PRESENCE ];

/**
 * Computed Attributes Keys
 */
export const VITALITY = "vitality";
export const EVASION = "evasion";
export const ARMOR = "armor";
export const ALACRITY = "alacrity";
export const TENACITY = "tenacity";
export const COMPUTED_ATTRIBUTES_KEYS = [ VITALITY, EVASION, ARMOR, ALACRITY, TENACITY ];

/**
 * Compute Attributes Calculation Map
 */
export const COMPUTED_ATTRIBUTES_CACLUATION_MAP = {
  vitality: "strength+3",
  evasion: "dexterity+10",
  armor: "dexterity+weapon_armor+10",
  alacrity: "dexterity+mind",
  tenacity: "presence+1"
};

/**
 * Skills Keys
 */
export const FIGHTING = "fighting";
export const THIEVERY = "thievey";
export const STEALTH = "stealth";
export const ARCHERY = "archery";
export const LEARNED = "learned";
export const SURVIVAL = "survival";
export const PERCEPTION = "perception";
export const APOTHECARY = "apothecary";
export const POWER = "power";
export const INTIMIDATION = "intimidation";
export const PERFORMANCE = "performance";
export const MANIPULATION = "manipulation";
export const INSIGHT = "insight";

export const SKILLS_KEYS = [
  FIGHTING,
  THIEVERY,
  STEALTH,
  ARCHERY,
  LEARNED,
  SURVIVAL,
  PERCEPTION,
  APOTHECARY,
  POWER,
  INTIMIDATION,
  PERFORMANCE,
  MANIPULATION,
  INSIGHT
];

/**
 * Relation map between main attribute and skills
 */
export const M_S_RELATION = {
  strength: [ FIGHTING ],
  dexterity: [ FIGHTING, THIEVERY, STEALTH, ARCHERY ],
  mind: [ LEARNED, SURVIVAL, PERCEPTION, APOTHECARY, POWER ],
  presence: [ INTIMIDATION, PERFORMANCE, MANIPULATION, INSIGHT, POWER ]
};

export const RANKS = [ "Untrained", "Novice", "Apprentice", "Adept", "Expert", "Master" ];
