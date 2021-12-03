import { createSlice } from '@reduxjs/toolkit';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';

export const slice = createSlice({
  name: 'description',
  initialState: {
    ...newCharacterTemplate.description
  },
  reducers: {
    changeDescriptionItem: (state, action) => {
      state[action.payload.itemName] = action.payload.value;
    },
    
  },
});

export const { changeDescriptionItem } = slice.actions;

export const selectDescriptionItem = itemName => state => state.description[itemName];

export default slice.reducer;