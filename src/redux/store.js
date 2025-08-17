import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from './slices/PropertySlice';
import currencyReducer from './slices/CurrencySlice';
import filtersReducer from './slices/FilterSlice';
import notificationReducer from './slices/NotificationSlice';
export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    property: propertyReducer,
    filters: filtersReducer,
    notifications: notificationReducer,
  },
});
