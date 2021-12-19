import { createSlice } from '@reduxjs/toolkit';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';
import { WeightTable } from './WeightTable';

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
  const itemsSum = Object.values(state.items).reduce((acc,el) => acc + parseInt(el.weight), 0)
  const gearSum = Object.values(state.gear).reduce((acc, el) => acc + parseInt(el.WEIGHT), 0)
  return (gearSum + itemsSum).toFixed(2)
}

export const selectWeightLimits = state => {
  const str = state.stats.STR
  const totStr = parseInt(str.score) + parseInt(str.buffs) - parseInt(str.debuffs)
  const cap = WeightTable[totStr] ? WeightTable[totStr] : WeightTable[Object.keys(WeightTable).length]  
  return {light:cap[0], medium:cap[1], heavy: cap[2], over: cap[2], off: cap[2]*2, drag:cap[2]*5}

}


export default slice.reducer;