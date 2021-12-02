import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { selectStatsModifier } from '../Stats/StatsSlice';

export const slice = createSlice({
  name: 'resources',
  initialState: {
    HP:10,
    CURRENT_HP:10,
    TEMPORARY_HP:0,
    NON_LETHAL_DMG:0,
    WOUNDS:'',
    AC:10,
    SPEED:6,
    DAMAGE_REDUCTION:0,
    SPELL_RESISTANCE:0,
    POISON_RESISTANCE:0,
    INITIATIVE:0,
    INI_MISC_MOD:0,
    BASE_ATTACK_BONUS:0,
    GRAPPLE_MISC_MOD:0,
    NATURAL_ARMOR:0,
    DEFLECT_MOD:0,
    ARMOR_MISC_MOD:0,
  },
  reducers: {
    changeResourceItem: (state, action) => {
      state[action.payload.itemName] = parseInt(action.payload.value) ? parseInt(action.payload.value) : 0 ;
    },
  },
});

export const { changeResourceItem } = slice.actions;

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