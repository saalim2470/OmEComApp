import { StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

const useLibraryPermissionHook = () => {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const checkLibrarayPermission = async () => {
    const { status: currentStatus } =
      await ImagePicker.getMediaLibraryPermissionsAsync();
    if (currentStatus !== "granted") {
      requestPermission();
    } else if (currentStatus == "granted") {
      return true;
    }
  };
  return { checkLibrarayPermission };
};

export default useLibraryPermissionHook;

const styles = StyleSheet.create({});
