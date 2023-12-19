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
import { Divider } from "react-native-paper";
import {
  addAdContentApi,
  reseAdPosttData,
} from "../../store/AdContentSlices/AddAdContent";
import {
  resetData,
  setPostDataDraft,
} from "../../store/addAdContentSlices/AddPostData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import screenName from "../../Constants/screenName";
import CustomeAlertModal from "../../Components/CustomeAlertModal";

const PostData = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { categoryId } = route.params;
  const formData = new FormData();
  const addPostData = useSelector((state) => state.addAdContentData);
  console.log("-=-=add post data-==-=", addPostData);
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [cameraStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();

  useEffect(() => {
    if (addPostData?.addContentData?.Success) {
      setShowAlert({
        show: true,
        title: "Success",
        msg: "Ad Content Added Successfully",
        type: "success",
      });
    }
  }, [addPostData?.addContentData]);
  useEffect(() => {
    if (addPostData?.errorCode != null && addPostData?.errorCode == 403) {
      navigation.navigate(screenName.drawerNavigation, {
        screen: screenName.subscription,
        params: { formData },
      });
    }
    if (addPostData?.errorCode != null && addPostData?.errorCode == 401) {
      setShowAlert({
        show: true,
        title: "UnAuthorized",
        msg: "Please login to continue",
        type: "warning",
      });
    }
    if (addPostData?.errorCode != null && addPostData?.error != null) {
      setShowAlert({
        show: true,
        title: "Error",
        msg: `Some Error Occured`,
        type: "error",
      });
    }
  }, [addPostData.errorCode, addPostData?.error]);
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
  const onClickBtn = () => {
    image.forEach((element, index) => {
      const uriParts = element.uri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      formData.append("files", {
        uri: element.uri,
        name: `image_${index}.${fileType}`,
        type: `image/${fileType}`,
      });
    });
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    dispatch(setPostDataDraft(formData));
    dispatch(addAdContentApi(formData));
    // navigation.navigate(screenName.drawerNavigation, {
    //   screen: screenName.subscription,
    // });
  };
  const onClickModalBtn = () => {
    setShowAlert({ ...showAlert, show: false });
    dispatch(resetData());
    dispatch(reseAdPosttData());
    showAlert.type == "success" &&
      navigation.navigate(screenName.drawerNavigation, {
        screen: screenName.bottomNavigation,
        params: {
          screen: screenName.mainHome,
        },
      });
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
            isLoading={addPostData?.isLoading}
            disabled={!description ? true : false}
            title={"Post"}
            onClick={() => {
              onClickBtn();
            }}
          />
        </View>
        <Divider bold />
        <UserHeader />
        <PostScreenTextView
          imageData={image}
          disabled={addPostData?.isLoading}
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
      <CustomeAlertModal
        isVisible={showAlert.show}
        title={showAlert.title}
        msg={showAlert.msg}
        type={showAlert.type}
        onClickBtn={() => {
          onClickModalBtn();
        }}
      />
    </SafeAreaProvider>
  );
};

export default PostData;

const styles = StyleSheet.create({
  headerView: {
    // borderBottomWidth: 0.5,
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
