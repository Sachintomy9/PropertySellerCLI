// src/redux/slices/profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/ApiClient';
import * as Keychain from 'react-native-keychain';

const initialState = {
  profile: {
    name: '',
    email: '',
    phone: '',
    id: '',
  },
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (!credentials) return { name: '', email: '', phone: '', id: '' };

      const tokenData = JSON.parse(credentials.password);
      if (tokenData?.isGuest) {
        return { name: 'Guest', email: '', phone: '', id: '' };
      }

      const accessToken = tokenData.accessToken;
      if (!accessToken) return { name: '', email: '', phone: '', id: '' };

      const response = await api.get('auth/user/profile');
      if (response.status === 200) {
        const { name, email, number: phone, _id: id } = response.data.user;
        console.log("In ProfileSlice :",id);
        return { name, email, phone, id };
      }

      return rejectWithValue('Failed to fetch user profile');
    } catch (error) {
      return rejectWithValue(error.message || 'Unknown error');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = { name: '', email: '', phone: '', id: '' };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { updateProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
