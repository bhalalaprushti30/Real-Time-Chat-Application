import { createSlice } from '@reduxjs/toolkit';

const storedUsername = localStorage.getItem('username');

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: { username: storedUsername || null },
  reducers: {
    login: (state, action) => {
      try {
        state.username = action.payload;
        localStorage.setItem('username', action.payload);
      } catch (error) {
        console.error("Error saving username:", error);
      }
    },
    logout: (state) => {
      try {
        state.username = null;
        localStorage.removeItem('username');
      } catch (error) {
        console.error("Error removing username:", error);
      }
    },
  },
});

// Export actions
export const { login, logout } = authenticationSlice.actions;

// Export reducer
export default authenticationSlice.reducer;
