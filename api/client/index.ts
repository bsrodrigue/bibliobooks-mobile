import * as axios from "axios";
import Constants from "expo-constants";
const { API_URL } = Constants.expoConfig.extra;

axios.default.defaults.baseURL = API_URL

axios.default.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error?.response?.data || error);
});
const client = axios.default;

export default client;