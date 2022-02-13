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
      return action.payload
    },
    changeSaveItem: (state, action) => {
      const {itemName, valueName, value} = action.payload
      state[itemName][valueName] = parseInt(value) ? parseInt(value) : 0 ;
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

export const selectSaveItemValue = (itemName, valueName) => state => state.saves[itemName][valueName];
export const selectSaveTotal = (itemName) => state => {
  const mod = useSelector(selectStatsModifier(convert(itemName)))
  return state.saves[itemName]['base'] + mod + state.saves[itemName]['magic'] + state.saves[itemName]['misc'] + state.saves[itemName]['temp']
}

export default slice.reducer;