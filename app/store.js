import { configureStore } from '@reduxjs/toolkit';
import descriptionReducer from '../components/Description/DescriptionSlice';
import statsReducer from '../components/Stats/StatsSlice';
import resourcesReducer from '../components/Resources/ResourcesSlice';
import savesReducer from '../components/Saves/SavesSlice';

export default configureStore({
  reducer: {
    description:descriptionReducer,
    stats:statsReducer,
    resources:resourcesReducer,
    saves:savesReducer,
  },
});