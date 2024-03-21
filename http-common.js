import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { accessToken } from "./src/Constants/defaults";
import { hostUrl } from "./src/Constants/Constant";

export const http = axios.create({
  baseURL: hostUrl,
});

http.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(accessToken);
  if (token) {
    config.headers["Authorization"] = `Bearer ${token.split('"')[1]}`;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});

// for file uploader
export const httpFile = axios.create({
  baseURL: hostUrl,
});
httpFile.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(accessToken);
  if (token) {
    config.headers["Authorization"] = `Bearer ${token.split('"')[1]}`;
  }
  config.headers["Content-Type"] = "multipart/form-data";
  return config;
});
