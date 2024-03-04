import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import CustomeButton from "../../Components/CustomeButton";
import images from "../../Constants/images";
import colors from "../../Constants/colors";
import { contactUsMobileNo, omEmail } from "../../Constants/Constant";

const ContactUs = () => {
  const [value, setValue] = useState("");
  const mailSubject = "Thank you for choosing our app!";
  const onClickBtn = () => {
    Linking.openURL(`whatsapp://send?phone=${contactUsMobileNo}&text=${value}`);
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"Contact us"} />
      <View style={styles.wrapper}>
        <View style={{ borderWidth: 0.5, height: verticalScale(200) }}>
          <TextInput
            placeholder="About Something"
            multiline={true}
            value={value}
            textAlignVertical="top"
            style={styles.textInput}
            onChangeText={(text) => {
              setValue(text);
            }}
          />
        </View>
        <CustomeButton
          style={{
            paddingHorizontal: moderateScale(5),
            borderRadius: scale(5),
          }}
          title={"Send"}
          onClick={() => {
            onClickBtn();
          }}
        />
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.6}
          onPress={() => {
            Linking.openURL(`tel:${contactUsMobileNo}`);
          }}
        >
          <Image
            source={images.phoneIcon}
            style={styles.img}
            resizeMode="contain"
          />
          <Text style={styles.btnTxt}>{contactUsMobileNo}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.6}
          onPress={() => {
            Linking.openURL(
              `mailto:${omEmail}?subject=${mailSubject}&body=${value}`
            );
          }}
        >
          <Image
            source={images.gmailLogo}
            style={styles.img}
            resizeMode="contain"
          />
          <Text style={styles.btnTxt}>{omEmail}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: moderateScale(10),
    marginTop: verticalScale(10),
  },
  btn: {
    borderWidth: 1,
    paddingVertical: moderateScale(4),
    borderRadius: scale(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.themeColor,
    marginBottom: verticalScale(15),
  },
  img: {
    width: scale(30),
    height: scale(30),
    marginRight: moderateScale(10),
  },
  btnTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: moderateScale(12),
    color: colors.themeColor,
  },
  textInput: {
    marginVertical: verticalScale(5),
    fontFamily: "Montserrat-Regular",
    padding: moderateScale(5),
  },
});
