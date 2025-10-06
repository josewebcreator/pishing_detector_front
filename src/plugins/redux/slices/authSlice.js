import { createSlice } from '@reduxjs/toolkit';

// Estado inicial del slice de autenticación
const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    setIsLoggedIn: (state, action) => {
        state.isLoggedIn = action.payload;
    }
  },
});

export const { login, logout, setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;