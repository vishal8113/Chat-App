import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: {
    open: false,
    sectionType: "CONTACT",
  },
  openSnackBar: false,
  snackBarMessage: null,
  snackBarSeverity: null,
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
