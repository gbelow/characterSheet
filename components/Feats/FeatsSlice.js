import { createSlice } from '@reduxjs/toolkit';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';

export const slice = createSlice({
  name: 'feats',
  initialState: {
    ...newCharacterTemplate.feats
  },
  reducers: {
    loadFeats:(state, action) => {
      const s = Object.keys(state)
      s.forEach(el => {
        state[el] = action.payload[el]
      });
    },
    changeFeatValue: (state, action) => {
      const {category, name, value} = action.payload
      state[category][name] = value ;
    },
  },
});

export const { changeFeatValue, loadFeats } = slice.actions;

export const selectFeatCategory = (category) => state => state.feats[category];

export default slice.reducer;