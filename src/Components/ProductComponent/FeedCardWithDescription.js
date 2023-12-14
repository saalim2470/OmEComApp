import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import colors from "../../Constants/colors";
import PropTypes from "prop-types";
import Overview from "./Overview";
import Specification from "./Specification";
import Slider from "./Slider";
import { useEffect } from "react";
import { baseURL, serverImagePath } from "../../Constants/defaults";
import { addLikeOnContentApi } from "../../store/AdContentSlices/GetAdContentSlice";
import { useDispatch } from "react-redux";
import FeedCardHeader from "./FeedCardHeader";
import FeedCardBottomView from "./FeedCardBottomView";

const FeedCardWithDescription = ({ itemData }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [isShowTxtBtn, setIsShowTxtBtn] = useState(false);
  const [files, setFiles] = useState([]);
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
  const onClickMsgBtn = () => {};
  const txt =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but";
  return (
    <View style={{ marginBottom: verticalScale(8) }}>
      {/* card header view */}
      <FeedCardHeader itemData={itemData} />
      <View style={styles.topView}>
        <Text style={styles.descTxt}>
          {txt.length > txtLength && isShowTxtBtn == false
            ? `${txt.substring(0, txtLength)}`
            : txt}
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
        </Text>
      </View>
      {/* image slider view */}
      <Slider data={files} />
      <View style={styles.bottomView}>
        <FeedCardBottomView
          itemData={itemData}
          onClickLike={() => {
            onClickLikeBtn();
          }}
          onClickBookMark={() => {
            onClickBookmarkBtn();
          }}
          onClickMsg={() => {
            onClickMsgBtn();
          }}
        />
        <View style={styles.tabView}>
          <TouchableOpacity
            style={[
              styles.tabBtnView,
              styles.tabBtnLeftRadius,
              { backgroundColor: activeTab == 0 ? colors.themeColor : null },
            ]}
            activeOpacity={0.6}
            onPress={() => {
              setActiveTab(0);
            }}
          >
            <Text
              style={[
                styles.tabBtnTxt,
                { color: activeTab == 0 ? "white" : "black" },
              ]}
            >
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabBtnView,
              styles.tabBtnRightRadius,
              { backgroundColor: activeTab == 1 ? colors.themeColor : null },
            ]}
            activeOpacity={0.6}
            onPress={() => {
              setActiveTab(1);
            }}
          >
            <Text
              style={[
                styles.tabBtnTxt,
                { color: activeTab == 1 ? "white" : "black" },
              ]}
            >
              Specification
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab == 0 ? (
          <Overview itemData={itemData} />
        ) : (
          <Specification data1={itemData?.specifications} />
        )}
      </View>
    </View>
  );
};

FeedCardWithDescription.propTypes = {
  itemData: PropTypes.object,
  isMoreBtn: PropTypes.bool,
  isOfferBtn: PropTypes.bool,
  isDesc: PropTypes.bool,
  isShowContactBtn: PropTypes.bool,
  onClickMoreBtn: PropTypes.func,
  onClickMsgBtn: PropTypes.func,
  onClickBookmarkBtn: PropTypes.func,
  onClickComment: PropTypes.func,
};

export default FeedCardWithDescription;

const styles = StyleSheet.create({
  cardView: {},
  bottomView: {
    marginHorizontal: moderateScale(10),
    marginVertical: verticalScale(8),
  },
  tabView: {
    flexDirection: "row",
    marginTop: verticalScale(5),
  },
  tabBtnView: {
    borderWidth: 0.5,
    flex: 1,
    height: verticalScale(30),
    alignItems: "center",
    justifyContent: "center",
  },
  tabBtnTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(13),
  },
  tabBtnLeftRadius: {
    borderTopLeftRadius: scale(10),
    borderBottomLeftRadius: scale(10),
  },
  tabBtnRightRadius: {
    borderTopRightRadius: scale(10),
    borderBottomRightRadius: scale(10),
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
