import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Modal from "react-native-modal";

const BottomSheetCustome = ({
  isVisible,
  onBackDropPress = () => {},
  height,
  children,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      style={{ margin: 0 }}
      coverScreen={true}
      onBackdropPress={() => {
        onBackDropPress();
      }}
    >
      <View
        style={[
          styles.modalView,
          //   { height: height ? height : verticalScale(300) },
        ]}
      >
        {children}
      </View>
    </Modal>
  );
};

export default BottomSheetCustome;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: scale(13),
    borderTopRightRadius: scale(13),
    paddingVertical: verticalScale(15),
    // paddingHorizontal: moderateScale(15),
    position: "absolute",
    bottom: 0,
    width: "100%",

    paddingRight: moderateScale(15),
    paddingLeft: moderateScale(15),
  },
});
