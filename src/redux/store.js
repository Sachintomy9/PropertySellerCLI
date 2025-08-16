import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from './slices/PropertySlice';
import currencyReducer from './slices/CurrencySlice';
import filtersReducer from './slices/FilterSlice';
export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    property: propertyReducer,
    filters: filtersReducer,
  },
});
