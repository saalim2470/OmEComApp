import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { accessToken } from "./src/Constants/defaults";

export const http = axios.create({
  baseURL: "http://192.168.1.16/api",
});
http.interceptors.request.use(async (config) => {
  console.log(config);
  const token = await AsyncStorage.getItem(accessToken);
  if (token) {
    console.log(token);
    console.log(token.toString());
    config.headers["Authorization"] = `Bearer ${token.split('"')[1]}`;
  }
  config.headers["Content-Type"] = "application/json";
  console.log(config);
  return config;
});

// for file uploader
export const httpFile = axios.create({
  baseURL: "http://192.168.1.16/api",
});
httpFile.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(accessToken);
  console.log(token);
  if (token) {
    config.headers["Authorization"] = `Bearer ${token.split('"')[1]}`;
  }
  config.headers["Content-Type"] = "multipart/form-data";
  return config;
});
