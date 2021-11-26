import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'skills',
  initialState: {
    appraise: { ability: 'int', armorPen:false, requiredTraining:false},
    balance: { ability: 'dex', armorPen:true, requiredTraining:false},
    bluff: { ability: 'cha', armorPen:false, requiredTraining:false},
    climb: { ability: 'str', armorPen:true, requiredTraining:false},
    concentration: { ability: 'con', armorPen:false, requiredTraining:false},
    decipher: { ability: 'int', armorPen:false, requiredTraining:true},
    diplomacy: { ability: 'cha', armorPen:false, requiredTraining:false},
    disable: { ability: 'dex', armorPen:false, requiredTraining:true},
    disguise: { ability: 'cha', armorPen:false, requiredTraining:false},
    escape: { ability: 'dex', armorPen:true, requiredTraining:false},
    forgery: { ability: 'int', armorPen:false, requiredTraining:false},
    gather: { ability: 'cha', armorPen:false, requiredTraining:false},
    handle_animal: { ability: 'cha', armorPen:false, requiredTraining:true},
    heal: { ability: 'wis', armorPen:false, requiredTraining:false},
    hide: { ability: 'dex', armorPen:true, requiredTraining:false},
    intimidate: { ability: 'cha', armorPen:false, requiredTraining:false},
    jump: { ability: 'str', armorPen:true, requiredTraining:false},
    listen: { ability: 'wis', armorPen:false, requiredTraining:false},
    move_silently: { ability: 'dex', armorPen:true, requiredTraining:false},
    open_lock: { ability: 'dex', armorPen:false, requiredTraining:true},
    ride: { ability: 'dex', armorPen:false, requiredTraining:false},
    search: { ability: 'int', armorPen:false, requiredTraining:false},
    sense_motive: { ability: 'wis', armorPen:false, requiredTraining:false},
    sleight_of_hand: { ability: 'dex', armorPen:true, requiredTraining:true},
    spellcraft: { ability:'int', armorPen:false, requiredTraining:true},
    spot: { ability:'wis', armorPen:false, requiredTraining:false},
    survival: { ability: 'wis', armorPen:false, requiredTraining:false},
    swim: { ability: 'str', armorPen:true, requiredTraining:false},
    tumble: { ability: 'dex', armorPen:true, requiredTraining:true},
    use_magic_device: { ability: 'cha', armorPen:false, requiredTraining:false},
    use_rope: { ability: 'dex', armorPen:false, requiredTraining:false},
  },
  reducers: {
    changeSkillItemValue: (state, action) => {
      state[action.payload.itemName][action.payload.valueName] = parseInt(action.payload.value) ? parseInt(action.payload.value) : 0 ;
    },    
  },
});

export const { changeSkillItemValue } = slice.actions;

export const selectSkillItem = (itemName) => state => state.skills[itemName];
export const selectAllSkills = state => state.skills;


export default slice.reducer;