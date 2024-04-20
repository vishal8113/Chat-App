import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  isLoggedIn: false,
  token: "",
  error: false,
  email: "",
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
  },
});

export default slice.reducer;

// HOFs (Higher order function)
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
      .catch((err) => {
        console.log(err);
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function NewPassword(formValues) {
  return async (dispatch, getState) => {
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

        dispatch(
          slice.actions.login({
            isLoggedIn: true,
            token: resp.data.token,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
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
        console.log(getState().auth.error);
        console.log(resp);
        dispatch(slice.actions.updateEmail({ email: formValues.email }));
      })
      .catch((err) => {
        // dispatch(
        //   slice.actions.updateError({
        //     error: true,
        //   })
        // );
        console.log(err);
      })
      .finally(() => {
        if (!getState().auth.error) {
          window.location.href = "/auth/verify";
        }
      });
  };
}

export function VerifyEmail(formValues) {
  return async (dispatch, getState) => {
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
        dispatch(
          slice.actions.login({
            isLoggedIn: true,
            token: resp.data.token,
          })
        );
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
