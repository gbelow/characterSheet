import { configureStore } from '@reduxjs/toolkit';
import descriptionReducer from '../components/Description/DescriptionSlice';
import statsReducer from '../components/Stats/StatsSlice';

export default configureStore({
  reducer: {
    description:descriptionReducer,
    stats:statsReducer,
  },
});