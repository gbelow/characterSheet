import { createSlice } from '@reduxjs/toolkit';

const weapon = {NAME:'', ATK_BONUS:0, BONUS_ATTR:'', DAMAGE_DICE:'', 
  DAMAGE_TYPE:'', DAMAGE_BONUS_TYPE:'', DAMAGE_BONUS:0, 
  CRITICAL_MULT:'', CRITICAL_RANGE:'', WEIGHT:0, RANGE:0, TYPE:'light', NOTES:''
}

export const slice = createSlice({
  name: 'gear',
  initialState: {
    ARMOR:{NAME:'', TYPE:'', AC_BONUS:5, MAX_DEX:2, CHECK_PENALTY:5, SPELL_FAILURE:10, SPEED:6, WEIGHT:10, SPECIAL_PROPS:''},
    SHIELD:{NAME:'', AC_BONUS:0, CHECK_PENALTY:5, WEIGHT:10, SPECIAL_PROPS:''},
    PROT_ITEM1:{NAME:'', AC_BONUS:0, WEIGHT:10, SPECIAL_PROPS:''},
    PROT_ITEM2:{NAME:'', AC_BONUS:0, WEIGHT:10, SPECIAL_PROPS:''},
    WEAPON1:weapon,
    WEAPON2:weapon,
    WEAPON3:weapon,
    WEAPON4:weapon,
  },
  reducers: {
    changeGearItem: (state, action) => {
      state[action.payload.itemName][action.payload.valueName] = action.payload.value;
    },
  },
});

export const { changeGearItem } = slice.actions;

export const selectGearItem = (itemName) => state => state.gear[itemName];

export default slice.reducer;