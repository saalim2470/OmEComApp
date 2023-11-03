import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";

const Banner = ({ data }) => {
  return (
    <View
      style={{
        marginTop: verticalScale(3),
        marginBottom: verticalScale(7),
      }}
    >
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        focusable={true}
        keyExtractor={(item) => {
          item.id;
        }}
        renderItem={({ item, index }) => {
          return (
            <View
              style={[
                styles.bannerView,
                {
                  marginLeft:
                    index == 0 ? moderateScale(15) : moderateScale(10),
                  marginRight: index == data.length - 1 && moderateScale(8),
                },
              ]}
            >
              <ImageBackground
                source={{
                  uri: item.url,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
                resizeMode="cover"
              >
                <Text style={styles.bannerTxt}>{item.title}</Text>
              </ImageBackground>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  bannerView: {
    width: scale(240),
    height: verticalScale(110),
  },
  bannerTxt: {
    color: "#FFFFFF",
    marginBottom: verticalScale(5),
    fontSize: moderateScale(11),
    fontFamily: "Montserrat-Medium",
  },
});
