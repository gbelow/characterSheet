import { createSlice } from '@reduxjs/toolkit';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';

export const slice = createSlice({
  name: 'stats',
  initialState: {
    ...newCharacterTemplate.stats
  },
  reducers: {
    loadStats:(state, action) => {
      const s = Object.keys(state)
      s.forEach(el => {
        state[el] = action.payload[el]
      });
    },
    changeStatsItemValue: (state, action) => {
      state[action.payload.itemName][action.payload.valueName] = parseInt(action.payload.value) ? parseInt(action.payload.value) : 0 ;
    },    
  },
});

export const { changeStatsItemValue, loadStats } = slice.actions;

export const selectStatsItemValue = (itemName, valueName) => state => state.stats[itemName][valueName];
export const selectStatsItem = (itemName) => state => state.stats[itemName];
export const selectStatsModifier = itemName => state => {
  const s = state.stats[itemName]
  return Math.floor((s.score + s.buffs - s.debuffs - 10)/2)
}

export default slice.reducer;