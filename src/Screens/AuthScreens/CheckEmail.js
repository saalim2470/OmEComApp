import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import commonStyle from "../../Constants/commonStyle";
import Header from "../../Components/Header";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import images from "../../Constants/images";
import CustomeButton from "../../Components/CustomeButton";

const CheckEmail = () => {
  return (
    <SafeAreaView
      style={[commonStyle.container, { justifyContent: "space-between" }]}
    >
      <Header isCloseIcon={true} />
      <View style={styles.centerBox}>
        <Image source={images.sendColorIcon} style={styles.img} />
        <Text style={commonStyle.headingTxt}>Check your email</Text>
        <Text style={styles.subTxt}>
          We've sent you instructions on how to reset the password (also check
          the Spam folder)
        </Text>
      </View>
      <CustomeButton
        title={"Go to Email"}
        style={{
          marginHorizontal: moderateScale(20),
          marginBottom: moderateVerticalScale(25),
        }}
      />
    </SafeAreaView>
  );
};

export default CheckEmail;

const styles = StyleSheet.create({
  subTxt: {
    marginTop: verticalScale(6),
    marginBottom: verticalScale(15),
    fontSize: scale(11),
    lineHeight: 20,
    textAlign: "center",
    fontFamily: "Montserrat-Light",
  },
  centerBox: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: moderateScale(20),
  },
  img: {
    width: scale(70),
    height: scale(70),
    marginBottom: moderateVerticalScale(10),
  },
});
