import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";

const user_id = window.localStorage.getItem("user_id");

const initialState = {
  // one to one chat
  personal_chat: {
    conversations: [], // user1 , user2, user3
    current_conversation: null,
    current_messages: [],
  },

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
          msg: faker.name(),
        };
      });

      state.personal_chat.conversations = [];
    },
  },
});

export default slice.reducer;

export const FetchPersonalConversations = ({ conversations }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchPersonalConversations({ conversations }));
  };
};
