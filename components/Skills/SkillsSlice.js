import { createSlice } from '@reduxjs/toolkit';
import { selectStatsModifier } from '../Stats/StatsSlice';
import { useSelector } from 'react-redux';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';

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
    createSkillItem: (state, action) => {
      state[action.payload.itemName] = {...action.payload.value, ranks:0, miscMod:0}
    },    
  },
});

export const { changeSkillItemValue, createSkillItem, loadSkills } = slice.actions;

export const selectSkillItem = (itemName) => state => state.skills[itemName];
export const selectAllSkills = state => Object.keys(state.skills);
export const selectSkillTotal = skillName => state => {
  return(
    state.skills[skillName].ranks +  
    state.skills[skillName].miscMod + 
    useSelector(selectStatsModifier(state.skills[skillName].ability)) 
    - (state.skills[skillName].armorPen ? ( state.gear.ARMOR.CHECK_PENALTY + state.gear.SHIELD.CHECK_PENALTY) : 0)
  )
}
export const selectMaxSkill = state => {
  const max = parseInt(state.description.LEVEL) + 3
  return max+' / '+Math.floor(max/2)
}

export default slice.reducer;