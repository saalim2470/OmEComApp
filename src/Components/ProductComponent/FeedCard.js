import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo, useState } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import PropTypes from "prop-types";
import FeedCardHeader from "./FeedCardHeader";
import FeedCardBottomView from "./FeedCardBottomView";
import ProfileFeedCardHeader from "../ProfileScreenComponent/ProfileFeedCardHeader";
import FeedCardTopView from "./FeedCardTopView";
import ImageVideoSlider from "../PostScreenComponent/SliderComponent/ImageVideoSlider";
import ImageSlider from "../PostScreenComponent/ImageSlider";

const FeedCard = memo(
  ({
    itemData,
    onClickMoreBtn = () => {},
    onClickComment = () => {},
    disable,
    profile,
    isVideoPlay,
    currentPost,
  }) => {
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
          // <ImageVideoSlider
          //   sliderData={JSON.parse(itemData?.imagesData)}
          //   postDetail={itemData}
          //   onClickImage={onClickMoreBtn}
          //   disable={disable}
          //   shouldVideoPlay={isVideoPlay}
          //   currentPost={currentPost}
          // />
          <ImageSlider
            currentPost={currentPost}
            disable={disable}
            postDetail={itemData}
            shouldVideoPlay={isVideoPlay}
            sliderData={JSON.parse(itemData?.imagesData)}
            onClickImage={onClickMoreBtn}
          />
        ) : null}
        <View style={[styles.bottomView]}>
          <FeedCardBottomView itemData={itemData} onClickComment={()=>{onClickComment()}}/>
        </View>
      </View>
    );
  }
);

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

export default FeedCard;

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
