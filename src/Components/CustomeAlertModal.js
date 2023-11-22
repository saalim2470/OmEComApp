import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import images from "../Constants/images";
import colors from "../Constants/colors";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Modal from "react-native-modal";

const CustomeAlertModal = ({
  isVisible,
  title,
  msg,
  success,
  error,
  warning,
  onClickBtn = () => {},
}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalView}>
        {success && (
          <Image
            source={images.checkedIcon}
            style={[styles.img, { tintColor: colors.themeColor }]}
          />
        )}
        {error && <Image source={images.errorIcon} style={styles.img} />}
        {warning && <Image source={images.warningIcon} style={styles.img} />}

        <Text style={styles.txt}>{title}</Text>
        <Text style={styles.txt}>{msg}</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.btn}
          onPress={() => {
            onClickBtn();
          }}
        >
          <Text style={styles.btnTxt}>Done</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomeAlertModal;

const styles = StyleSheet.create({
  modalView: {
    // height: verticalScale(200),
    backgroundColor: "white",
    borderRadius: scale(10),
    alignItems: "center",
    paddingVertical: verticalScale(15),
    paddingHorizontal: moderateScale(15),
  },
  btn: {
    marginTop: verticalScale(8),
    // alignSelf: "flex-end",
    paddingVertical: verticalScale(5),
    paddingHorizontal: moderateScale(8),
    borderRadius: scale(5),
    backgroundColor: colors.themeColor,
  },
  txt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(16),
    marginTop: verticalScale(5),
  },
  img: {
    width: scale(50),
    height: scale(50),
  },
  btnTxt: {
    color: "white",
    fontSize: scale(12),
    fontFamily: "Montserrat-Medium",
  },
});
