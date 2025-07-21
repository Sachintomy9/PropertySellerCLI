import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from './slices/PropertySlice';
import currencyReducer from './slices/CurrencySlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    property: propertyReducer,
  },
});
