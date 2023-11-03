import { StyleSheet, Text, View, Image } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import images from "../Constants/images";
import { Divider } from "react-native-paper";
import { Linking } from "react-native";

const CustomeBottomSheet = ({ isShow, onChange = () => {} }) => {
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    onChange(index);
  }, []);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isShow}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onChange={handleSheetChanges}
    >
      <View style={styles.contentContainer}>
        <Text
          style={[
            styles.btnTxt,
            { fontSize: scale(13), marginBottom: verticalScale(5) },
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
      </View>
    </BottomSheet>
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
    marginVertical: verticalScale(2),
    paddingVertical: verticalScale(3),
    flexDirection: "row",
    alignItems: "center",
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
