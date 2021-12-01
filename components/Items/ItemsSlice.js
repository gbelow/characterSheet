import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'items',
  initialState: {
    ...Array(32).fill({name:'', value:0, weight:0,}),
    cp:{amount:0, weight:0},
    sp:{amount:0, weight:0},
    gp:{amount:0, weight:0},
    pp:{amount:0, weight:0},
  },
  reducers: {
    changeItemValue: (state, action) => {
      const {itemNumber, item} = action.payload
      const [name, value] = Object.entries(item)[0]
      state[itemNumber][name] = name == 'name' ? value : parseInt(value) ;
    },
    changeCoin:(state, action) => {
      const {id, value} = action.payload
      state[id] = {amount:parseInt(value) ? parseInt(value) : 0, weight:0.01*parseFloat(value) ? 0.01*parseFloat(value) : 0}
    }
  },
});

export const { changeItemValue, changeCoin } = slice.actions;

export const selectItem = (itemNumber) => state => state.items[itemNumber];
export const selectCoins = (coin) => state => state.items[coin];
export const selectWeightSum = state => Object.values(state.items).reduce((acc,el) => acc + el.weight, 0).toFixed(2)

export default slice.reducer;