import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import commonStyle from "../Constants/commonStyle";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import Banner from "../Components/Banner";
import colors from "../Constants/colors";
import ImageGridView from "../Components/ImageGridView";
import CustomeButton from "../Components/CustomeButton";

const Explore = () => {
  const bannerData = [
    {
      id: 0,
      url: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSkytmvWchnNWSuNPtHw_69p_-0B6uvKI_Qrzjywh419n0_PIPn",
      title: "New Store",
    },
    {
      id: 1,
      url: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRTUKQYSqIQ1-fWdJnKa4DMRFh-AX254Tc9sg-LE6lMS1Kk3NjI",
      title: "New Store1",
    },
    {
      id: 2,
      url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRWLy02xnBibvGdav8A6PQrgedGlORgqxLSraG9iT1fxoc9E2Bd",
      title: "New Store2",
    },
  ];
  const imageListData = [
    {
      id: 0,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8tclUoWIgecufJPmv-b0Pe1hvshZQtNLpYbmPnwaXqixsfoiz",
    },
    {
      id: 1,
      url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTdRcwdesz-kIpSKzhOABHAko3OUwIGNR8GS0UG9rLZjFPDm4Jn",
    },
    {
      id: 2,
      url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQs9LeVe6fNgieAsGkT2zgkuuFgdHEKSR9C3kQdMLw94DikXfA2",
    },
    {
      id: 3,
      url: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTAcNrbQjQ9k7Jl5LhjCsNiR2SMhrKr7BLu-_uSt1Oc_nkeU1vZ",
    },
    {
      id: 4,
      url: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQzDr8T039We2aEe0GemHx8M149DSw7lXsZozGF1huiUZ-f7Ij5",
    },
    {
      id: 5,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB2MUFuhEeuqY7aq5PY0wUrCCUX-gA3ceRLSLzG-yGCRmwTl27",
    },
    {
      id: 6,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3hq2nLngUgmKXza0pTdhVXdhDtx3HStHdV5gNGbQeCZ4yupT8",
    },
  ];
  return (
    <View style={[commonStyle.container, { paddingTop: verticalScale(10) }]}>
      <Text
        style={[
          commonStyle.smallHeading,
          { paddingHorizontal: moderateScale(15) },
        ]}
      >
        Sellers of the week
      </Text>
      <Banner data={bannerData} />
      <View style={{ paddingHorizontal: moderateScale(15) }}>
        <View style={commonStyle.row}>
          <Text style={commonStyle.smallHeading}>Suggested items</Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={styles.btnTxt}>See more</Text>
          </TouchableOpacity>
        </View>
        <ImageGridView data={imageListData} />
      </View>
      <View style={styles.bottomBtnView}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Montserrat-Light",
            fontSize: moderateScale(11),
          }}
        >
          Not quite what you're looking for?
        </Text>
        <CustomeButton
          title={"Browse Categories"}
          style={{ backgroundColor: "#FFFFFFF", borderWidth: 1 }}
          txtStyle={{ color: "#000000" }}
        />
      </View>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  btnTxt: {
    color: colors.themeColor,
    fontSize: moderateScale(11),
    fontFamily: "Montserrat-Medium",
  },
  bottomBtnView: {
    position: "absolute",
    bottom: verticalScale(15),
    width: "100%",
    paddingHorizontal: moderateScale(15),
  },
});
