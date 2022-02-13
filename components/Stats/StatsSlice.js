import { createSlice } from '@reduxjs/toolkit';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';

export const slice = createSlice({
  name: 'stats',
  initialState: {
    ...newCharacterTemplate.stats
  },
  reducers: {
    loadStats:(state, action) => {
      return action.payload
    },
    changeStatsItemValue: (state, action) => {
      state[action.payload.itemName][action.payload.valueName] = parseInt(action.payload.value) ? parseInt(action.payload.value) : 0 ;
    },    
  },
});

export const { changeStatsItemValue, loadStats } = slice.actions;

export const selectStatsItemValue = (itemName, valueName) => state => state.stats[itemName][valueName];
export const selectStatsItem = (itemName) => state => state.stats[itemName];

export const calculateStatModifier = (stat) => {
  return Math.floor((stat.score + stat.buffs - stat.debuffs - 10)/2)
}

export const selectStatsModifier = itemName => state => {
  const s = state.stats[itemName]
  return calculateStatModifier(s)
}

export const selectStatsItemKeys = (itemName) => state => Object.keys(state[itemName])

export default slice.reducer;