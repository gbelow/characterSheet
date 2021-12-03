import { createSlice } from '@reduxjs/toolkit';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';

export const slice = createSlice({
  name: 'feats',
  initialState: {
    ...newCharacterTemplate.feats
  },
  reducers: {
    changeFeatValue: (state, action) => {
      const {category, name, value} = action.payload
      state[category][name] = value ;
    },
  },
});

export const { changeFeatValue } = slice.actions;

export const selectFeatCategory = (category) => state => state.feats[category];

export default slice.reducer;