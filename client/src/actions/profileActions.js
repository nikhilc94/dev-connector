import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types.js";

export const getCurrentProfile = () => async dispatch => {
  try {
    dispatch(setProfileLoading());
    const res = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
  }
};

// Create Profile.
export const createProfile = (profileData, history) => async dispatch => {
  try {
    await axios.post("/api/profile", profileData);
    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Add experience.
export const addExperience = (expData, history) => async dispatch => {
  try {
    await axios.post("/api/profile/experience", expData);
    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Add education.
export const addEducation = (eduData, history) => async dispatch => {
  try {
    await axios.post("/api/profile/education", eduData);
    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Delete Account & profile.
export const deleteAccount = () => async dispatch => {
  try {
    if (window.confirm("Are you sure? This cannot be undone!")) {
      await axios.delete("/api/profile");
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Profile loading.
export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});
