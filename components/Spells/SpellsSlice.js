import { createSlice } from '@reduxjs/toolkit';
import {  calculateStatModifier, selectStatsModifier } from '../Stats/StatsSlice';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';

export const slice = createSlice({
  name: 'spells',
  initialState: {
    ...newCharacterTemplate.spells
  },
  reducers: {
    loadSpells:(state, action) => {
      return action.payload
    },
    changeSpellItem:(state, action) => {
      const {item, value} = action.payload
      state[item] = value
    },
    changeSpellValue: (state, action) => {
      const {level, name, value} = action.payload
      state.SPELLS[level][name] = value ;
    },
    changeSpellSummary: (state, action) => {
      const {level, name, value} = action.payload
      state.SUMMARY[level][name] = parseInt(value) ? parseInt(value) : 0
    },
  },
});

export const { changeSpellValue, changeSpellSummary, changeSpellItem, loadSpells } = slice.actions;

export const selectAllLevelIDs = state => Object.keys(state.spells.SPELLS)
export const selectSpellLevel = level => state => Object.keys(state.spells.SPELLS[level]);
export const selectSpellLevelItem = (level, id) => state => state.spells.SPELLS[level][id];
export const selectSpellItem = itemName => state => state.spells[itemName]


const spellAttribute = {Cleric:'WIS', Wizard:'INT', Bard:'CHA', Sorcerer:'CHA', Paladin:'WIS', Druid:'WIS', Ranger:'WIS', }


export const selectSpellSave = state => {
  const attr = spellAttribute[state.description.CLASS]
  if(attr){
    const stat = state.stats[attr]
    const mod = calculateStatModifier(stat)
    return 10+parseInt(mod)
  }
  return 10
}



export const selectArcaneFailure = state => {
  return (
    (parseInt(state.gear.ARMOR.SPELL_FAILURE) ? parseInt(state.gear.ARMOR.SPELL_FAILURE) : 0) +
    (parseInt(state.gear.SHIELD.SPELL_FAILURE) ? parseInt(state.gear.SHIELD.SPELL_FAILURE) : 0 )
  )
}

export const selectSpellSummaryKeys = state => Object.keys(state.spells.SUMMARY)
export const selectBonusSpells = state => state.description.CLASS == 'Cleric' ? 1 : 0

export const selectSpellSaveDC = level => state => {
  const attr = spellAttribute[state.description.CLASS]
  if(attr){
    const stat = state.stats[attr]
    const mod = calculateStatModifier(stat)
    return 10+parseInt(mod)+parseInt(level)
  }
  return 10
}

export const selectSpellSummaryLevelItem = (level, item) => state => state.spells.SUMMARY[level][item]

export default slice.reducer;