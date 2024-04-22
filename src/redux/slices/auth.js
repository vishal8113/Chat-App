import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { OpenSnackBar, SnackBarMessage, SnackBarSeverity } from "./app";

const initialState = {
  isLoggedIn: false,
  token: "",
  email: "",
  isLoading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateError(state, action) {
      state.error = action.payload.error;
    },
    login(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = "";
    },
    updateEmail(state, action) {
      state.email = action.payload.email;
    },
    updateIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export default slice.reducer;

// HOFs (Higher order function)
export function LogInUser(formValues) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateIsLoading({
        isLoading: true,
      })
    );
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
        console.log(resp);
        dispatch(
          slice.actions.login({
            isLoggedIn: true,
            token: resp.data.token,
          })
        );

        dispatch(OpenSnackBar());
        dispatch(SnackBarMessage(resp.data.message));
        dispatch(SnackBarSeverity("success"));

        dispatch(
          slice.actions.updateIsLoading({
            isLoading: false,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(OpenSnackBar());
        dispatch(SnackBarMessage(err.response.data.message));
        dispatch(SnackBarSeverity("error"));
        dispatch(slice.actions.updateIsLoading({ isLoading: false }));
      });
  };
}

export function LogOutUser() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.logout());
  };
}

export function ResetPassword(formValues) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateIsLoading({
        isLoading: true,
      })
    );
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
      .then((resp) => {
        console.log(resp);
        dispatch(OpenSnackBar());
        dispatch(SnackBarMessage(resp.data.message));
        dispatch(SnackBarSeverity("success"));
        dispatch(
          slice.actions.updateIsLoading({
            isLoading: false,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(OpenSnackBar());
        dispatch(SnackBarMessage(err.response.data.message));
        dispatch(SnackBarSeverity("error"));
        dispatch(
          slice.actions.updateIsLoading({
            isLoading: false,
          })
        );
      });
  };
}

export function NewPassword(formValues) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateIsLoading({
        isLoading: true,
      })
    );
    axios
      .post(
        "/api/v1/auth/reset-password",
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
        console.log(resp);
        dispatch(OpenSnackBar());
        dispatch(SnackBarMessage(resp.data.message));
        dispatch(SnackBarSeverity("success"));
        dispatch(
          slice.actions.updateIsLoading({
            isLoading: false,
          })
        );

        window.location.href = "/auth/login";
      })
      .catch((err) => {
        console.log(err);
        dispatch(OpenSnackBar());
        dispatch(SnackBarMessage(err.response.data.message));
        dispatch(SnackBarSeverity("error"));
        dispatch(
          slice.actions.updateIsLoading({
            isLoading: false,
          })
        );
      });
  };
}

export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateIsLoading({
        isLoading: true,
      })
    );
    axios
      .post(
        "/api/v1/auth/register",
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
        console.log(resp);
        dispatch(slice.actions.updateEmail({ email: formValues.email }));
        dispatch(OpenSnackBar());
        dispatch(SnackBarMessage(resp.data.message));
        dispatch(SnackBarSeverity("success"));
        dispatch(
          slice.actions.updateIsLoading({
            isLoading: false,
          })
        );

        window.location.href = "/auth/verify";
      })
      .catch((err) => {
        console.log(err);
        dispatch(OpenSnackBar());
        dispatch(SnackBarMessage(err.response.data.message));
        dispatch(SnackBarSeverity("error"));
        dispatch(
          slice.actions.updateIsLoading({
            isLoading: false,
          })
        );
      });
  };
}

export function VerifyEmail(formValues) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateIsLoading({
        isLoading: true,
      })
    );
    axios
      .post(
        "/api/v1/auth/verify-otp",
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
        console.log(resp);
        dispatch(
          slice.actions.login({
            isLoggedIn: true,
            token: resp.data.token,
          })
        );
        dispatch(OpenSnackBar());
        dispatch(SnackBarMessage(resp.data.message));
        dispatch(SnackBarSeverity("success"));
        dispatch(
          slice.actions.updateIsLoading({
            isLoading: false,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(OpenSnackBar());
        dispatch(SnackBarMessage(err.response.data.message));
        dispatch(SnackBarSeverity("error"));
        dispatch(
          slice.actions.updateIsLoading({
            isLoading: false,
          })
        );
      });
  };
}
