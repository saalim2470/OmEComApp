import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { accessToken } from "./src/Constants/defaults";
import { hostUrl } from "./src/Constants/Constant";
import { Alert } from "react-native";

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
},(error) => {
  return Promise.reject(error);
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

httpFile.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  async (error) => {
    // Handle error response
    if (error.response && error.response.status === 401) {
      // Unauthorized access - maybe token expired
      await AsyncStorage.removeItem(accessToken);
      // Alert.alert("Session expired", "Please log in again.");
      // Optionally, navigate the user to the login screen
      // navigation.navigate("Login"); // assuming you have navigation setup
    }
    // Show error alert
    // Alert.alert("Error", error.response?.data?.message || "An error occurred");
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  async (error) => {
    // Handle error response
    if (error.response && error.response.status === 401) {
      // Unauthorized access - maybe token expired
      await AsyncStorage.removeItem(accessToken);
      // Alert.alert("Session expired", "Please log in again.");
      // Optionally, navigate the user to the login screen
      // navigation.navigate("Login"); // assuming you have navigation setup
    }
    // Show error alert
    // Alert.alert("Error", error.response?.data?.message || "An error occurred");
    return Promise.reject(error);
  }
);
