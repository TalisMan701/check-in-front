import * as axios from "axios";

const instanceWithToken = () => axios.create({
    withCredentials: true,
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
        "Authorization": "Token "+localStorage.getItem("token")
    }
});

const instance = () => axios.create({
    withCredentials: true,
    baseURL: "http://127.0.0.1:8000/api/",
});

export const authAPI = {
    me() {
        return instanceWithToken().get(`auth/login/me/`);
    },
    login(username,password){
        return instance().post(`auth/login/`, {username, password});
    },
    logout(){
        return instanceWithToken().post(`auth/logout/`);
    }
}

export const registrationAPI = {
    registration(username, email, userInfo, password) {
        return instance().post(`auth/registration/me/`, {username, email, userInfo, password})
    }
}
