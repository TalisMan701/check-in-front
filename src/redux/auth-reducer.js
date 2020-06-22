import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA"

let initialState = {
    userId: null,
    login: null,
    email: null,
    userInfo: {
        name: null,
        surname: null,
        patronymic: null,
        group: null
    },
    isAuth: false,
    isTeacher: false
}

const authReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_USER_DATA:
            return{
                ...state,
                ...action.data
            }
        default:
            return state
    }
}

const setAuthUserData = (userId, login, email, userInfo, isAuth, isTeacher) => ({type: SET_USER_DATA, data:
        {userId, login, email, userInfo, isAuth, isTeacher}});

export const getAuthUserData = () => (dispatch) => {
    authAPI.me()
        .then(response => {
            if(response.status === 200){
                dispatch(setAuthUserData(
                    response.data.id,
                    response.data.username,
                    response.data.email,
                    {
                        name: response.data.name,
                        surname: response.data.surname,
                        patronymic: response.data.patronymic,
                        group: response.data.group
                    },
                    true,
                    response.data.is_teacher
                ));
            }
        });
}

export const login = (login, password) => (dispatch) =>{
    authAPI.login(login, password)
        .then(response => {
            console.log(response)
            localStorage.setItem("token", response.data.token);
            dispatch(getAuthUserData())
        }).catch( (error) => {
        if(error.response.data.detail) {
            let message = error.response.data.detail[0].length > 0 ? error.response.data.detail[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message}));
        } else{
            let message = error.response.data.error.length > 0 ? error.response.data.error : "Some error";
            dispatch(stopSubmit("login", {_error: message}));
        }
    })
}

export const logout = () => (dispatch) =>{
    authAPI.logout()
        .then(response => {
            if(response.status === 204) {
                localStorage.removeItem("token");
                dispatch(setAuthUserData(null, null,null, null, false))
            }
        });
}

export default authReducer;