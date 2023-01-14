import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { handleAxiosError, toastMessage } from "../../utils/common";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: false,
    name: null,
    id: null,
  },
  reducers: {
    authSuccess: (state, action) => {
      state.value = true;
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    authFailure: (state) => {
      state.value = false;
      state.name = null;
      state.id = null;
    },
  },
});

export const { authFailure, authSuccess } = authSlice.actions;

export const signupUser = (state, nav) => async (dispatch) => {
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/signup`,
      state
    );
    if (res.status === 200) {
      toastMessage("success", "Signup Successful, Please login to Continue");
      setTimeout(() => {
        nav("/");
      }, 1000);
    }
  } catch (error) {
    handleAxiosError(error);
  }
};

export const signinUser = (state) => async (dispatch) => {
  try {
    let res = await axios.post(`${process.env.REACT_APP_BASE_URL}/`, state);
    if (res.status === 200) {
      dispatch(authSuccess(res.data));
      localStorage.setItem("user", res.data.name);
      localStorage.setItem("id", res.data.id);
    } else {
      dispatch(authFailure());
    }
  } catch (error) {
    handleAxiosError(error);
    dispatch(authFailure());
  }
};

export const logOut = (state) => async (dispatch) => {
  try {
    let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/logout`);
    if (res.status === 200) {
      dispatch(authFailure());
    } else {
      dispatch(authFailure());
    }
  } catch (error) {
    handleAxiosError(error);
    dispatch(authFailure());
  } finally {
    localStorage.clear();
  }
};
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
