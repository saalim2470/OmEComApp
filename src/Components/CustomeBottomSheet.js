import React, { useEffect, useRef } from "react";
import {
  Dimensions,
  Image,
  Linking,
  Text,
  TouchableOpacity,
} from "react-native";
import { View, Button, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import images from "../Constants/images";
import AdView from "./SearchScreenComponents/AdView";
import commonStyle from "../Constants/commonStyle";

const screenHeight = Dimensions.get("screen").height;

const CustomeBottomSheet = ({ isOpen, setIsOpen }) => {
  const refRBSheet = useRef();
  useEffect(() => {
    if (isOpen) {
      refRBSheet.current.open();
    } else {
      refRBSheet.current.close();
    }
  }, [isOpen]);
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={true}
      height={screenHeight - 100}
      onClose={() => setIsOpen(false)}
      minClosingHeight={10}
      customStyles={{
        draggableIcon: {
          backgroundColor: "#000",
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <Text
        style={[
          commonStyle.headingTxt,
          {
            fontSize: scale(12),
            paddingHorizontal: moderateScale(15),
            marginTop: verticalScale(15),
          },
        ]}
      >
        Sponserd Ads
      </Text>
      <AdView disabled={true} />
      <Text
        style={[
          commonStyle.headingTxt,
          {
            fontSize: scale(12),
            paddingHorizontal: moderateScale(15),
            marginTop: verticalScale(15),
          },
        ]}
      >
        To Connect Ads
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          Linking.openURL(`whatsapp://send?phone=9016730106&text=Hello`);
        }}
      >
        <Image source={images.whatsAppLogo} style={styles.logoStyle} />
        <Text style={styles.btnTxt}>WhatsApp</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          Linking.openURL(`tel:9016730106`);
        }}
      >
        <Image source={images.phoneIcon} style={styles.logoStyle} />
        <Text style={styles.btnTxt}>Phone</Text>
      </TouchableOpacity>
    </RBSheet>
  );
};
export default CustomeBottomSheet;
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(15),
    paddingTop: verticalScale(5),
  },
  btn: {
    paddingVertical: verticalScale(3),
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 0.2,
    marginHorizontal: moderateScale(15),
    marginVertical: verticalScale(10),
  },
  logoStyle: {
    width: scale(28),
    height: scale(28),
    marginRight: moderateScale(5),
  },
  btnTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(12),
  },
});
