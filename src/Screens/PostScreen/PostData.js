import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
import BottomComponent from "../../Components/PostScreenComponent/BottomComponent";
import { baseURL, serverImagePath } from "../../Constants/defaults";
import { imageurl } from "../../Constants/functions";
import {
  resetUpdateAdContent,
  updateAdContentApi,
} from "../../store/AdContentSlices/UpdateAdContent";
import { setCategoryId } from "../../store/StoreDataSlice";
import PostScreenHeader from "../../Components/PostScreenComponent/PostScreenHeader";

const PostData = ({ navigation, route }) => {
  console.log("-=-=route-=-", route);
  const dispatch = useDispatch();
  const formData = new FormData();
  const categoryId = useSelector((state) => state.storeData.categoryId);
  const addPostData = useSelector((state) => state.addAdContentData);
  const updatePostData = useSelector((state) => state.updateAdContentData);
  console.log("-=-=-=update Data-=-=", updatePostData);
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [btnTxt, setBtnTxt] = useState("Post");
  const [screenTitle, setScreenTitle] = useState("Create post");
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
    if (route?.params != null) {
      setDescription(route?.params?.editData?.description);
      setImage(imageurl(route?.params?.editData?.imagesData));
      setBtnTxt("Update");
      setScreenTitle("Update post");
    }
  }, [route?.params]);

  useEffect(() => {
    if (addPostData?.addContentData?.Success) {
      setShowAlert({
        show: true,
        title: "Success",
        msg: "Ad Content Added Successfully",
        type: "success",
      });
      // dispatch(setPostDataDraft(null));
    }
    if (updatePostData?.updateContentData?.Success) {
      setShowAlert({
        show: true,
        title: "Success",
        msg: "Ad Content Updated Successfully",
        type: "success",
      });
      // dispatch(setPostDataDraft(null));
    }
  }, [addPostData?.addContentData, updatePostData?.updateContentData]);

  useEffect(() => {
    const { errorCode, error } = addPostData;
    const { errorCode: updateErrorCode, error: updateError } = updatePostData;

    const handleErrorCode = (code) => {
      if (code === 403) {
        navigation.navigate(screenName.drawerNavigation, {
          screen: screenName.subscription,
          params: { formData },
        });
      } else if (code === 401) {
        setShowAlert({
          show: true,
          title: "UnAuthorized",
          msg: "Please login to continue",
          type: "warning",
        });
      } else if (error != null || updateError != null) {
        setShowAlert({
          show: true,
          title: "Error",
          msg: "Some Error Occurred",
          type: "error",
        });
      }
    };

    handleErrorCode(errorCode);
    handleErrorCode(updateErrorCode);
  }, [
    addPostData.errorCode,
    addPostData?.error,
    updatePostData.errorCode,
    updatePostData?.error,
  ]);
  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage([...image, result.assets[0].uri]);
    }
  };
  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage([...image, result.assets[0].uri]);
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
      const uriParts = element.split(".");
      const fileType = uriParts[uriParts.length - 1];
      formData.append("files", {
        uri: element,
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
  const onClickUpdate = () => {
    image.forEach((element, index) => {
      const uriParts = element.split(".");
      const fileType = uriParts[uriParts.length - 1];
      formData.append("files", {
        uri: element,
        name: `image_${index}.${fileType}`,
        type: `image/${fileType}`,
      });
    });
    formData.append("description", description);
    formData.append("categoryId", route?.params?.editData?.categoryId);
    formData.append("id", route?.params?.editData?.id);
    dispatch(setPostDataDraft(formData));
    dispatch(setCategoryId(route?.params?.editData?.categoryId));
    dispatch(updateAdContentApi(formData));
  };
  const onClickModalBtn = () => {
    setShowAlert({ ...showAlert, show: false });
    dispatch(resetData());
    dispatch(reseAdPosttData());
    dispatch(resetUpdateAdContent());
    showAlert.type == "success" &&
      navigation.navigate(screenName.drawerNavigation, {
        screen: screenName.bottomNavigation,
        params: {
          screen: screenName.bottomNavigationHomeRoute,
          params: {
            screen: screenName.mainHome,
          },
        },
      });
  };
  return (
    <SafeAreaProvider style={commonStyle.container}>
      <View style={{ flex: 1 }}>
        <PostScreenHeader
          btnTxt={btnTxt}
          screenTitle={screenTitle}
          loading={addPostData?.isLoading || updatePostData?.isLoading}
          disabled={!description ? true : false}
          onClick={() => {
            route?.params != null ? onClickUpdate() : onClickBtn();
          }}
        />
        <Divider bold />
        <UserHeader />
        <PostScreenTextView
          imageData={image}
          disabled={addPostData?.isLoading || updatePostData?.isLoading}
          value={description}
          removeImage={(index) => {
            onClickRemove(index);
          }}
          onChange={(text) => {
            setDescription(text);
          }}
        />
      </View>
      <BottomComponent
        onClickGallery={() => {
          checkLibrarayPermission();
        }}
        onClickCamera={() => {
          checkCameraPermission();
        }}
        onClickEmoji={() => {
          setShowEmoji(true);
        }}
        onClickLocation={() => {}}
      />
      <EmojiComponent
        show={showEmoji}
        onBackdropPress={() => {
          setShowEmoji(false);
        }}
        onClick={(emoji) => {
          setDescription(`${description} ${emoji}`);
          // setShowEmoji(false);
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
