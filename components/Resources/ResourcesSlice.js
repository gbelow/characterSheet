import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'resources',
  initialState: {
    HP:10,
    CURRENT_HP:10,
    TEMPORARY_HP:0,
    NON_LETHAL_DMG:0,
    WOUNDS:'',
    AC:10,
    FLAT:10,
    TOUCH:10,
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

export default slice.reducer;