import { createSlice } from '@reduxjs/toolkit';
import { calculateStatModifier, selectStatsModifier } from '../Stats/StatsSlice';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';
import { getSizeMod } from '../Resources/ResourcesSlice';

export const slice = createSlice({
  name: 'skills',
  initialState: {
    ...newCharacterTemplate.skills
  },
  reducers: {
    loadSkills:(state, action) => {
      const s = Object.keys(state)
      s.forEach(el => {
        state[el] = action.payload[el]
      });
    },
    changeSkillItemValue: (state, action) => {
      const {itemName, valueName, value} = action.payload
      state[itemName][valueName] = parseInt(value) ? parseInt(value) : 0 ;
    },    
    changeSkillItemBool: (state, action) => {
      const {itemName, valueName} = action.payload
      state[itemName][valueName] = !state[itemName][valueName];
    },    
    createSkillItem: (state, action) => {
      state[action.payload.itemName] = {...action.payload.value, ranks:0, miscMod:0}
    },   
    removeSkillItem: (state, action) => {
      const newObj = {}
      Object.keys(state).forEach((el) => {
        el != action.payload.itemName ? newObj[el] = state[el] : null
      })      
      return newObj      
    } 
  },
});

export const { changeSkillItemValue, createSkillItem, loadSkills, changeSkillItemBool, removeSkillItem } = slice.actions;

export const selectSkillItem = (itemName) => state => state.skills[itemName];
export const selectSkillItemValue = (itemName, itemValue) => state=> state.skills[itemName][itemValue]
export const selectAllSkillKeys = state => Object.keys(state.skills);

export const selectSkillTotal = skillName => state => {
  const stat = state.stats[state.skills[skillName].ability]
  const additionals = {
    'swim': skillName == 'SWIM' ?  -parseInt(state.gear.ARMOR.CHECK_PENALTY) - parseInt(state.gear.SHIELD.CHECK_PENALTY) : 0,
    'hide': skillName == 'HIDE' ?  getSizeMod( state.description.SIZE ,'hide') : 0
  }

  return(
    state.skills[skillName].ranks +  
    state.skills[skillName].miscMod + 
    calculateStatModifier(stat) 
    - (state.skills[skillName].armorPen ? ( state.gear.ARMOR.CHECK_PENALTY + state.gear.SHIELD.CHECK_PENALTY) : 0) + 
    Object.values(additionals).reduce((acc,el) => el+acc, 0)
  )
}

export const selectMaxSkill = state => {
  const max = parseInt(state.description.LEVEL) + 3
  return max+' / '+Math.floor(max/2)
}

export default slice.reducer;