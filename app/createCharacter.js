export default function createCharacter(){
  return ({
    description:{
      charName:'Theoric',
      playerName:'',
      class:'',
      level:'1',
      race:'',
      alignment:'',
      deity:'',
      size:'',
      age:'',
      gender:'',
      height:'',
      weight:'',
      eyes:'',
      hair:'',
      skin:'',
    },
    
    stats:{
      strength:10,
      dexterity:10,
      constitution:10,
      intelligence:10,
      wisdom:10,
      charisma:10,
      size:'m',
    },
  
    saves:{
      fortitude:2,
      reflex:0,
      will:3,
    },
  
    resources:{
      hp:10,
      speed:6,
      armorClass:10,
      spellResist:0,
      poisonResist:0,
      baseAtkBonus:0,
      damageReduction:0,
      initiative:0,
    },
  
    skills:{
      'appraise':0, 
      'balance':0, 
      'bluff':0, 
      'climb':0, 
      'concentration':0, 
      'decipher script':0, 
      'diplomacy':0, 
      'disable device':0, 
      'disguise':0, 
      'escape artist':0, 
      'forgery':0, 
      'gather information':0, 
      'handle animal':0, 
      'heal':0, 
      'hide':0, 
      'intimidate':0, 
      'jump':0, 
      'listen':0, 
      'move silently':0, 
      'open lock':0, 
      'ride':0, 
      'search':0, 
      'sense motive':0, 
      'sleight of hand':0, 
      'spellcraft':0, 
      'spot':0, 
      'survival':0, 
      'swim':0, 
      'tumble':0, 
      'use magic device':0, 
      'use rope':0, 
    },
  
    feats:Array(16),
  
    gear:{
      w1:null,
      w2:null,
      w3:null,
      w4:null,
      armor:null,
      shield:null,
    },
  
    items:Array(32),
  
    spells: Array(16).fill(Array(6))
  
  })
}