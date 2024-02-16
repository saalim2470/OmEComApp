import { StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import UserHeader from "../../Components/PostScreenComponent/UserHeader";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import PostScreenTextView from "../../Components/PostScreenComponent/PostScreenTextView";
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
import { imageurl } from "../../Constants/functions";
import { setCategoryId } from "../../store/StoreDataSlice";
import PostScreenHeader from "../../Components/PostScreenComponent/PostScreenHeader";
import EmojiPicker from "rn-emoji-keyboard";
import RbBottomSheet from "../../Components/BottomSheet/RbBottomSheet";
import * as Location from "expo-location";
import GpsSearch from "../../Components/GpsSearch";
import { getGpsDataApi } from "../../store/gpsSlice/GetGpsData";
import { subcriptionType } from "../../Constants/Constant";

const PostData = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const formData = new FormData();
  const categoryId = useSelector((state) => state.storeData.categoryId);
  const addPostData = useSelector((state) => state.addAdContentData);
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [emojiData, setEmojiData] = useState("");
  const [btnTxt, setBtnTxt] = useState("Post");
  const [screenTitle, setScreenTitle] = useState("Create post");
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  const [openSheet, setOpenSheet] = useState(false);
  const [location, setLocation] = useState(null);
  const [selectLocation, setSelectLocation] = useState(null);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [cameraStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();

  useEffect(() => {
    if (route?.params != null) {
      setDescription(route?.params?.editData?.description);
      setImage(imageurl(route?.params?.editData?.imagesData));
      dispatch(setCategoryId(route?.params?.editData?.categoryId));
      setBtnTxt("Update");
      setScreenTitle("Update post");
      route?.params?.editData?.placeName !== null &&
        setSelectLocation({
          text: route?.params?.editData?.placeName,
          center: [route?.params?.editData?.lat, route?.params?.editData?.lon],
        });
    }
  }, [route?.params]);
  useEffect(() => {
    if (addPostData?.addContentData?.Success) {
      clearData();
      route?.params?.editData != null
        ? navigation.navigate(screenName.drawerNavigation, {
            screen: screenName.bottomNavigation,
            params: {
              screen: screenName.profileRoute,
              params: {
                screen: screenName.profile,
              },
            },
          })
        : navigation.navigate(screenName.drawerNavigation, {
            screen: screenName.bottomNavigation,
            params: {
              screen: screenName.bottomNavigationHomeRoute,
              params: {
                screen: screenName.mainHome,
              },
            },
          });
    }
  }, [addPostData?.addContentData]);

  useEffect(() => {
    if (addPostData?.error !== null) {
      const { errorCode, error } = addPostData;

      const handleErrorCode = (code) => {
        if (code === 403) {
          navigation.navigate(screenName.drawerNavigation, {
            screen: screenName.subscription,
            params: {
              adsType: subcriptionType[0],
            },
          });
        } else if (code === 401) {
          setShowAlert({
            show: true,
            title: "UnAuthorized",
            msg: "Please login to continue",
            type: "warning",
          });
        } else if (error != null) {
          setShowAlert({
            show: true,
            title: "Error",
            msg: addPostData?.error?.ErrorMessage,
            type: "error",
          });
        }
      };

      handleErrorCode(errorCode);
    }
  }, [addPostData.errorCode, addPostData?.error]);
  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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
  const checkLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    getLocation();
  };
  const getLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    dispatch(
      getGpsDataApi(
        `${location?.coords?.longitude},${location?.coords?.latitude}`
      )
    );

    setOpenSheet(true);
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
    if (route?.params !== null) {
      formData.append("id", route?.params?.editData?.id);
    }
    if (selectLocation !== null) {
      formData.append("Lat", parseInt(selectLocation?.center[0]));
      formData.append("Lon", parseInt(selectLocation?.center[1]));
      formData.append("PlaceName", selectLocation?.text);
    }
    dispatch(setPostDataDraft(formData));
    dispatch(addAdContentApi(formData));
  };
  // const onClickUpdate = () => {
  //   image.forEach((element, index) => {
  //     const uriParts = element.split(".");
  //     const fileType = uriParts[uriParts.length - 1];
  //     formData.append("files", {
  //       uri: element,
  //       name: `image_${index}.${fileType}`,
  //       type: `image/${fileType}`,
  //     });
  //   });
  //   formData.append("description", description);
  //   formData.append("categoryId", categoryId);
  //   if(route?.params!==null){
  //     formData.append("id", route?.params?.editData?.id);
  //   }

  //   if (selectLocation !== null) {
  //     formData.append("Lat", parseInt(selectLocation?.center[0]));
  //     formData.append("Lon", parseInt(selectLocation?.center[1]));
  //     formData.append("PlaceName", selectLocation?.text);
  //   }
  //   dispatch(setPostDataDraft(formData));
  //   dispatch(updateAdContentApi(formData));
  // };
  const onClickModalBtn = () => {
    setShowAlert({ ...showAlert, show: false });
    clearData();
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
  useEffect(() => {
    if (emojiData !== "") setDescription(`${description} ${emojiData}`);
  }, [emojiData]);

  const handlePick = (emojiObject) => {
    setEmojiData(emojiObject?.emoji);
  };
  const clearData = () => {
    dispatch(resetData());
    dispatch(reseAdPosttData());
    dispatch(resetUpdateAdContent());
  };
  return (
    <SafeAreaProvider style={commonStyle.container}>
      <View style={{ flex: 1 }}>
        <PostScreenHeader
          btnTxt={btnTxt}
          screenTitle={screenTitle}
          loading={addPostData?.isLoading}
          disabled={!description && image.length === 0 ? true : false}
          onClick={() => {
            onClickBtn();
          }}
        />
        <Divider bold />
        <UserHeader
          userLocation={selectLocation}
          onCLickHeaderLocation={() => {
            setSelectLocation(null);
          }}
        />
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
        onClickLocation={() => {
          checkLocationPermission();
        }}
      />
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={showEmoji}
        onClose={() => setShowEmoji(false)}
        expandable={false}
        categoryPosition="top"
      />
      {/* <EmojiComponent
        show={showEmoji}
        onBackdropPress={() => {
          setShowEmoji(false);
        }}
        onClick={(emoji) => {
          setDescription(`${description} ${emoji}`);
          // setShowEmoji(false);
        }}
      /> */}
      <RbBottomSheet
        isOpen={openSheet}
        height={verticalScale(600)}
        setIsOpen={setOpenSheet}
        children={
          <GpsSearch
            onClickLocationResult={(data) => {
              setSelectLocation(data);
              setOpenSheet(false);
            }}
          />
        }
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
