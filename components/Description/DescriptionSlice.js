import { createSlice } from '@reduxjs/toolkit';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';
import SizeTable from '../Tables/SizeTable';

export const slice = createSlice({
  name: 'description',
  initialState: {
    ...newCharacterTemplate.description
  },
  reducers: {
    loadDescription:(state, action) => {
      const s = Object.keys(state)
      s.forEach(el => {
        state[el] = action.payload[el]
      });
    },
    changeDescriptionItem: (state, action) => {
      state[action.payload.itemName] = action.payload.value;
    },
    
  },
});

export const { changeDescriptionItem, loadDescription } = slice.actions;

export const selectDescriptionItem = itemName => state => state.description[itemName];
export const selectChar = state => state
export const SizeKeys = Object.keys(SizeTable)

export default slice.reducer;