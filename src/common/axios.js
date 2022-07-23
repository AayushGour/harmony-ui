import { setLoggedIn } from "../components/store/action";
import store from "../components/store/store";

const { default: axios } = require("axios");

const BASE_URL = process.env.BASE_URL
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

axios.interceptors.request.use((config) => {
    return config;

}, (error) => {
    console.error(error);
    return Promise.reject(error);
})

const refreshToken = async () => {
    let refreshToken = localStorage.getItem("refreshToken")
    return axios.get("/refreshToken", {
        headers: {
            "Authorization": `Bearer ${refreshToken}`
        }
    })
}

axios.interceptors.response.use((response) => {
    if (response?.config.url === "/login" || response.config.url === "/refreshToken") {
        axios.defaults.headers.common["Authorization"] = `Bearer ${response?.data?.token}`;
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("refreshToken", response?.data?.refreshToken);
    }
    return response;
}, async (error) => {
    const originalRequest = error?.config;
    if (error?.response?.status === 403 && error?.response?.data === "Token Expired") {
        const freshTokens = await refreshToken();
        originalRequest.headers = {
            "Authorization": `Bearer ${freshTokens?.data?.token}`
        }
        return axios(originalRequest);
    } else if (error?.response?.status === 403 && error?.response?.data === "Logout") {
        store.dispatch(setLoggedIn(false));
        console.log("Logout")
        console.error(error);
        return Promise.reject(error);
    } else {
        console.error(error);
        return Promise.reject(error);
    }
})
export default axios;