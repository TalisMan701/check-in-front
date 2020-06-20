import {registrationAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_IS_REGISTERED = "SET_IS_REGISTERED";
const SET_USER_FINAL = "SET_USER_FINAL";

let initialState = {
    isRegistrated: false
}

const registrationReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_IS_REGISTERED:
            return {
                isRegistrated: true
            }
        case SET_USER_FINAL:
            return {
                ...initialState
            }
        default:
            return state
    }
}

const setIsRegistred = () => ({type: SET_IS_REGISTERED})
export const setUserFinal = () => ({type: SET_USER_FINAL})

export const registration = (login, email, userInfo, password) => (dispatch) => {
    registrationAPI.registration(login, email, userInfo, password)
        .then(response => {
            if (response.data.status === true) {
                dispatch(setIsRegistred())
            }
        }).catch((error) => {
        let message = error.response.data.email[0].length > 0 ? error.response.data.email[0] : "Some error";
        dispatch(stopSubmit("registration", {_error: message}));
    })
}

export default registrationReducer;