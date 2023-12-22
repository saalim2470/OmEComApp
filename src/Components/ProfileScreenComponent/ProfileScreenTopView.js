import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar, Divider } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../../Constants/colors";
import images from "../../Constants/images";
import { useSelector } from "react-redux";
import { baseURL, serverImagePath } from "../../Constants/defaults";

const ProfileScreenTopView = () => {
  const userDetail = useSelector((state) => state.login?.userDetail);
  return (
    <>
      <View
        style={{
          marginHorizontal: moderateScale(15),
          marginTop: verticalScale(10),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar.Image
            size={scale(60)}
            style={{ marginRight: moderateScale(8) }}
            source={{
              uri: `${baseURL}${serverImagePath}/${userDetail?.profilePicture}`,
            }}
          />
          <View>
            <Text
              style={styles.titleTxt}
            >{`${userDetail?.firstName} ${userDetail?.lastName}`}</Text>
            <Text style={styles.lightTxt}>{userDetail?.email}</Text>
            {/* <Text style={styles.lightTxt}>Other</Text> */}
          </View>
        </View>
        <View
          style={[
            {
              marginTop: verticalScale(15),
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: moderateScale(20),
            }}
          >
            <Image
              source={images.reviewStar}
              style={{
                width: scale(15),
                height: scale(15),
                marginRight: moderateScale(7),
              }}
            />
            <Text style={styles.lightTxt}>4.8 (20 Reviews)</Text>
          </View>
          <Text style={[styles.txt, { marginRight: moderateScale(20) }]}>
            <Text style={styles.boldTxt}>00</Text> followers
          </Text>
          <Text style={styles.txt}>
            <Text style={styles.boldTxt}>00</Text> following
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: verticalScale(15) }}>
          <TouchableOpacity
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
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor: "#f5f5f5",
              },
            ]}
          >
            <Text style={[styles.btnTxt]}>40 Listings</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider style={{ marginVertical: verticalScale(15) }} />
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
});
