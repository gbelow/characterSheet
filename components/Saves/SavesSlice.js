import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { selectStatsModifier } from '../Stats/StatsSlice';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';

export const slice = createSlice({
  name: 'saves',
  initialState: {
    ...newCharacterTemplate.saves
  },
  reducers: {
    loadSaves:(state, action) => {
      const s = Object.keys(state)
      s.forEach(el => {
        state[el] = action.payload[el]
      });
    },
    changeSaveItem: (state, action) => {
      state[action.payload.itemName] = parseInt(action.payload.value) ? parseInt(action.payload.value) : 0 ;
    },
  },
});

export const { changeSaveItem, loadSaves } = slice.actions;

export const convert = (s) => {
  switch(s){
    case 'FORTITUDE': return 'STR'
    case 'REFLEX': return 'DEX'
    case 'WILL': return 'WIS'
  }
}

export const selectSaveItem = (itemName) => state => state.saves[itemName];
export const selectSaveTotal = (itemName) => state => {
  const mod = useSelector(selectStatsModifier(convert(itemName)))
  return state.saves['BASE_'+itemName] + mod + state.saves['MAGIC_'+itemName] + state.saves['MISC_'+itemName] + state.saves['TEMP_'+itemName]
}

export default slice.reducer;