import { createSlice } from "@reduxjs/toolkit";

const user_id = window.localStorage.getItem("user_id");

const initialState = {
  // one to one chat
  // personal_chat: {
  //   conversations: [], // user1 , user2, user3
  //   current_conversation: null,
  //   current_messages: [],
  // },

  pc_conversations: [], // vishal -> taniya , amna , rajan , tanu
  pc_current_conversation: null,
  pc_current_messages: [],

  // group chat
};

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    fetchPersonalConversations(state, action) {
      const list = action.payload.conversations.map((ele) => {
        const cnt_user = ele.participants.find(
          (el) => el._id.toString() !== user_id
        );

        return {
          id: cnt_user._id,
          user_id: user_id,
          name: cnt_user.name,
          img: cnt_user.imageUrl,
          pinned: false,
          unread: 0,
          time: "10:22",
          status: "offline",
          msg: "abc",
        };
      });

      state.pc_conversations = list;
    },
    updatePersonalConversation(state, action) {
      const this_conversation = action.payload.conversation;

      state.pc_conversations = state.pc_conversations.map((ele) => {
        if (ele?.id !== this_conversation._id) {
          return ele;
        } else {
          const user = this_conversation.participants.find(
            (elm) => elm._id.toString() !== user_id
          );
          return {
            id: this_conversation?._id,
            user_id: user?._id,
            name: user?.name,
            online: user?.status === "online",
            img: user?.imageUrl,
            pinned: false,
            unread: 0,
            time: "10:00",
          };
        }
      });
    },
    addPersonalConversation(state, action) {
      const cnt_conversation = action.payload.conversation;

      const user = cnt_conversation.participants.find(
        (elm) => elm._id.toString() !== user_id
      );

      state.pc_conversations.push({
        id: cnt_conversation._id,
        userId: user._id,
        name: user.name,
        img: user.imageUrl,
        status: "Online",
        pinned: false,
        unread: 0,
        time: "10:00",
      });
    },
    setCurrentConversation(state, action) {
      state.pc_current_conversation = action.payload;
    },
    fetchCurrentMessages(state, action) {
      const messages = action.payload.messages;

      const message_properties = messages.map((ele) => ({
        // msg -> to , from
        id: ele._id,
        type: "msg",
        subtype: ele.type,
        message: ele.text,
        incoming: ele.to === user_id,
        outgoing: ele.from === user_id,
      }));

      state.pc_current_messages = message_properties;
    },
    addPersonalMessage(state, action) {
      state.pc_current_messages.push(action.payload.message);
    },
  },
});

export default slice.reducer;

export const FetchPersonalConversations = ({ conversations }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchPersonalConversations({ conversations }));
  };
};

export const AddPersonalConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addPersonalConversation({ conversation }));
  };
};

export const UpdatePersonalConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updatePersonalConversation({ conversation }));
  };
};

export const SetCurrentConversation = (current_conversation) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.setCurrentConversation(current_conversation));
  };
};

export const FetchCurrentMessages = ({ messages }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchCurrentMessages({ messages }));
  };
};

export const AddPersonalMessage = (message) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addPersonalMessage(message));
  };
};
