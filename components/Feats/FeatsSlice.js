import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'feats',
  initialState: {
    FEATS:{...Array(16).fill('')},
    SPECIAL_ABILITIES:{...Array(16).fill('')},
    LANGUAGES:{...Array(8).fill('')},
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