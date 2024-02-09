import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { accessToken } from "./src/Constants/defaults";

export const http = axios.create({
  baseURL: "https://suryahealthclub.com:8585/api",
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
  baseURL: "https://suryahealthclub.com:8585/api",
  // baseURL: "http://192.168.1.7/api/",
});
httpFile.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(accessToken);
  if (token) {
    config.headers["Authorization"] = `Bearer ${token.split('"')[1]}`;
  }
  config.headers["Content-Type"] = "multipart/form-data";
  return config;
});
