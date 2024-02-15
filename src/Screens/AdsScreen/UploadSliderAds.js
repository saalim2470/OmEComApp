import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import HeaderWithButton from "../../Components/HeaderWithButton";
import CustomeButton from "../../Components/CustomeButton";
import * as ImagePicker from "expo-image-picker";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import screenName from "../../Constants/screenName";
import SelectButton from "../../Components/SelectButton";
import RbBottomSheet from "../../Components/BottomSheet/RbBottomSheet";
import { subcriptionType } from "../../Constants/Constant";
import { setPostDataDraft } from "../../store/addAdContentSlices/AddPostData";
import { useDispatch } from "react-redux";
import CardSlider from "../../Components/HomeScreenComponent/CardSlider";

const screenHeight = Dimensions.get("screen").height / 2;
const UploadSliderAds = ({ title }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const formData = new FormData();
  const defaultAdImg = [
    "https://img.global.news.samsung.com/in/wp-content/uploads/2023/05/15872_SBS-PR-Banner_3000X2000-e1683884137336.jpg",
    "https://i.pinimg.com/736x/b7/45/a7/b745a78bece41d7ff78420a11641970a.jpg",
    "https://cdn.dribbble.com/users/5799567/screenshots/14095208/media/f3fa8ff3516ebb164b659431af01a40b.jpg?resize=400x300&vertical=center",
  ];
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [image, setImage] = useState([]);
  const [uploadImage, setUploadImage] = useState();
  const [openSheet, setOpenSheet] = useState(false);
  const [selectAdsBtn, setSelectAdBtn] = useState();

  const checkLibrarayPermission = async () => {
    const { status: currentStatus } =
      await ImagePicker.getMediaLibraryPermissionsAsync();
    if (currentStatus !== "granted") {
      requestPermission();
    } else if (currentStatus == "granted") {
      openImagePicker();
    }
  };
  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage([result.assets[0].uri]);
      setUploadImage(result.assets[0]);
    }
  };
  const onClickUpload = () => {
    const uriParts = uploadImage.uri.split(".");
    const fileType = uriParts[uriParts.length - 1];
    formData.append("Files", {
      uri: uploadImage.uri,
      name: `image_.${fileType}`,
      type: `image/${fileType}`,
    });
    formData.append("SubscriptionType", selectAdsBtn === 1 ? 2 : 7);
    dispatch(setPostDataDraft(formData));
    navigation.navigate(screenName.drawerNavigation, {
      screen: screenName.subscription,
      params: {
        adsType: selectAdsBtn === 1 ? subcriptionType[2] : subcriptionType[4],
      },
    });
  };
  return (
    <View>
      <HeaderWithButton
        title={title}
        onClick={() => {
          setOpenSheet(true);
        }}
        style={{ marginBottom: verticalScale(8) }}
      />

      <CardSlider
        data={defaultAdImg.concat(image).reverse()}
        isLocalData={true}
      />
      <CustomeButton
        title={"Upload"}
        disabled={image.length !== 0 ? false : true}
        onClick={() => {
          onClickUpload();
        }}
        style={{ marginHorizontal: moderateScale(10) }}
      />
      <RbBottomSheet
        isOpen={openSheet}
        height={screenHeight}
        setIsOpen={setOpenSheet}
        children={
          <SelectButton
            btnData={[
              {
                id: 1,
                title: "Home Page",
              },
              {
                id: 2,
                title: "Search Page",
              },
            ]}
            title={"Where you want to post your ads?"}
            value={selectAdsBtn}
            onClickBtn={(id) => {
              setSelectAdBtn(id);
            }}
            onClickNextBtn={() => {
              setOpenSheet(false);
              checkLibrarayPermission();
            }}
          />
        }
      />
    </View>
  );
};

export default UploadSliderAds;

const styles = StyleSheet.create({});
