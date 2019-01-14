import axios from "axios";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";

// Register user.
export const registerUser = (userData, history) => async dispatch => {
  try {
    await axios.post("/api/users/register", userData);
    history.push("/login");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Login - Get user token.
export const loginUser = userData => async dispatch => {
  try {
    const res = await axios.post("/api/users/login", userData);
    const { token } = res.data;

    // Saving token to local storage.
    localStorage.setItem("jwtToken", token);

    // Adding token to axios header.
    setAuthToken(token);

    // Decoding token to get user data.
    const decoded = jwt_decode(token);

    // Set current user to the state.
    dispatch(setCurrentUser(decoded));
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Set current user to the state.
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

// Logout user.
export const logoutUser = () => dispatch => {
  // Removing token from localStorage.
  localStorage.removeItem("jwtToken");

  // Removing token from axios header.
  setAuthToken(false);

  // Changing the state.
  dispatch(setCurrentUser({}));
};
