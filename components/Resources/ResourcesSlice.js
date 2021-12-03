import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { selectStatsModifier } from '../Stats/StatsSlice';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';

export const slice = createSlice({
  name: 'resources',
  initialState: {
    ...newCharacterTemplate.resources
  },
  reducers: {
    loadResources:(state, action) => {
      const s = Object.keys(state)
      s.forEach(el => {
        state[el] = action.payload[el]
      });
    },
    changeResourceItem: (state, action) => {
      state[action.payload.itemName] = parseInt(action.payload.value) ? parseInt(action.payload.value) : 0 ;
    },
  },
});

export const { changeResourceItem, loadResources } = slice.actions;

export const selectResourceItem = (itemName) => state => state.resources[itemName];
export const selectArmorBonus = state => state.gear.ARMOR.AC_BONUS
export const selectShieldBonus = state => state.gear.SHIELD.AC_BONUS
// export const selectArmorSizeMod = state => state.description.size 
export const selectInitiative = state => {
  const dexMod = useSelector(selectStatsModifier('DEX'))
  return state.resources.INI_MISC_MOD + parseInt(dexMod)
}

export const selectTotalArmor = state => {
  const dexMod = useSelector(selectStatsModifier('DEX'))
  return 10 + state.gear.ARMOR.AC_BONUS + 
    state.gear.SHIELD.AC_BONUS + 
    (state.gear.ARMOR.MAX_DEX > dexMod ? dexMod : state.gear.ARMOR.MAX_DEX ) +
    state.resources.ARMOR_MISC_MOD +
    state.resources.NATURAL_ARMOR
}
export const selectFlat = state => 10+ state.gear.ARMOR.AC_BONUS + state.gear.SHIELD.AC_BONUS + state.resources.ARMOR_MISC_MOD +state.resources.NATURAL_ARMOR
export const selectTouch = state => {
  const dexMod = useSelector(selectStatsModifier('DEX'))
  return 10+(state.gear.ARMOR.MAX_DEX > dexMod ? dexMod : state.gear.ARMOR.MAX_DEX  ) + state.resources.ARMOR_MISC_MOD
}

export default slice.reducer;