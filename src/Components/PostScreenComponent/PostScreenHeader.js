import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import CustomeButton from "../CustomeButton";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const PostScreenHeader = ({
  screenTitle,
  btnTxt,
  loading,
  disabled,
  onClick = () => {},
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerView}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back-outline" size={scale(25)} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>{screenTitle}</Text>
      </View>
      <CustomeButton
        style={{
          // width: scale(50),
          paddingHorizontal: moderateScale(5),
          borderRadius: scale(5),
          marginVertical: moderateScale(0),
        }}
        isLoading={loading}
        disabled={disabled}
        title={btnTxt}
        onClick={() => {
          onClick();
        }}
      />
    </View>
  );
};

export default PostScreenHeader;

const styles = StyleSheet.create({
  headerView: {
    // borderBottomWidth: 0.5,
    marginTop: verticalScale(30),
    paddingHorizontal: moderateScale(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(5),
  },
  headerTxt: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(15),
    marginLeft: moderateScale(4),
  },
});
