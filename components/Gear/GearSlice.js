import { createSlice } from '@reduxjs/toolkit';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';
import { calculateStatModifier } from '../Stats/StatsSlice';

export const slice = createSlice({
  name: 'gear',
  initialState: {
    ...newCharacterTemplate.gear
  },
  reducers: {
    loadGear:(state, action) => {
      return action.payload
    },
    changeGearItem: (state, action) => {
      const {itemName, valueName, value} = action.payload
      state[itemName][valueName] = value;
    },
  },
});

export const { changeGearItem, loadGear } = slice.actions;

export const selectGearItem = (itemName) => state => state.gear[itemName];
export const selectGearItemValue = (itemName, itemValue) => state => state.gear[itemName][itemValue]
export const selectWeaponStatModifier = (itemName) => state => {
  const statName = state.gear[itemName].BONUS_ATTR
  return statName ? calculateStatModifier(state.stats[statName]) : calculateStatModifier(state.stats['STR'])
}

export default slice.reducer;