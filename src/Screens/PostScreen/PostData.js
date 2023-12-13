import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import CustomeButton from "../../Components/CustomeButton";
import { Ionicons, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import UserHeader from "../../Components/PostScreenComponent/UserHeader";
import IconButton from "../../Components/PostScreenComponent/IconButton";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import PostScreenTextView from "../../Components/PostScreenComponent/PostScreenTextView";
import EmojiComponent from "../../Components/EmojiComponent";

const PostData = () => {
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [cameraStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage([...image, result.assets[0]]);
    }
  };
  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage([...image, result.assets[0]]);
    }
  };
  const onClickRemove = (index1) => {
    const tempData = [...image];
    const data = tempData.filter((element, index) => index != index1);
    setImage(data);
  };
  const checkLibrarayPermission = async () => {
    const { status: currentStatus } =
      await ImagePicker.getMediaLibraryPermissionsAsync();
    if (currentStatus !== "granted") {
      requestPermission();
    } else if (currentStatus == "granted") {
      openImagePicker();
    }
  };
  const checkCameraPermission = async () => {
    const { status: currentStatus } =
      await ImagePicker.getCameraPermissionsAsync();
    if (currentStatus !== "granted") {
      requestCameraPermission();
    } else if (currentStatus == "granted") {
      openCamera();
    }
  };
  return (
    <SafeAreaProvider style={commonStyle.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.headerView}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="arrow-back-outline"
              size={scale(25)}
              color="black"
            />
            <Text style={styles.headerTxt}>Create post</Text>
          </View>
          <CustomeButton
            style={{
              width: scale(50),
              borderRadius: scale(5),
              marginVertical: moderateScale(0),
            }}
            title={"Post"}
          />
        </View>
        <UserHeader />
        <PostScreenTextView
          imageData={image}
          value={description}
          removeImage={(index) => {
            onClickRemove(index);
          }}
          onChange={(text) => {
            setDescription(text);
          }}
        />
      </View>
      {/* <BottomComponent /> */}
      <View style={styles.boxView}>
        <IconButton
          name={"ios-images"}
          color={"green"}
          onclick={() => {
            checkLibrarayPermission();
          }}
        />
        <IconButton
          name={"ios-camera"}
          color={"#ed840c"}
          onclick={() => {
            checkCameraPermission();
          }}
        />
        <Pressable
          onPress={() => {
            setShowEmoji(true);
          }}
        >
          <Entypo name="emoji-happy" size={scale(23)} color="#e3bf3d" />
        </Pressable>
        <IconButton name={"ios-location-sharp"} color={"#ed480c"} />
        <Pressable style={styles.circle}>
          <SimpleLineIcons name="options" size={scale(20)} color="white" />
        </Pressable>
      </View>
      <EmojiComponent
        show={showEmoji}
        onBackdropPress={() => {
          setShowEmoji(false);
        }}
        onClick={(emoji) => {
          setDescription(`${description} ${emoji}`);
          setShowEmoji(false);
        }}
      />
    </SafeAreaProvider>
  );
};

export default PostData;

const styles = StyleSheet.create({
  headerView: {
    borderBottomWidth: 0.5,
    marginTop: verticalScale(30),
    paddingHorizontal: moderateScale(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(5),
  },
  headerTxt: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(15),
    marginLeft: moderateScale(4),
  },
  boxView: {
    borderWidth: 0.2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: scale(7),
    backgroundColor: "white",
  },
  circle: {
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: "#363230",
    padding: scale(3),
  },
});
