import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const UserHeader = () => {
  return (
    <View style={styles.userView}>
      <Avatar.Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXmEcKM5U_dh_rHnbnc1UHQHu6gtJmxurdXg&usqp=CAU",
        }}
        size={scale(45)}
      />
      <View style={{ marginLeft: moderateScale(5) }}>
        <Text style={styles.headingTxt}>Saalim Shaikh</Text>
      </View>
    </View>
  );
};

export default UserHeader;

const styles = StyleSheet.create({
  headingTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(16),
  },
  userView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(8),
    marginTop: verticalScale(5),
  },
});
