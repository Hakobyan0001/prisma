import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import loginReducer from './slices/loginSlice';
import registerReducer from './slices/registerSlice';
import resetPasswordReducer from './slices/resetPasswordSlice';
import setPasswordReducer from './slices/setPasswordSlice';
const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  resetPassword: resetPasswordReducer,
  setPassword: setPasswordReducer,
  auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
