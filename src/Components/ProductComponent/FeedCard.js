import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  addLikeOnContentApi,
  saveContentApi,
} from "../../store/AdContentSlices/GetAdContentSlice";
import Slider from "./Slider";
import { useEffect } from "react";
import { baseURL, serverImagePath } from "../../Constants/defaults";
import FeedCardHeader from "./FeedCardHeader";
import FeedCardBottomView from "./FeedCardBottomView";

const FeedCard = ({
  itemData,
  onClickMoreBtn = () => {},
  isMoreBtn,
  isOfferBtn,
  isShowOptionBtn,
  menuChildren,
}) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [isShowTxtBtn, setIsShowTxtBtn] = useState(false);
  const txtLength = 100;
  const onClickLikeBtn = () => {
    dispatch(
      addLikeOnContentApi({
        contentId: itemData?.id,
        isLiked: !itemData?.isCurrentUserLiked,
      })
    );
  };
  const onClickBookmarkBtn = () => {
    dispatch(
      saveContentApi({
        adContentID: itemData?.id,
        isSaved: !itemData?.isCurrentUserSaved,
      })
    );
  };
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
  console.log(files);
  const txt =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but";
  return (
    <Pressable
      onPress={() => {
        onClickMoreBtn();
      }}
      style={{ marginBottom: verticalScale(8) }}
    >
      {/* headerView */}
      <FeedCardHeader
        isShowOptionBtn={isShowOptionBtn}
        itemData={itemData}
        menuChildren={menuChildren}
      />
      <View style={styles.topView}>
        {/* <Text style={styles.descTxt}>
          {itemData?.description?.length > txtLength && isShowTxtBtn == false
            ? `${itemData?.description?.substring(0, txtLength)}`
            : itemData?.description}
          {isShowTxtBtn ? (
            <Text
              onPress={() => setIsShowTxtBtn(false)}
              style={{ color: "blue" }}
            >
              ...less
            </Text>
          ) : (
            <Text
              onPress={() => setIsShowTxtBtn(true)}
              style={{ color: "blue" }}
            >
              ...more
            </Text>
          )}
        </Text> */}
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

      {/* slider image view */}
      <Slider data={files} />
      <View style={[styles.bottomView]}>
        <FeedCardBottomView
          itemData={itemData}
          onClickBookMark={() => {
            onClickBookmarkBtn();
          }}
          onClickLike={() => {
            onClickLikeBtn();
          }}
          onClickMsg={() => {}}
        />
      </View>
    </Pressable>
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
