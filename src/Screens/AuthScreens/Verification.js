import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import Header from "../../Components/Header";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import CircleOTP from "../../Components/CircleOTP";
import { useNavigation } from "@react-navigation/native";
import CustomeButton from "../../Components/CustomeButton";
import colors from "../../Constants/colors";
import screenName from "../../Constants/screenName";

const Verification = () => {
  const navigation = useNavigation();
  const [otpValue1, setOtpValue1] = useState("");
  const [otpValue2, setOtpValue2] = useState("");
  const [otpValue3, setOtpValue3] = useState("");
  const [otpValue4, setOtpValue4] = useState("");
  const input_1 = useRef(null);
  const input_2 = useRef(null);
  const input_3 = useRef(null);
  const input_4 = useRef(null);
  return (
    <SafeAreaView style={commonStyle.container}>
      <Header />
      <View style={commonStyle.innerContainer}>
        <Text style={commonStyle.headingTxt}>Verification code?</Text>
        <Text style={styles.subTxt}>
          Your privacy means a lot to us. Enter 4 digit code sent to you at 4520
        </Text>
        <View style={commonStyle.row}>
          <CircleOTP
            childRef={input_1}
            autoFocus={true}
            onChangeText={(value) => {
              setOtpValue1(value.toString());
              if (value) input_2.current.focus();
            }}
          />
          <CircleOTP
            childRef={input_2}
            autoFocus={true}
            onChangeText={(value) => {
              setOtpValue2(value.toString());
              if (value) input_3.current.focus();
              if (!value) input_1.current.focus();
            }}
          />
          <CircleOTP
            childRef={input_3}
            autoFocus={true}
            onChangeText={(value) => {
              setOtpValue3(value.toString());
              if (value) input_4.current.focus();
              if (!value) input_2.current.focus();
            }}
          />
          <CircleOTP
            childRef={input_4}
            autoFocus={true}
            onChangeText={(value) => {
              setOtpValue4(value.toString());
              if (!value) input_3.current.focus();
            }}
          />
        </View>
        <CustomeButton
          title={"Verify"}
          onClick={() => {
            // navigation.navigate(screenName.suggestFriend);
            navigation.navigate(screenName.drawerNavigation);
          }}
        />
        <Text style={[styles.subTxt, { alignSelf: "center" }]}>
          Didn't recieve a verification code?
        </Text>
        <TouchableOpacity style={{ alignSelf: "center" }} activeOpacity={0.6}>
          <Text
            style={{
              color: colors.themeColor,
              textDecorationLine: "underline",
              fontFamily: "Montserrat-Medium",
              fontSize: moderateScale(12),
            }}
          >
            Resend code
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  subTxt: {
    marginTop: verticalScale(6),
    marginBottom: verticalScale(15),
    fontSize: scale(11),
    lineHeight: 20,
    fontFamily: "Montserrat-Light",
  },
});
