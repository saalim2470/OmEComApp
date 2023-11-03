import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import commonStyle from "../../Constants/commonStyle";
import Header from "../../Components/Header";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../../Constants/colors";
import CustomeButton from "../../Components/CustomeButton";
import { SliderBox } from "react-native-image-slider-box";
import images from "../../Constants/images";

const ProductPreview = () => {
  const feedData = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRABH5we5erv84MFP1C4sPZjBLZPR9G4PdSSQ3qUiETN_XDIFrA",
    images.introImg1,
    images.introImg2,
  ];
  return (
    <SafeAreaView style={commonStyle.container}>
      <Header />
      <Text
        style={[
          commonStyle.headingTxt,
          { paddingHorizontal: moderateScale(15), marginTop: verticalScale(8) },
        ]}
      >
        Preview
      </Text>
      <Text style={styles.SmallHading}>
        Approve your items before you list it
      </Text>
      <View style={{ height: verticalScale(300) }}>
        <SliderBox
          images={feedData}
          sliderBoxHeight={"100%"}
          dotColor={colors.themeColor}
          inactiveDotColor="#FFFFFF"
          disableOnPress={true}
          imageLoadingColor={colors.themeColor}
          dotStyle={{
            width: scale(7),
            height: scale(7),
            borderRadius: scale(5),
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
          }}
        />
      </View>
      <View style={commonStyle.innerContainer}>
        <View style={styles.bottomView}>
          <Text style={styles.bottomTxt("Montserrat-Bold")}>
            Exclusive Mens Shoe
          </Text>
          <View
            style={[
              styles.onlyRowStyle,
              {
                marginTop: verticalScale(8),
              },
            ]}
          >
            <Text style={styles.bottomTxt("Montserrat-Medium")}>
              Condition:{" "}
              <Text style={styles.bottomTxt("Montserrat-Bold")}>
                used-Excellent
              </Text>
            </Text>
            <Text
              style={[
                styles.bottomTxt("Montserrat-Medium"),
                { marginLeft: moderateScale(10) },
              ]}
            >
              Brand:{" "}
              <Text style={styles.bottomTxt("Montserrat-Bold")}>Peter</Text>
            </Text>
          </View>
          <View style={styles.onlyRowStyle}>
            <Text style={styles.bottomTxt("Montserrat-Medium")}>
              Size: <Text style={styles.bottomTxt("Montserrat-Bold")}>M</Text>
            </Text>
            <Text
              style={[
                styles.bottomTxt("Montserrat-Medium"),
                { marginLeft: moderateScale(10) },
              ]}
            >
              Color:{" "}
              <Text style={styles.bottomTxt("Montserrat-Bold")}>Green</Text>
            </Text>
          </View>
          <View style={[commonStyle.row, { marginTop: verticalScale(8) }]}>
            <Text style={styles.bottomTxt("Montserrat-Medium")}>
              Price:{" "}
              <Text
                style={[
                  styles.bottomTxt("Montserrat-Bold"),
                  { color: colors.themeColor },
                ]}
              >
                R455
              </Text>
            </Text>
          </View>
          <Text style={[styles.descTxt, { marginTop: verticalScale(10) }]}>
            wool-blend
          </Text>
          <Text style={styles.descTxt}>Cream-inside</Text>
          <Text style={[styles.descTxt, { marginTop: verticalScale(10) }]}>
            Composition
          </Text>
          <Text style={styles.descTxt}>90% visoose lining.100% cotton</Text>
          <Text style={[styles.descTxt, { marginTop: verticalScale(10) }]}>
            Made in London
          </Text>
          <Text style={styles.descTxt}>
            #Hilfiger #hoodie #StreetWear #Medium
          </Text>
        </View>
        <CustomeButton
          title={"List item for sale"}
          style={{
            paddingVertical: moderateScale(13),
            position: "absolute",
            bottom: 0,
            width: "100%",
            alignSelf: "center",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductPreview;

const styles = StyleSheet.create({
  SmallHading: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(10),
    marginBottom: verticalScale(15),
    paddingHorizontal: moderateScale(15),
  },
  bottomTxt: (fontFamily) => ({
    fontSize: scale(10),
    fontFamily: fontFamily,
  }),
  onlyRowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomView: {
    // marginHorizontal: moderateScale(10),
    marginVertical: verticalScale(10),
  },
  descTxt: {
    fontFamily: "Montserrat-Light",
    fontSize: moderateScale(11),
  },
});
