
import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS } from './types.js';



export const getCurrentProfile = () => async (dispatch) => {
    try {
        dispatch(setProfileLoading());
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    }
    catch (error) {
        dispatch({
            type: GET_PROFILE,
            payload: {}
        });
    }
}


// Create Profile.
export const createProfile = (profileData, history) => async (dispatch) => {
    try {
        await axios.post('/api/profile', profileData);
        history.push('/dashboard');
    }
    catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
}



// Profile loading.
export const setProfileLoading = () => ({
    type: PROFILE_LOADING
});


export const clearCurrentProfile = () => ({
    type: CLEAR_CURRENT_PROFILE
});


