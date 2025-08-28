// redux/slices/currencySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCurrencyRates = createAsyncThunk(
  'currency/fetchCurrencyRates',
  async () => {
    const response = await axios.get('https://v1-api.propertyseller.com/api/v1/currency'); // Fetch full rates list
    return response.data.data; // contains `rates` object
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    selectedCurrency: 'AED',
    conversionRate: 1,
    rates: {},
    loading: false,
    error: null,
  },
  reducers: {
    setCurrency: (state, action) => {
      const currency = action.payload;
      state.selectedCurrency = currency;
      state.conversionRate = state.rates[currency.toLowerCase()] || 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencyRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrencyRates.fulfilled, (state, action) => {
        state.loading = false;
        state.rates = action.payload.rates;
        // default: AED -> 1
        state.conversionRate =
          action.payload.rates[state.selectedCurrency.toLowerCase()] || 1;
      })
      .addCase(fetchCurrencyRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
