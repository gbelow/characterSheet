import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { calculateStatModifier, selectStatsModifier } from '../Stats/StatsSlice';
import newCharacterTemplate from '../CharManagement/NewCharacterTemplate';
import SizeTable from '../Tables/SizeTable';

export const slice = createSlice({
  name: 'resources',
  initialState: {
    ...newCharacterTemplate.resources
  },
  reducers: {
    loadResources:(state, action) => {
      return action.payload
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

export const getSizeMod = (size, mod) => parseInt(SizeTable[size][mod]) ? parseInt(SizeTable[size][mod]) : 0

export const selectTotalArmor = state => {
  const dexMod = useSelector(selectStatsModifier('DEX'))
  return 10 + state.gear.ARMOR.AC_BONUS + 
    state.gear.SHIELD.AC_BONUS + 
    (state.gear.ARMOR.MAX_DEX > dexMod ? dexMod : state.gear.ARMOR.MAX_DEX ) +
    state.resources.ARMOR_MISC_MOD +
    state.resources.NATURAL_ARMOR +
    getSizeMod(state.description.SIZE, 'normal')
}
export const selectFlat = state => 10+ state.gear.ARMOR.AC_BONUS + state.gear.SHIELD.AC_BONUS + state.resources.ARMOR_MISC_MOD +state.resources.NATURAL_ARMOR
export const selectTouch = state => {
  const dexMod = useSelector(selectStatsModifier('DEX'))
  return 10+(state.gear.ARMOR.MAX_DEX > dexMod ? dexMod : state.gear.ARMOR.MAX_DEX  ) + state.resources.ARMOR_MISC_MOD
}

export const selectMaxDexMod = state => {
  const mod = parseInt(calculateStatModifier(state.stats.DEX))
  return parseInt(state.gear.ARMOR.MAX_DEX) < mod ? parseInt(state.gear.ARMOR.MAX_DEX) : mod
}


export const selectGrappleTotal = state => {
  return(
    calculateStatModifier(state.stats.STR) + 
    state.resources.BASE_ATTACK_BONUS + 
    state.resources.GRAPPLE_MISC_MOD + 
    getSizeMod(state.description.SIZE, 'special')
  )
}

export const selectGrappleSizeMod = state => {
  return getSizeMod(state.description.SIZE, 'special')
}

export const selectNormalSizeMod = state => {
  return getSizeMod(state.description.SIZE, 'normal')
}

export default slice.reducer;