import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  sidebar: {
    open: false,
    sectionType: "CONTACT",
  },
  openSnackBar: false,
  snackBarMessage: null,
  snackBarSeverity: null,
  users: [],
  friends: [],
  friendRequests: [],
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType: (state, action) => {
      state.sidebar.sectionType = action.payload.sectionType;
    },
    updateOpenSnackBar: (state, action) => {
      state.openSnackBar = action.payload.openSnackBar;
    },
    updateSnackBarMessage: (state, action) => {
      state.snackBarMessage = action.payload.snackBarMessage;
    },
    updateSnackBarSeverity: (state, action) => {
      state.snackBarSeverity = action.payload.snackBarSeverity;
    },
    updateUsers: (state, action) => {
      state.users = action.payload.users;
    },
    updateFriends: (state, action) => {
      state.friends = action.payload.friends;
    },
    updateFriendRequests: (state, action) => {
      state.friendRequests = action.payload.friendRequests;
    },
  },
});

export default slice.reducer;

export function ToggleSidebar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSidebar());
  };
}

export function UpdateSidebarType(type) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateSidebarType({
        type,
      })
    );
  };
}

export function OpenSnackBar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateOpenSnackBar({ openSnackBar: true }));

    setTimeout(() => {
      dispatch(CloseSnackBar());
    }, 5000);
  };
}

export function CloseSnackBar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateOpenSnackBar({ openSnackBar: false }));
  };
}

export function SnackBarMessage(message) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateSnackBarMessage({ snackBarMessage: message }));
  };
}

export function SnackBarSeverity(severity) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateSnackBarSeverity({ snackBarSeverity: severity })
    );
  };
}

export function FetchUsers() {
  return async (dispatch, getState) => {
    await axios
      .get("/api/v1/user/getUsers", {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        dispatch(slice.actions.updateUsers({ users: resp.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function FetchFriends() {
  return async (dispatch, getState) => {
    await axios
      .get("/api/v1/user/getFriends", {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        dispatch(slice.actions.updateFriends({ friends: resp.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function FetchFriendRequests() {
  return async (dispatch, getState) => {
    await axios
      .get("/api/v1/user/getFriendRequests", {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        dispatch(
          slice.actions.updateFriendRequests({ friendRequests: resp.data.data })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
