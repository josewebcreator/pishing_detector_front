import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/plugins/redux/slices/authSlice.js'

// Configuración del store central de Redux
export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
