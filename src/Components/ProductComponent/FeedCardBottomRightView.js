import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import images from "../../Constants/images";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import CustomeAlertModal from "../CustomeAlertModal";

const FeedCardBottomRightView = ({ itemData }) => {
  const url = `whatsapp://send?phone=${itemData?.user?.phoneNumber}&text=${itemData?.description}`;
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  const checkWhatsAppInstalled = async () => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        Linking.openURL(url);
      } else {
        setShowAlert({
          show: true,
          title: "WhatsApp",
          msg: "Please Install WhatsApp",
          type: "warning",
        });
      }
    } catch (error) {
      console.log("-=-=-wa error-=-=-", error);
    }
  };
  const onClickModalBtn = () => {
    setShowAlert({
      ...showAlert,
      show: false,
    });
  };
  return (
    <>
      <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => {
            checkWhatsAppInstalled();
          }}
        >
          <Image
            source={images.whatsAppLogo}
            style={[styles.iconStyle, { marginRight: moderateScale(15) }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`tel:${itemData?.user?.phoneNumber}`);
          }}
          activeOpacity={0.4}
        >
          <Image source={images.phoneIcon} style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
      <CustomeAlertModal
        isVisible={showAlert.show}
        title={showAlert.title}
        msg={showAlert.msg}
        type={showAlert.type}
        onClickBtn={() => {
          onClickModalBtn();
        }}
      />
    </>
  );
};

export default FeedCardBottomRightView;

const styles = StyleSheet.create({
  iconStyle: {
    width: scale(25),
    height: scale(25),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
