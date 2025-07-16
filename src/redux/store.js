import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from './slices/PropertySlice';
import enquiryReducer from './slices/EnquirySlice';
import currencyReducer from './slices/CurrencySlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    enquiry: enquiryReducer,
    property: propertyReducer,
  },
});
