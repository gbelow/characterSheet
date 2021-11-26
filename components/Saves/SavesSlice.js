import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { selectStatsModifier } from '../Stats/StatsSlice';

export const slice = createSlice({
  name: 'saves',
  initialState: {
    BASE_FORTITUDE:0,
    BASE_REFLEX:0,
    BASE_WILL:0,
    MAGIC_FORTITUDE:0,
    MAGIC_REFLEX:0,
    MAGIC_WILL:0,
    MISC_FORTITUDE:0,
    MISC_REFLEX:0,
    MISC_WILL:0,
    TEMP_FORTITUDE:0,
    TEMP_REFLEX:0,
    TEMP_WILL:0,
  },
  reducers: {
    changeSaveItem: (state, action) => {
      state[action.payload.itemName] = parseInt(action.payload.value) ? parseInt(action.payload.value) : 0 ;
    },
  },
});

export const { changeSaveItem } = slice.actions;

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