import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import HeaderWithButton from "../../Components/HeaderWithButton";
import BannerSlider from "../../Components/HomeScreenComponent/BannerSlider";
import CustomeButton from "../../Components/CustomeButton";
import * as ImagePicker from "expo-image-picker";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import images from "../../Constants/images";
import { useNavigation } from "@react-navigation/native";
import { baseURL, serverImagePath } from "../../Constants/defaults";

const UploadBannerAds = ({ title }) => {
  const navigation = useNavigation();
  const defaultAdImg = [
    "https://img.global.news.samsung.com/in/wp-content/uploads/2023/05/15872_SBS-PR-Banner_3000X2000-e1683884137336.jpg",
    "https://i.pinimg.com/736x/b7/45/a7/b745a78bece41d7ff78420a11641970a.jpg",
    "https://cdn.dribbble.com/users/5799567/screenshots/14095208/media/f3fa8ff3516ebb164b659431af01a40b.jpg?resize=400x300&vertical=center",
  ];
  // const defaultAdImg = [`${baseURL}${serverImagePath}/Default-banner.png`];
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [image, setImage] = useState([]);

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
    }
  };
  return (
    <View>
      <HeaderWithButton
        title={title}
        onClick={() => {
          checkLibrarayPermission();
        }}
        style={{ marginBottom: verticalScale(8) }}
      />
      <BannerSlider
        data={defaultAdImg.concat(image).reverse()}
        onClick={(index) => {}}
      />
      <CustomeButton
        title={"Upload"}
        onClick={() => {
          navigation.navigate(screenName.drawerNavigation, {
            screen: screenName.subscription,
            params: {
              adsType: "homePage",
            },
          });
        }}
        style={{ marginHorizontal: moderateScale(10) }}
      />
    </View>
  );
};

export default UploadBannerAds;

const styles = StyleSheet.create({});
