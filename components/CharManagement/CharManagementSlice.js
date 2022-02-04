import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'charManagement',
  initialState: {
    currentChar:''
  },
  reducers: {
    changeCurrentChar: (state, action) => {
      state.currentChar = action.payload.value;
    },    
  },
});

export const { changeCurrentChar } = slice.actions;

export const selectCurrentChar = state => state.charManagement.currentChar;

export default slice.reducer;