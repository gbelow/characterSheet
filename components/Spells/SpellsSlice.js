import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import {  selectStatsModifier } from '../Stats/StatsSlice';

export const slice = createSlice({
  name: 'spells',
  initialState: {
    domain:'',
    SPELLS:{
      ...Array(10).fill({...Array(9).fill('')})
    },
    SUMMARY:{
      ...Array(10).fill({SPELLS_KNOWN:0, SPELLS_PER_DAY:0})
    }
  },
  reducers: {
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

export const { changeSpellValue, changeSpellSummary, changeSpellItem } = slice.actions;

export const selectSpellLevel = level => state => state.spells.SPELLS[level];
export const selectSpellItem = itemName => state => state.spells[itemName]


spellAttribute = {Cleric:'WIS', Wizard:'INT', Bard:'CHA', Sorcerer:'CHA', Paladin:'WIS', Druid:'WIS', Ranger:'WIS', }

export const selectSpellSave = state => {
  const charClass = state.description.class
  const mod = useSelector(selectStatsModifier(spellAttribute[charClass] ))
  return 10+parseInt(mod)
}

export const selectArcaneFailure = state => {
  return parseInt(state.gear.ARMOR.SPELL_FAILURE) ? parseInt(state.gear.ARMOR.SPELL_FAILURE) : 0
}

export const selectSpellSummary = state => {
  const resp = Object.values(state.spells.SUMMARY).map((el, spellLevel) => {
    const charClass = state.description.class
    const level = state.description.level
    const mod = useSelector(selectStatsModifier(spellAttribute[charClass] ))

    return({
      ...el,
      BONUS_SPELLS: charClass == 'Cleric' ? 1 : 0,
      SPELL_SAVE_DC:spellLevel+mod,
    })
  })
  return resp
};



export default slice.reducer;