import { createSlice } from '@reduxjs/toolkit';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';

export const slice = createSlice({
  name: 'gear',
  initialState: {
    ...newCharacterTemplate.gear
  },
  reducers: {
    changeGearItem: (state, action) => {
      state[action.payload.itemName][action.payload.valueName] = action.payload.value;
    },
  },
});

export const { changeGearItem } = slice.actions;

export const selectGearItem = (itemName) => state => state.gear[itemName];

export default slice.reducer;