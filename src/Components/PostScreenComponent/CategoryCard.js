import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { RadioButton } from "react-native-paper";
import colors from "../../Constants/colors";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const CategoryCard = ({ item, onClick = () => {}, status }) => {
  return (
    <View style={styles.categoryCard}>
      <View style={styles.categoryCardLeftView}>
        <Image
          source={item.icon}
          style={{
            width: scale(20),
            height: scale(20),
            marginRight: moderateScale(10),
          }}
        />
        <Text style={styles.categoryTxt}>{item.name}</Text>
      </View>
      <RadioButton
        value={item.name}
        status={status === item.name ? "checked" : "unchecked"}
        color={colors.selectedColor}
        onPress={() => {
          onClick();
        }}
      />
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  categoryCard: {
    borderWidth: 0.5,
    height: verticalScale(60),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(10),
    backgroundColor: "#FFFFFF",
    marginBottom: verticalScale(14),
  },
  categoryCardLeftView: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  categoryTxt: {
    fontSize: scale(13),
    fontFamily: "Montserrat-Regular",
  },
});
