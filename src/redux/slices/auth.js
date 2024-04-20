import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  isLoggedIn: false,
  token: "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

export default slice.reducer;

export function LogInUser(formValues) {
  return async (dispatch, getState) => {
    axios
      .post(
        "/api/v1/auth/login",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        dispatch(
          slice.actions.login({
            isLoggedIn: true,
            token: resp.data.token,
          })
        );
        console.log(resp);
      })
      .catch((err) => console.log(err));
  };
}

export function LogOutUser() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.logout());
  };
}

export function ResetPassword(formValues) {
  return async (dispatch, getState) => {
    axios
      .post(
        "/api/v1/auth/forgot-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  };
}
