import * as axios from "axios";
import Constants from "expo-constants";
const { API_URL } = Constants.expoConfig.extra;

axios.default.defaults.baseURL = API_URL


const client = axios.default;

export default client;