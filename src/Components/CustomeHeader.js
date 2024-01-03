import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import images from "../Constants/images";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";

const CustomeHeader = ({
  onClickNavigate,
  title,
  isBackBtn,
  msgUserHeader,
  isRightIcon,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.headerStyle]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {isBackBtn ? (
          <TouchableOpacity
            activeOpacity={0.6}
            style={{ marginRight: moderateScale(2) }}
            onPress={() => {
              onClickNavigate
                ? navigation.navigate(onClickNavigate)
                : navigation.goBack();
            }}
          >
            <Image
              source={images.back_Icon}
              resizeMode="contain"
              style={{ width: scale(22), height: scale(22) }}
            />
          </TouchableOpacity>
        ) : null}

        {title ? (
          <Text style={{ fontFamily: "Montserrat-Bold", fontSize: scale(15) }}>
            {title}
          </Text>
        ) : null}
        {msgUserHeader ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar.Image
              size={scale(40)}
              style={{ marginRight: moderateScale(8) }}
              source={{
                uri: "https://pbs.twimg.com/profile_images/685700874434314240/80T5j3HF_400x400.jpg",
              }}
            />
            <View>
              <Text style={styles.titleTxt}>Albert Flores</Text>
              <Text style={styles.lightTxt}>Online</Text>
            </View>
          </View>
        ) : null}
      </View>
      {isRightIcon ? <Image source={images.optionIcon} /> : null}
    </View>
  );
};

export default CustomeHeader;

const styles = StyleSheet.create({
  headerStyle: {
    height: verticalScale(44),
    // marginTop: verticalScale(30),
    paddingHorizontal: moderateScale(17),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: moderateScale(13),
  },
  titleTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: scale(10.5),
    lineHeight: 18,
  },
  lightTxt: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(9),
    lineHeight: 20,
  },
});
