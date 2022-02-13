import { createSlice } from '@reduxjs/toolkit';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';

export const slice = createSlice({
  name: 'feats',
  initialState: {
    ...newCharacterTemplate.feats
  },
  reducers: {
    loadFeats:(state, action) => {
      return action.payload
    },
    changeFeatValue: (state, action) => {
      const {category, name, value} = action.payload
      state[category][name] = value ;
    },
  },
});

export const { changeFeatValue, loadFeats } = slice.actions;

export const selectFeatCategory = (category) => state => Object.keys(state.feats[category]);
export const selectFeatCategoryItem = (category, itemName) => state => state.feats[category][itemName];

export default slice.reducer;