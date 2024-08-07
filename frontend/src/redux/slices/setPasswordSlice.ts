import { createSlice } from '@reduxjs/toolkit';

import { setPassword } from '../thunks/setPasswordThunk';

interface setPasswordState {
  loading: boolean;
  success: boolean;
  error: boolean;
}

const initialState: setPasswordState = {
  loading: false,
  success: false,
  error: false
};

const setPasswordSlice = createSlice({
  name: 'setPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setPassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(setPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = false;
      })
      .addCase(setPassword.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      });
  }
});

export default setPasswordSlice.reducer;
