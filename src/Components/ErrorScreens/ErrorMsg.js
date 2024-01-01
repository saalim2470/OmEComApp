import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import images from "../../Constants/images";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const ErrorMsg = ({ statusCode }) => {
  return (
    <View style={[{ alignItems: "center", justifyContent: "center", flex: 1 }]}>
      <View style={styles.imgView}>
        {statusCode === 500 ? (
          <Image
            source={images.error500}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Image
            source={images.error}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </View>
    </View>
  );
};

export default ErrorMsg;

const styles = StyleSheet.create({
  imgView: {
    width: scale(300),
    height: verticalScale(300),
    alignSelf: "center",
  },
});
