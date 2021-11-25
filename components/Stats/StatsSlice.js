import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'stats',
  initialState: {
    STR: { legend:'STRENGTH', score:12, buffs:0, debuffs: 0 },
    DEX: { legend:'DEXTERITY', score:10, buffs:0, debuffs: 0 },
    CON: { legend:'CONSTITUTION', score:12, buffs:0, debuffs: 0 },
    INT: { legend:'INTELLIGENCE', score:16, buffs:0, debuffs: 0 },
    WIS: { legend:'WISDOM', score:16, buffs:0, debuffs: 0 },
    CHA: { legend:'CHARISMA', score:10, buffs:0, debuffs: 0 },
  },
  reducers: {
    changeStatsItemValue: (state, action) => {
      state[action.payload.itemName][action.payload.valueName] = parseInt(action.payload.value) ? parseInt(action.payload.value) : 0 ;
    },    
  },
});

export const { changeStatsItemValue } = slice.actions;

export const selectStatsItemValue = (itemName, valueName) => state => state.stats[itemName][valueName];
export const selectStatsItem = (itemName) => state => state.stats[itemName];

export default slice.reducer;