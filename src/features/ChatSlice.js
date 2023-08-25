import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {},
  notifications: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveCoversation: (state, action) => {
      state.activeConversation = action.payload;
    },
  },
});

export const { setActiveCoversation } = chatSlice.actions;

export default chatSlice.reducer;
