import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { OpenSnackBar, SnackBarMessage, SnackBarSeverity } from "./app";

const initialState = {
  isLoggedIn: false,
  token: "",
  email: "",
  isLoading: false,
  profileImageUrl:
    "https://firebasestorage.googleapis.com/v0/b/social-media-app-2c372.appspot.com/o/profile.png?alt=media&token=5cbf7165-9ad8-4388-ad43-cf722be73163",
  name: "",
  about: "",
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
    updateProfileUrl(state, action) {
      state.profileImageUrl = action.payload.profileImageUrl;
    },
    updateUserName(state, action) {
      state.name = action.payload.name;
    },
    updateUserAbout(state, action) {
      state.about = action.payload.about;
    },
  },
});

export default slice.reducer;

function dispatchIsLoading(dispatch, loadingVal) {
  if (loadingVal) {
    dispatch(
      slice.actions.updateIsLoading({
        isLoading: true,
      })
    );
  } else {
    dispatch(
      slice.actions.updateIsLoading({
        isLoading: false,
      })
    );
  }
}

function dispatchSnackBar(dispatch, resp, severity) {
  dispatch(OpenSnackBar());
  if (resp.data) {
    dispatch(SnackBarMessage(resp.data.message));
  } else {
    dispatch(SnackBarMessage(resp.response.data.message));
  }
  dispatch(SnackBarSeverity(severity));
}

// HOFs (Higher order function)
export function LogInUser(formValues) {
  return async (dispatch, getState) => {
    dispatchIsLoading(dispatch, true);
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
        if (resp.data.url) {
          dispatch(
            slice.actions.updateProfileUrl({
              profileImageUrl: resp.data.url,
            })
          );
          dispatch(slice.actions.updateUserName({ name: resp.data.name }));
          dispatch(slice.actions.updateUserAbout({ about: resp.data.about }));
          dispatch(slice.actions.updateEmail({ email: resp.data.email }));

          window.localStorage.setItem("user_id", resp.data.user_id);
        } else {
          dispatch(
            slice.actions.updateProfileUrl({
              profileImageUrl:
                "https://firebasestorage.googleapis.com/v0/b/social-media-app-2c372.appspot.com/o/profile.png?alt=media&token=5cbf7165-9ad8-4388-ad43-cf722be73163",
            })
          );
          dispatch(slice.actions.updateUserName({ name: resp.data.name }));
          dispatch(slice.actions.updateUserAbout({ about: resp.data.about }));
          dispatch(slice.actions.updateEmail({ email: resp.data.email }));
        }
        dispatch(
          slice.actions.login({
            isLoggedIn: true,
            token: resp.data.token,
          })
        );

        window.localStorage.setItem("user_id", resp.data.user_id);

        dispatchSnackBar(dispatch, resp, "success");

        dispatchIsLoading(dispatch, false);
      })
      .catch((err) => {
        console.log(err);
        dispatchSnackBar(dispatch, err, "error");

        dispatchIsLoading(dispatch, false);
      });
  };
}

export function LogOutUser() {
  return async (dispatch, getState) => {
    window.localStorage.removeItem("user_id");
    dispatch(slice.actions.logout());
    dispatch(slice.actions.updateUserName({ name: "" }));
    dispatch(slice.actions.updateUserAbout({ about: "" }));
  };
}

export function ResetPassword(formValues) {
  return async (dispatch, getState) => {
    dispatchIsLoading(dispatch, true);
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
        dispatchSnackBar(dispatch, resp, "success");
        dispatchIsLoading(dispatch, false);
      })
      .catch((err) => {
        console.log(err);
        dispatchSnackBar(dispatch, err, "error");
        dispatchIsLoading(dispatch, false);
      });
  };
}

export function NewPassword(formValues) {
  return async (dispatch, getState) => {
    dispatchIsLoading(dispatch, true);
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
        dispatchSnackBar(dispatch, resp, "success");
        dispatchIsLoading(dispatch, false);

        window.location.href = "/auth/login";
      })
      .catch((err) => {
        console.log(err);
        dispatchSnackBar(dispatch, err, "error");
        dispatchIsLoading(dispatch, false);
      });
  };
}

export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
    dispatchIsLoading(dispatch, true);
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
        dispatchSnackBar(dispatch, resp, "success");
        dispatchIsLoading(dispatch, false);

        window.location.href = "/auth/verify";
      })
      .catch((err) => {
        console.log(err);
        dispatchSnackBar(dispatch, err, "error");
        dispatchIsLoading(dispatch, false);
      });
  };
}

