import axios from "axios";
import { LOGIN_STATUS } from "../store/action-types";
import store from "../store/store";

export const login = (params) => {
    return axios.post(process.env.LOGIN_API, params);
}

export const signup = (params) => {
    return axios.put(process.env.SIGNUP_API, params);
}
