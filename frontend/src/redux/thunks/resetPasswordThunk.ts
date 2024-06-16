import { createAsyncThunk } from '@reduxjs/toolkit';
import { resetPasswordRequest } from '../../services/REST/resetPassword';

type resetPasswordUserPayload = {
  full_name: string;
  email: string;
};

export const registerUser = createAsyncThunk(
  'auth/resetPassword',
  async (userData: resetPasswordUserPayload, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(userData);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);