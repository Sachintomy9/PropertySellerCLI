import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from './slices/PropertySlice';

export const store = configureStore({
  reducer: {
    property: propertyReducer,
  },
});
