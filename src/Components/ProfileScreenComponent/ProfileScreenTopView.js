import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Avatar, Divider } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../../Constants/colors";
import images from "../../Constants/images";
import { useSelector } from "react-redux";
import {
  baseURL,
  defaultProfileImg,
  serverImagePath,
} from "../../Constants/defaults";
import screenName from "../../Constants/screenName";
import { useNavigation } from "@react-navigation/native";
import ImageViewer from "../ImageViewer";

const ProfileScreenTopView = ({ profileData, isEditBtn }) => {
  const navigation = useNavigation();
  const [openImageViewer, setImageViewer] = useState(false);
  const imgViewerData = [
    {
      uri:
        profileData?.profilePicture != null || profileData?.profilePicture != ""
          ? `${baseURL}${serverImagePath}/${profileData?.profilePicture}`
          : defaultProfileImg,
    },
  ];
  return (
    <>
      <View
        style={{
          marginHorizontal: moderateScale(15),
          marginTop: verticalScale(10),
        }}
      >
        <View style={styles.row}>
          <Pressable onPress={() => setImageViewer(true)}>
            <Avatar.Image
              size={scale(60)}
              style={{ marginRight: moderateScale(8) }}
              source={{
                uri: `${baseURL}${serverImagePath}/${profileData?.profilePicture}`,
              }}
            />
          </Pressable>
          <View>
            <Text
              style={styles.titleTxt}
            >{`${profileData?.firstName} ${profileData?.lastName}`}</Text>
            <Text style={styles.lightTxt}>{profileData?.email}</Text>
          </View>
        </View>
        <View style={styles.followView}>
          <Text style={[styles.txt, { marginRight: moderateScale(20) }]}>
            <Text style={styles.boldTxt}>00</Text> followers
          </Text>
          <Text style={styles.txt}>
            <Text style={styles.boldTxt}>00</Text> following
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: verticalScale(15) }}>
          {isEditBtn ? (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate(screenName.editProfile);
              }}
              style={[
                styles.btn,
                {
                  flexDirection: "row",
                  backgroundColor: colors.selectedColor,
                  alignItems: "center",
                  marginRight: moderateScale(10),
                },
              ]}
            >
              <Image source={images.editIcon} style={styles.editIcon} />
              <Text
                style={[
                  styles.btnTxt,
                  {
                    color: "#FFFFFF",
                  },
                ]}
              >
                Edit
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                styles.btn,
                {
                  backgroundColor: "#f5f5f5",
                },
              ]}
            >
              <Text style={[styles.btnTxt]}>Follow</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Divider style={{ marginVertical: verticalScale(15) }} />
      <ImageViewer
        visible={openImageViewer}
        setIsVisible={setImageViewer}
        imgData={imgViewerData}
      />
    </>
  );
};

export default ProfileScreenTopView;

const styles = StyleSheet.create({
  titleTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: scale(15),
    lineHeight: 20,
  },
  lightTxt: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(9),
    lineHeight: 20,
  },
  txt: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(11),
  },
  boldTxt: {
    fontSize: moderateScale(15),
    fontFamily: "Montserrat-Bold",
  },
  editIcon: {
    width: scale(15),
    height: scale(15),
    tintColor: "#FFFFFF",
    marginRight: moderateScale(5),
  },
  btn: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(3),
  },
  btnTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: moderateScale(10),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  followView: {
    marginTop: verticalScale(15),
    flexDirection: "row",
    alignItems: "center",
  },
});