export function VerifyEmail(formValues) {
  return async (dispatch, getState) => {
    dispatchIsLoading(dispatch, true);
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

        dispatchSnackBar(dispatch, resp, "success");
        dispatchIsLoading(dispatch, false);

        window.location.href = "/auth/create-profile";
      })
      .catch((err) => {
        console.log(err);
        dispatchSnackBar(dispatch, err, "error");
        dispatchIsLoading(dispatch, false);
      });
  };
}

export function saveUserProfile(formValues) {
  return async (dispatch, getState) => {
    dispatchIsLoading(dispatch, true);
    axios
      .post(
        "/api/v1/auth/create-profile",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${getState().token}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        if (resp.data.url) {
          dispatch(
            slice.actions.updateProfileUrl({ profileImageUrl: resp.data.url })
          );
          dispatch(slice.actions.updateUserName({ name: resp.data.name }));
          dispatch(slice.actions.updateUserAbout({ about: resp.data.about }));
        } else {
          dispatch(
            slice.actions.updateProfileUrl({
              profileImageUrl:
                "https://firebasestorage.googleapis.com/v0/b/social-media-app-2c372.appspot.com/o/profile.png?alt=media&token=5cbf7165-9ad8-4388-ad43-cf722be73163",
            })
          );
          dispatch(slice.actions.updateUserName({ name: resp.data.name }));
          dispatch(slice.actions.updateUserAbout({ about: resp.data.about }));
        }
        dispatch(
          slice.actions.login({
            isLoggedIn: true,
            token: resp.data.token,
          })
        );
        dispatchSnackBar(dispatch, resp, "success");
        dispatchIsLoading(dispatch, false);

        window.localStorage.setItem("user_id", resp.data.user_id);
      })
      .catch((err) => {
        console.log(err);
        dispatchSnackBar(dispatch, err, "error");
        dispatchIsLoading(dispatch, false);
      });
  };
}

export function editProfile(formValues) {
  return async (dispatch, getState) => {
    dispatchIsLoading(dispatch, true);
    axios
      .put(
        "/api/v1/user/editProfile",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${getState().token}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        if (resp.data.url) {
          dispatch(
            slice.actions.updateProfileUrl({ profileImageUrl: resp.data.url })
          );
          dispatch(slice.actions.updateUserName({ name: resp.data.name }));
          dispatch(slice.actions.updateUserAbout({ about: resp.data.about }));
        } else {
          dispatch(
            slice.actions.updateProfileUrl({
              profileImageUrl:
                "https://firebasestorage.googleapis.com/v0/b/social-media-app-2c372.appspot.com/o/profile.png?alt=media&token=5cbf7165-9ad8-4388-ad43-cf722be73163",
            })
          );
          dispatch(slice.actions.updateUserName({ name: resp.data.name }));
          dispatch(slice.actions.updateUserAbout({ about: resp.data.about }));
        }

        dispatchSnackBar(dispatch, resp, "success");
        dispatchIsLoading(dispatch, false);

        window.location.href = "/app";
      })
      .catch((err) => {
        console.log(err);
        dispatchSnackBar(dispatch, err, "error");
        dispatchIsLoading(dispatch, false);
      });
  };
}

export function removeUser(formValues) {
  return async (dispatch, getState) => {
    dispatchIsLoading(dispatch, true);
    axios
      .post(
        "/api/v1/user/removeUser",
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
        dispatch(slice.actions.updateUserName({ name: "" }));
        dispatch(slice.actions.updateUserAbout({ about: "" }));
        dispatch(
          slice.actions.updateProfileUrl({
            profileImageUrl:
              "https://firebasestorage.googleapis.com/v0/b/social-media-app-2c372.appspot.com/o/profile.png?alt=media&token=5cbf7165-9ad8-4388-ad43-cf722be73163",
          })
        );
        dispatch(slice.actions.logout());
        dispatch(slice.actions.updateEmail({ email: "" }));

        dispatchSnackBar(dispatch, resp, "success");
        dispatchIsLoading(dispatch, false);

        window.location.href = "/auth/login";
      })
      .catch((err) => {
        console.log(err);
        dispatchSnackBar(dispatch, err, "error");
        dispatchIsLoading(dispatch, false);
      });
  };
}
