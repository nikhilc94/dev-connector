
import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types.js';



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


export const setProfileLoading = () => ({
    type: PROFILE_LOADING
});


export const clearCurrentProfile = () => ({
    type: CLEAR_CURRENT_PROFILE
});