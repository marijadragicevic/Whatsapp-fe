import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;
const MESSAGE_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/message`;

const initialState = {
  status: "",
  error: "",
  conversations: [],
  messages: [],
  activeConversation: {},
  notifications: [],
};

//functions
export const getConversations = createAsyncThunk(
  "conversation/all",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(CONVERSATION_ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const openOrCreateConversation = createAsyncThunk(
  "conversation/open_create",
  async (values, { rejectWithValue }) => {
    try {
      const { token, receiverId } = values;

      const { data } = await axios.post(
        CONVERSATION_ENDPOINT,
        { receiverId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const getConversationMessages = createAsyncThunk(
  "conversation/message",
  async (values, { rejectWithValue }) => {
    try {
      const { token, conversationId } = values;

      const { data } = await axios.get(
        `${MESSAGE_ENDPOINT}/${conversationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "message/send",
  async (values, { rejectWithValue }) => {
    try {
      const { token, conversationId, message, files } = values;

      const { data } = await axios.post(
        `${MESSAGE_ENDPOINT}`,
        { message, conversationId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    updateMessagesAndConversations: (state, action) => {
      //update messages
      let convoId = state.activeConversation?._id;
      if (convoId === action.payload._id) {
        state.messages = [...state.messages, action.payload];
      }

      // update conversations
      let conversation = {
        ...action.payload.conversation,
        latestMessage: action.payload,
      };
      let newConversations = [...state.conversations]?.filter(
        (convo) => convo._id !== conversation?._id
      );
      newConversations.unshift(conversation);
      state.conversations = newConversations;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getConversations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(openOrCreateConversation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(openOrCreateConversation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.activeConversation = action.payload;
      })
      .addCase(openOrCreateConversation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getConversationMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getConversationMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.messages = action.payload;
      })
      .addCase(getConversationMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.messages = [...state.messages, action.payload];
        let conversation = {
          ...action.payload.conversation,
          latestMessage: action.payload,
        };
        let newConversations = [...state.conversations]?.filter(
          (convo) => convo._id !== conversation?._id
        );
        newConversations.unshift(conversation);
        state.conversations = newConversations;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setActiveConversation, updateMessagesAndConversations } =
  chatSlice.actions;

export default chatSlice.reducer;
