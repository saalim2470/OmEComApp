import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../Constants/colors";
import { Image } from "react-native";

const TextBoxWithLabel = ({
  leftIcon,
  labelTxt,
  onChange = () => {},
  txtBoxStyle,
  txtInputStyle,
  ...props
}) => {
  return (
    <View style={{ marginBottom: verticalScale(15) }}>
      <Text style={styles.labelStyle}>{labelTxt}</Text>
      <View style={[styles.txtBoxback, { ...txtBoxStyle }]}>
        {leftIcon ? (
          <Image
            source={leftIcon}
            style={{
              width: scale(15),
              height: scale(15),
              marginRight: moderateScale(5),
            }}
          />
        ) : null}
        <TextInput
          style={[styles.textBox, { ...txtInputStyle }]}
          onChangeText={(text) => {
            onChange(text);
          }}
          {...props}
        />
      </View>
    </View>
  );
};

export default TextBoxWithLabel;

const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: "Montserrat-Bold",
    fontSize: scale(11),
  },
  textBox: {
    backgroundColor: colors.greyColor,
    paddingVertical: verticalScale(5),
    fontFamily: "Montserrat-Regular",
    fontSize: scale(11),
    flex: 1,
  },
  txtBoxback: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.greyColor,
    marginTop: verticalScale(10),
    paddingHorizontal: moderateScale(10),
    borderRadius: scale(2),
  },
});
