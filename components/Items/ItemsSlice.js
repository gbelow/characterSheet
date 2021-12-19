import { createSlice } from '@reduxjs/toolkit';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';

export const slice = createSlice({
  name: 'items',
  initialState: {
    ...newCharacterTemplate.items
  },
  reducers: {
    loadItems:(state, action) => {
      const s = Object.keys(state)
      s.forEach(el => {
        state[el] = action.payload[el]
      });
    },
    changeItemValue: (state, action) => {
      const {itemNumber, item} = action.payload
      const [name, value] = Object.entries(item)[0]
      state[itemNumber][name] = name == 'name' ? value : (parseInt(value) ? parseInt(value) : 0) ;
    },
    changeCoin:(state, action) => {
      const {id, value} = action.payload
      state[id] = {amount:parseInt(value) ? parseInt(value) : 0, weight:0.01*parseFloat(value) ? 0.01*parseFloat(value) : 0}
    }
  },
});

export const { changeItemValue, changeCoin, loadItems } = slice.actions;

export const selectItem = (itemNumber) => state => state.items[itemNumber];
export const selectCoins = (coin) => state => state.items[coin];
export const selectWeightSum = state => {
  const itemsSum = Object.values(state.items).reduce((acc,el) => acc + el.weight, 0).toFixed(2)
  const gearSum = Object.values(state.gear).reduce((acc, el) => acc + el.weight, 0).toFixed(2)
  return gearSum + itemsSum
}


export default slice.reducer;