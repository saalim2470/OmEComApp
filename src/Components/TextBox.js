import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HelperText, TextInput, useTheme } from "react-native-paper";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import colors from "../Constants/colors";

const TextBox = ({
  label,
  left,
  right,
  outlineColor,
  secureTextEntry,
  keyboardType,
  activeOutlineColor,
  value,
  error,
  errorMsg,
  style = {},
  onchange = () => {},
  containerStyle,
  ...props
}) => {
  const theme = useTheme();
  return (
    <View style={containerStyle}>
      <TextInput
        label={label}
        mode="outlined"
        // outlineColor="#cacaca"
        value={value}
        error={error}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        left={left}
        right={right}
        activeOutlineColor={
          activeOutlineColor ? activeOutlineColor : colors.themeColor
        }
        theme={{
          colors: { text: "black" },
          fonts: {
            bodyLarge: {
              ...theme.fonts.bodyLarge,
              fontFamily: "Montserrat-Regular",
            },
          },
        }}
        style={[
          style,
          {
            // backgroundColor: "#FFFFFF",
            backgroundColor: "transparent",
            // marginVertical: moderateVerticalScale(5),
            fontSize: scale(13),
          },
        ]}
        onChangeText={(txt) => {
          onchange(txt);
        }}
        {...props}
      />
      {error ? (
        // <HelperText type="error" visible={error}>
        //   {errorMsg}
        // </HelperText>
        <Text
          style={{
            color: "red",
            fontFamily: "Montserrat-Regular",
            fontSize: scale(11),
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({});
