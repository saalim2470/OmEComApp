import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import images from "../Constants/images";
import colors from "../Constants/colors";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Modal from "react-native-modal";
import { Avatar } from "react-native-paper";

const BottomSheet = ({
  isVisible,
  title,
  msg,
  type,
  onClickBtn = () => {},
}) => {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.3} style={{ margin: 0 }}>
      <View style={styles.modalView}>
        <Text style={{ alignSelf: "center" }}>Comments</Text>
        <View style={styles.onlyRowStyle}>
          <Avatar.Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXmEcKM5U_dh_rHnbnc1UHQHu6gtJmxurdXg&usqp=CAU",
            }}
            size={scale(35)}
          />
          <View style={{ marginLeft: moderateScale(5) }}>
            <Text style={styles.headingTxt}>saalim shaikh</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    borderRadius: scale(13),
    paddingVertical: verticalScale(15),
    paddingHorizontal: moderateScale(15),
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: verticalScale(300),
  },
  cardHeaderView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
    justifyContent: "space-between",
    paddingVertical: verticalScale(5),
  },
  headingTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: moderateScale(11),
  },
  onlyRowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
});
