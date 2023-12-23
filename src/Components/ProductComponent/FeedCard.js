import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import PropTypes from "prop-types";
import Slider from "./Slider";
import { useEffect } from "react";
import { baseURL, serverImagePath } from "../../Constants/defaults";
import FeedCardHeader from "./FeedCardHeader";
import FeedCardBottomView from "./FeedCardBottomView";

const FeedCard = ({
  itemData,
  onClickMoreBtn = () => {},
  isShowOptionBtn,
  menuChildren,
  disable,
}) => {
  const [files, setFiles] = useState([]);
  const [isShowTxtBtn, setIsShowTxtBtn] = useState(false);
  const txtLength = 100;
  const imageurl = () => {
    let data = JSON.parse(itemData?.imagesData);
    let values = [];
    data.map((item, index) => {
      values.push(`${baseURL}${serverImagePath}/${item}`);
    });
    setFiles(values);
  };
  useEffect(() => {
    imageurl();
  }, [itemData]);
  return (
    <View style={{ marginBottom: verticalScale(8) }}>
      <FeedCardHeader
        isShowOptionBtn={isShowOptionBtn}
        itemData={itemData}
        menuChildren={menuChildren}
      />
      <Pressable
        onPress={() => {
          onClickMoreBtn();
        }}
        disabled={disable}
      >
        <View style={styles.topView}>
          <Text
            style={styles.descTxt}
            disabled={itemData?.description?.length < txtLength}
            onPress={() => {
              setIsShowTxtBtn(!isShowTxtBtn);
            }}
          >
            {itemData?.description?.length > txtLength
              ? `${itemData?.description?.substring(0, txtLength)} ...more`
              : `${itemData?.description?.substring(0, txtLength)}`}
          </Text>
        </View>
      </Pressable>
      <Slider data={files} />
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
