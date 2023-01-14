import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleAxiosError, toastMessage } from "../../utils/common";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    value: [],
  },
  reducers: {
    getAll: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getAll } = dashboardSlice.actions;

export const getAllNotes = (setLoad) => async (dispatch) => {
  try {
    let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/note/`);
    if (res.status === 200) {
      dispatch(getAll(res.data));
      setLoad(false);
    }
  } catch (error) {
    handleAxiosError(error);
    setLoad(false);
  }
};

export const addNote = (state, setLoad) => async (dispatch) => {
  try {
    setLoad(true);
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/note/create`,
      { body: state.body, category: state.category }
    );
    if (res.status === 200) {
      dispatch(getAllNotes());
      toastMessage("success", "Added");
      setLoad(false);
    }
  } catch (error) {
    handleAxiosError(error);
    setLoad(false);
  }
};
export const deleteNote = (state, setLoad) => async (dispatch) => {
  try {
    setLoad(true);
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/note/delete/${state}`,
      {}
    );
    if (res.status === 200) {
      dispatch(getAllNotes());
      toastMessage("success", "Deleted");
      setLoad(false);
    }
  } catch (error) {
    handleAxiosError(error);
    setLoad(false);
  }
};

export const editNote = (state, setLoad) => async (dispatch) => {
  try {
    setLoad(true);
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/note/update/${state._id}`,
      { body: state.body, category: state.category }
    );
    if (res.status === 200) {
      dispatch(getAllNotes());
      toastMessage("success", "Updated");
      setLoad(false);
    }
  } catch (error) {
    handleAxiosError(error);
    setLoad(false);
  }
};

export const upvoteNote = (state, setLoad) => async (dispatch) => {
  try {
    setLoad(true);
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/note/upvote/${state._id}`,
      {}
    );
    if (res.status === 200) {
      dispatch(getAllNotes());
      toastMessage("success", "Upvoted");
      setLoad(false);
    }
  } catch (error) {
    handleAxiosError(error);
    setLoad(false);
  }
};

export const selectNotes = (state) => state.dashboard.value;

export default dashboardSlice.reducer;
