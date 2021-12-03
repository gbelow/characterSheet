import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'charManager',
  initialState: {
  },
  reducers: {
      loadCharacter:(state, action)=>{
        console.log(action)
        state = action.payload.data
      }
  },
});

export const { loadCharacter } = slice.actions;


export default slice.reducer;