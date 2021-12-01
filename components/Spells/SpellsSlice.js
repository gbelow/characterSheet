import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { selectDescriptionItem } from '../Description/DescriptionSlice';
import {  selectStatsModifier } from '../Stats/StatsSlice';

export const slice = createSlice({
  name: 'spells',
  initialState: {
    SPELLS:{
      ...Array(10).fill({...Array(6).fill('')})
    },
    SUMMARY:{
      ...Array(10).fill({SPELLS_KNOWN:0, BONUS_SPELLS:0})
    }
  },
  reducers: {
    changeSpellValue: (state, action) => {
      const {level, name, value} = action.payload
      state.SPELLS[level][name] = value ;
    },
  },
});

export const { changeSpellValue } = slice.actions;

export const selectSpellLevel = level => state => state.spells.SPELLS[level];
export const selectSpellSummary = stat=> state => {
  const resp = Object.values(state.spells.SUMMARY).map((el, spellLevel) => {
    const mod = useSelector(selectStatsModifier(stat))

    return({
      ...el,
      SPELL_SAVE_DC:spellLevel,
      SPELLS_PER_DAY:0,
    })
  })
  return resp
};



export default slice.reducer;