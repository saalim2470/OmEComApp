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
import {
  baseURL,
  defaultProfileImg,
  serverImagePath,
} from "../../Constants/defaults";
import screenName from "../../Constants/screenName";
import { useNavigation } from "@react-navigation/native";
import ImageViewer from "../ImageViewer";
import { onShare } from "../../Constants/Constant";

const ProfileScreenTopView = ({ profileData, isEditBtn, totalPost }) => {
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
            <Text style={styles.boldTxt}>{totalPost}</Text> posts
          </Text>
          <Text style={[styles.txt, { marginRight: moderateScale(20) }]}>
            <Text style={styles.boldTxt}>00</Text> followers
          </Text>
          <Text style={styles.txt}>
            <Text style={styles.boldTxt}>00</Text> following
          </Text>
        </View>
        {isEditBtn ? (
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              style={styles.editBtn}
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate(screenName.editProfile);
              }}
            >
              <Text style={styles.editBtnTxt}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editBtn}
              activeOpacity={0.6}
              onPress={() => {
                onShare();
              }}
            >
              <Text style={styles.editBtnTxt}>Share Profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.btnWrapper}>
            <TouchableOpacity style={styles.editBtn} activeOpacity={0.6}>
              <Text style={styles.editBtnTxt}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editBtn}
              activeOpacity={0.6}
              onPress={() => {}}
            >
              <Text style={styles.editBtnTxt}>Message</Text>
            </TouchableOpacity>
          </View>
        )}
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
    fontFamily: "Montserrat-Regular",
    fontSize: scale(14),
  },
  boldTxt: {
    fontSize: moderateScale(15),
    fontFamily: "Montserrat-Bold",
  },
  editIcon: {
    width: scale(18),
    height: scale(18),
    // tintColor: "#FFFFFF",
    marginRight: moderateScale(5),
  },
  btn: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(5),
  },
  btnTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: moderateScale(12),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  followView: {
    marginTop: verticalScale(15),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  editBtn: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lightgrey",
    padding: moderateScale(8),
    borderRadius: moderateScale(3),
  },
  btnWrapper: {
    flexDirection: "row",
    marginTop: verticalScale(15),
    alignItems: "center",
    gap: moderateScale(30),
  },
  editBtnTxt: {
    fontSize: scale(12),
    fontWeight: "600",
  },
});
