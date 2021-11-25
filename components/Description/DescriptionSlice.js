import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'description',
  initialState: {
    charName:'Theoric',
    playerName:'',
    class:'',
    level:'1',
    race:'',
    alignment:'',
    deity:'',
    size:'',
    age:'',
    gender:'',
    height:'',
    weight:'',
    eyes:'',
    hair:'',
    skin:'',
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