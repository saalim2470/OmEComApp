import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo, useState } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import PropTypes from "prop-types";
import Slider from "./Slider";
import { useEffect } from "react";
import FeedCardHeader from "./FeedCardHeader";
import FeedCardBottomView from "./FeedCardBottomView";
import { imageurl } from "../../Constants/functions";
import ProfileFeedCardHeader from "../ProfileScreenComponent/ProfileFeedCardHeader";
import FeedCardTopView from "./FeedCardTopView";
import ImageVideoSlider from "../PostScreenComponent/SliderComponent/ImageVideoSlider";

const FeedCard = ({
  itemData,
  onClickMoreBtn = () => {},
  disable,
  profile,
}) => {
  // const [files, setFiles] = useState([]);
  // useEffect(() => {
  //   setFiles(imageurl(itemData?.imagesData));
  // }, [itemData]);
  return (
    <View
      style={{ marginBottom: verticalScale(8), backgroundColor: "#FFFFFF" }}
    >
      {profile ? (
        <ProfileFeedCardHeader itemData={itemData} />
      ) : (
        <FeedCardHeader itemData={itemData} />
      )}
      {itemData?.description !== null ? (
        <FeedCardTopView itemData={itemData} disable={disable} />
      ) : null}
      {itemData?.imagesData !== "[]" ? (
        // <Slider data={files} onClick={onClickMoreBtn} disable={disable} />
        <ImageVideoSlider
          sliderData={JSON.parse(itemData?.imagesData)}
          onClickImage={onClickMoreBtn}
          disable={disable}
        />
      ) : null}
      <View style={[styles.bottomView]}>
        <FeedCardBottomView itemData={itemData} />
      </View>
    </View>
  );
};

FeedCard.propTypes = {
  itemData: PropTypes.object,
  isMoreBtn: PropTypes.bool,
  isOfferBtn: PropTypes.bool,
  isShowContactBtn: PropTypes.bool,
  onClickMoreBtn: PropTypes.func,
  onClickMsgBtn: PropTypes.func,
  onClickBookmarkBtn: PropTypes.func,
  onClickComment: PropTypes.func,
};

export default memo(FeedCard);

const styles = StyleSheet.create({
  cardView: {},
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
  bottomView: {
    marginHorizontal: moderateScale(10),
    marginTop: verticalScale(8),
    // borderWidth:1
  },
  iconStyle: {
    width: scale(25),
    height: scale(25),
  },
  topView: {
    marginHorizontal: moderateScale(10),
    marginVertical: verticalScale(5),
  },
  descTxt: {
    fontFamily: "Montserrat-Regular",
    fontSize: scale(13),
  },
});
