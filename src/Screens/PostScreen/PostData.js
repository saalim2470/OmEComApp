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
import {
  bytesToMB,
  bytesToSize,
  errorCodes,
  subcriptionType,
} from "../../Constants/Constant";
import useErrorHook from "../../CustomeHooks/useErrorHook";
import { resetPage } from "../../store/AdContentSlices/GetAdContentSlice";
import * as FileSystem from "expo-file-system";
import Loading from "../../Components/Loading";

const PostData = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const formData = new FormData();
  const categoryId = useSelector((state) => state.storeData.categoryId);
  const addPostData = useSelector((state) => state.addAdContentData);
  const [image, setImage] = useState([]);
  const [imagePickerLoading, setImagePickerLoading] = useState(false);
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
    btnTxt: null,
  });
  const [openSheet, setOpenSheet] = useState(false);
  const [location, setLocation] = useState(null);
  const [selectLocation, setSelectLocation] = useState(null);

  useEffect(() => {
    if (route?.params != undefined) {
      setDescription(
        route?.params?.editData?.description === "null"
          ? ""
          : route?.params?.editData?.description
      );
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
      if (route?.params?.editData != null) {
        navigation.navigate(screenName.drawerNavigation, {
          screen: screenName.bottomNavigation,
          params: {
            screen: screenName.profileRoute,
            params: {
              screen: screenName.profile,
            },
          },
        });
      } else {
        dispatch(resetPage());
        dispatch(setCategoryId(0));
        navigation.navigate(screenName.drawerNavigation, {
          screen: screenName.bottomNavigation,
          params: {
            screen: screenName.bottomNavigationHomeRoute,
            params: {
              screen: screenName.mainHome,
            },
          },
        });
      }
    }
  }, [addPostData?.addContentData]);

  useEffect(() => {
    if (addPostData?.error !== null) {
      const { errorCode, error } = addPostData;

      const handleErrorCode = (code) => {
        if (code === 403) {
          dispatch(reseAdPosttData());
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
            msg: addPostData?.error?.ErrorMessage || errorCodes.default,
            type: "error",
          });
        }
      };

      handleErrorCode(errorCode);
    }
  }, [addPostData.errorCode, addPostData?.error]);
  const imageSetter = async (result) => {
    setImagePickerLoading(true);
    const info = await FileSystem.getInfoAsync(result.assets[0].uri);
    const fileSizeInMB = info.size / (1024 * 1024);
    if (result?.assets[0]?.type === "image") {
      if (fileSizeInMB > 5) {
        setImagePickerLoading(false);
        setShowAlert({
          show: true,
          title: "Validation",
          msg: "Image size exceeds 5 MB. Please select a smaller image.",
          type: "warning",
          btnTxt: "Ok",
        });
      } else {
        setImagePickerLoading(false);
        setImage([...image, result.assets[0].uri]);
      }
    } else if (result?.assets[0]?.type === "video") {
      if (fileSizeInMB > 20) {
        setImagePickerLoading(false);
        setShowAlert({
          show: true,
          title: "Validation",
          msg: "Video size exceeds 20 MB. Please select a smaller video.",
          type: "warning",
          btnTxt: "Ok",
        });
      } else {
        setImagePickerLoading(false);
        setImage([...image, result.assets[0].uri]);
      }
    }
  };
  const openImagePicker = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        allowsMultipleSelection:false
      });
      if (!result.canceled) {
        imageSetter(result);
      }
    } catch (error) {
      console.error("Error picking image:", error);
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
      imageSetter(result);
    }
  };
  const onClickRemove = (index1) => {
    const tempData = [...image];
    const data = tempData.filter((element, index) => index != index1);
    setImage(data);
  };
  const checkLibrarayPermission = async () => {
    let { status: currentStatus } =
      await ImagePicker.getMediaLibraryPermissionsAsync();
    if (currentStatus !== "granted") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      currentStatus = status;
    }
    if (currentStatus === "granted") {
      openImagePicker();
    } else {
      console.log("Permission to access media library was denied");
    }
  };
  const checkCameraPermission = async () => {
    let { status: currentStatus } =
      await ImagePicker.getCameraPermissionsAsync();
    if (currentStatus !== "granted") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      currentStatus = status;
    }
    if (currentStatus === "granted") {
      // requestCameraPermission();
      openCamera();
    } else {
      // openCamera();
      console.log("Permission to access media library was denied");
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
    if (route?.params !== undefined) {
      formData.append("id", route?.params?.editData?.id);
    }
    if (selectLocation !== null) {
      formData.append("Lat", parseInt(selectLocation?.center[0]));
      formData.append("Lon", parseInt(selectLocation?.center[1]));
      formData.append("PlaceName", selectLocation?.text);
    }
    dispatch(setPostDataDraft(formData));
    dispatch(addAdContentApi(formData, route?.params?.editData?.id));
  };
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
  };
  return (
    <SafeAreaProvider style={commonStyle.container}>
      <View style={{ flex: 1 }}>
        <PostScreenHeader
          btnTxt={btnTxt}
          screenTitle={screenTitle}
          loading={addPostData?.isLoading}
          disabled={
            (!description && image.length === 0) || imagePickerLoading
              ? true
              : false
          }
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
        {imagePickerLoading ? (
          <Loading />
        ) : (
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
        )}
      </View>
      {imagePickerLoading ? (
        <Loading />
      ) : (
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
      )}
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
        btnTxt={showAlert.btnTxt}
        onClickBtn={() => {
          onClickModalBtn();
        }}
      />
    </SafeAreaProvider>
  );
};

export default PostData;

const styles = StyleSheet.create({});
