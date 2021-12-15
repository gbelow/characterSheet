import { createSlice } from '@reduxjs/toolkit';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';

export const slice = createSlice({
  name: 'gear',
  initialState: {
    ...newCharacterTemplate.gear
  },
  reducers: {
    loadGear:(state, action) => {
      const s = Object.keys(state)
      s.forEach(el => {
        state[el] = action.payload[el]
      });
    },
    changeGearItem: (state, action) => {
      state[action.payload.itemName][action.payload.valueName] = action.payload.value;
    },
  },
});

export const { changeGearItem, loadGear } = slice.actions;

export const selectGearItem = (itemName) => state => state.gear[itemName];
export const selectGearItemValue = (itemName, itemValue) => state => state.gear[itemName][itemValue]

export default slice.reducer;