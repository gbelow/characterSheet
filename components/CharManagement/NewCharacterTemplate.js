const weapon = {NAME:'', ATK_BONUS:0, BONUS_ATTR:'', DAMAGE:'', 
  DAMAGE_TYPE:'', BONUS_DAMAGE:'', BONUS_DAMAGE_TYPE:'', DAMAGE_BONUS:0, 
  CRITICAL:'', WEIGHT:0, RANGE:0, TYPE:'', NOTES:''
}

const newCharacterTemplate = {
  description:{
    CHAR_NAME:'',
    PLAYER_NAME:'',
    CLASS:'Cleric',
    LEVEL:'1',
    RACE:'',
    ALIGNMENT:'',
    DEITY:'',
    SIZE:'Medium',
    AGE:'',
    GENDER:'',
    HEIGHT:'',
    WEIGHT:'',
    EYES:'',
    HAIR:'',
    SKIN:'',
  },
  stats:{
    STR: { legend:'STRENGTH', score:12, buffs:0, debuffs: 0 },
    DEX: { legend:'DEXTERITY', score:10, buffs:0, debuffs: 0 },
    CON: { legend:'CONSTITUTION', score:12, buffs:0, debuffs: 0 },
    INT: { legend:'INTELLIGENCE', score:16, buffs:0, debuffs: 0 },
    WIS: { legend:'WISDOM', score:16, buffs:0, debuffs: 0 },
    CHA: { legend:'CHARISMA', score:10, buffs:0, debuffs: 0 },
  },
  skills:{
    APPRAISE: { ability: 'INT', armorPen:false, requiredTraining:true, ranks:0, miscMod:0, isClassSkill:false},
    BALANCE: { ability: 'DEX', armorPen:true, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    BLUFF: { ability: 'CHA', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    CLIMB: { ability: 'STR', armorPen:true, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    CONCENTRATION: { ability: 'CON', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    DECIPHER_SCRIPT: { ability: 'INT', armorPen:false, requiredTraining:true, ranks:0, miscMod:0, isClassSkill:false},
    DIPLOMACY: { ability: 'CHA', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    DISABLE_DEVICE: { ability: 'DEX', armorPen:false, requiredTraining:true, ranks:0, miscMod:0, isClassSkill:false},
    DISGUISE: { ability: 'CHA', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    ESCAPE: { ability: 'DEX', armorPen:true, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    FORGERY: { ability: 'INT', armorPen:false, requiredTraining:true, ranks:0, miscMod:0, isClassSkill:false},
    GATHER_INFORMATION: { ability: 'CHA', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    HANDLE_ANIMAL: { ability: 'CHA', armorPen:false, requiredTraining:true, ranks:0, miscMod:0, isClassSkill:false},
    HEAL: { ability: 'WIS', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    HIDE: { ability: 'DEX', armorPen:true, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    INTIMIDATE: { ability: 'CHA', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    JUMP: { ability: 'STR', armorPen:true, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    LISTEN: { ability: 'WIS', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    MOVE_SILENTLY: { ability: 'DEX', armorPen:true, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    OPEN_LOCK: { ability: 'DEX', armorPen:false, requiredTraining:true, ranks:0, miscMod:0, isClassSkill:false},
    RIDE: { ability: 'DEX', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    SEARCH: { ability: 'INT', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    SENSE_MOTIVE: { ability: 'WIS', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    SLEIGHT_OF_HAND: { ability: 'DEX', armorPen:true, requiredTraining:true, ranks:0, miscMod:0, isClassSkill:false},
    SPELLCRAFT: { ability:'INT', armorPen:false, requiredTraining:true, ranks:0, miscMod:0, isClassSkill:false},
    SPOT: { ability:'WIS', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    SURVIVAL: { ability: 'WIS', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    SWIM: { ability: 'STR', armorPen:true, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    TUMBLE: { ability: 'DEX', armorPen:true, requiredTraining:true, ranks:0, miscMod:0, isClassSkill:false},
    USE_MAGIC_DEVICE: { ability: 'CHA', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    USE_ROPE: { ability: 'DEX', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
  },
  spells:{
    DOMAIN:'',
    SPELLS:{
      ...Array(10).fill({...Array(9).fill('')})
    },
    SUMMARY:{
      ...Array(10).fill({SPELLS_KNOWN:0, SPELLS_PER_DAY:0})
    }
  },
  resources:{
    HP:10,
    CURRENT_HP:10,
    TEMPORARY_HP:0,
    NON_LETHAL_DMG:0,
    WOUNDS:'',
    AC:10,
    SPEED:6,
    DAMAGE_REDUCTION:0,
    SPELL_RESISTANCE:0,
    POISON_RESISTANCE:0,
    INI_MISC_MOD:0,
    BASE_ATTACK_BONUS:0,
    GRAPPLE_MISC_MOD:0,
    NATURAL_ARMOR:0,
    DEFLECT_MOD:0,
    ARMOR_MISC_MOD:0,
  },
  feats:{
    FEATS:{...Array(16).fill('')},
    SPECIAL_ABILITIES:{...Array(16).fill('')},
    LANGUAGES:{...Array(8).fill('')},
  },
  saves:{
    FORTITUDE:{base:0, magic:0, misc: 0, temp:0},
    REFLEX:{base:0, magic:0, misc: 0, temp:0},
    WILL:{base:0, magic:0, misc: 0, temp:0},
  },
  items:{
    ...Array(32).fill({name:'', value:0, weight:0,}),
    CP:{amount:0, weight:0},
    SP:{amount:0, weight:0},
    GP:{amount:0, weight:0},
    PP:{amount:0, weight:0},
  },
  gear:{
    ARMOR:{NAME:'', TYPE:'', AC_BONUS:5, MAX_DEX:2, CHECK_PENALTY:5, SPELL_FAILURE:10, SPEED:6, WEIGHT:10, SPECIAL_PROPS:''},
    SHIELD:{NAME:'', AC_BONUS:0, CHECK_PENALTY:5, WEIGHT:10, SPECIAL_PROPS:'', SPELL_FAILURE:0},
    PROT_ITEM1:{NAME:'', AC_BONUS:0, WEIGHT:10, SPECIAL_PROPS:''},
    PROT_ITEM2:{NAME:'', AC_BONUS:0, WEIGHT:10, SPECIAL_PROPS:''},
    WEAPON1:weapon,
    WEAPON2:weapon,
    WEAPON3:weapon,
    WEAPON4:weapon,
  },
}




export default newCharacterTemplate