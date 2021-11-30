import { createSlice } from '@reduxjs/toolkit';
import { selectStatsModifier } from '../Stats/StatsSlice';
import { useSelector } from 'react-redux';

export const slice = createSlice({
  name: 'skills',
  initialState: {
    appraise: { ability: 'INT', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    balance: { ability: 'DEX', armorPen:true, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    bluff: { ability: 'CHA', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    climb: { ability: 'STR', armorPen:true, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    concentration: { ability: 'CON', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    decipher: { ability: 'INT', armorPen:false, requiredTraining:true, ranks:0, miscMod:0, isClassSkill:false},
    diplomacy: { ability: 'CHA', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    disable: { ability: 'DEX', armorPen:false, requiredTraining:true, ranks:0, miscMod:0, isClassSkill:false},
    disguise: { ability: 'CHA', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    escape: { ability: 'DEX', armorPen:true, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    forgery: { ability: 'INT', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    gather: { ability: 'CHA', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    handle_animal: { ability: 'CHA', armorPen:false, requiredTraining:true, ranks:0, miscMod:0, isClassSkill:false},
    heal: { ability: 'WIS', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    hide: { ability: 'DEX', armorPen:true, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    intimidate: { ability: 'CHA', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    jump: { ability: 'STR', armorPen:true, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    listen: { ability: 'WIS', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    move_silently: { ability: 'DEX', armorPen:true, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    open_lock: { ability: 'DEX', armorPen:false, requiredTraining:true, ranks:0, miscMod:0, isClassSkill:false},
    ride: { ability: 'DEX', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    search: { ability: 'INT', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    sense_motive: { ability: 'WIS', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    sleight_of_hand: { ability: 'DEX', armorPen:true, requiredTraining:true, ranks:0, miscMod:0, isClassSkill:false},
    spellcraft: { ability:'INT', armorPen:false, requiredTraining:true, ranks:0, miscMod:0, isClassSkill:false},
    spot: { ability:'WIS', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    survival: { ability: 'WIS', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    swim: { ability: 'STR', armorPen:true, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    tumble: { ability: 'DEX', armorPen:true, requiredTraining:true, ranks:0, miscMod:0, isClassSkill:false},
    use_magic_device: { ability: 'CHA', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
    use_rope: { ability: 'DEX', armorPen:false, requiredTraining:false, ranks:0, miscMod:0, isClassSkill:false},
  },
  reducers: {
    changeSkillItemValue: (state, action) => {
      state[action.payload.itemName][action.payload.valueName] = parseInt(action.payload.value) ? parseInt(action.payload.value) : 0 ;
    },    
    createSkillItem: (state, action) => {
      state[action.payload.itemName] = {...action.payload.value, ranks:0, miscMod:0, isClassSkill:false}
    },    
  },
});

export const { changeSkillItemValue, createSkillItem } = slice.actions;

export const selectSkillItem = (itemName) => state => state.skills[itemName];
export const selectAllSkills = state => state.skills;
export const selectSkillTotal = skillName => state => state.skills[skillName].ranks +  state.skills[skillName].miscMod + useSelector(selectStatsModifier(state.skills[skillName].ability))


export default slice.reducer;