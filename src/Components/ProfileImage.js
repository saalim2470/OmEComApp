import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import {
  baseURL,
  defaultProfileImg,
  serverImagePath,
} from "../Constants/defaults";

const ProfileImage = ({ url, size ,style}) => {
  return (
    <>
      {url !== null ? (
        <Avatar.Image
          source={{
            uri: `${baseURL}${serverImagePath}/${url}`,
          }}
          style={style}
          size={size}
        />
      ) : (
        <Avatar.Image
          source={{
            uri: defaultProfileImg,
          }}
          style={style}
          size={size}
        />
      )}
    </>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({});
