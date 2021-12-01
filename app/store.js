import { configureStore } from '@reduxjs/toolkit';
import descriptionReducer from '../components/Description/DescriptionSlice';
import statsReducer from '../components/Stats/StatsSlice';
import resourcesReducer from '../components/Resources/ResourcesSlice';
import savesReducer from '../components/Saves/SavesSlice';
import gearReducer from '../components/Gear/GearSlice';
import skillsReducer from '../components/Skills/SkillsSlice';
import itemsReducer from '../components/Items/ItemsSlice';
import featsReducer from '../components/Feats/FeatsSlice';
import spellsReducer from '../components/Spells/SpellsSlice';

export default configureStore({
  reducer: {
    description:descriptionReducer,
    stats:statsReducer,
    resources:resourcesReducer,
    saves:savesReducer,
    gear:gearReducer,
    skills:skillsReducer,
    items:itemsReducer,
    feats: featsReducer,
    spells: spellsReducer,
  },
});