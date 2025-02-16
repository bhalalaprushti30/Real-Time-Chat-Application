import { createSlice } from '@reduxjs/toolkit';

const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: storedMessages,  // Load messages from localStorage
    onlineUsers: [],
  },
  reducers: {
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
      try {
        localStorage.setItem('messages', JSON.stringify(state.messages)); // Save messages to localStorage
      } catch (error) {
        console.error("Error saving messages:", error);
      }
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
      try {
        localStorage.removeItem('messages'); // Clear messages on logout
      } catch (error) {
        console.error("Error clearing messages:", error);
      }
    },
  },
});

export const { receiveMessage, setOnlineUsers, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
