import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Avatar } from "react-native-paper";
import { SliderBox } from "react-native-image-slider-box";
import images from "../../Constants/images";
import commonStyle from "../../Constants/commonStyle";
import colors from "../../Constants/colors";
import PropTypes from "prop-types";
import Overview from "./Overview";
import Specification from "./Specification";
import { Ionicons } from "@expo/vector-icons";
import Slider from "./Slider";
import { useEffect } from "react";
import { baseURL, serverImagePath } from "../../Constants/defaults";
import { addLikeOnContentApi } from "../../store/AdContentSlices/GetAdContentSlice";
import { useDispatch } from "react-redux";

const FeedCardWithDescription = ({itemData}) => {
  const dispatch=useDispatch()
  const [activeTab, setActiveTab] = useState(0);
  const [files, setFiles] = useState([]);
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
    dispatch(saveContentApi({
      adContentID: itemData?.id,
      isSaved: !itemData?.isCurrentUserSaved,
    }))
  };
  onClickMsgBtn = () => {}
  return (
    <View style={{ marginBottom: verticalScale(8) }}>
      {/* card header view */}
      <View style={styles.cardHeaderView}>
        <View style={styles.onlyRowStyle}>
          <Avatar.Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXmEcKM5U_dh_rHnbnc1UHQHu6gtJmxurdXg&usqp=CAU",
            }}
            size={scale(35)}
          />
          <View style={{ marginLeft: moderateScale(5) }}>
            <Text
              style={styles.headingTxt}
            >{`${itemData?.user?.firstname} ${itemData?.user?.lastname}`}</Text>
            {/* <Text style={styles.subTxt}>
              {itemData?.location.length > 50
                ? `${itemData?.location.substring(0, 50)}.....`
                : itemData?.location}
            </Text> */}
          </View>
        </View>
        {/* <TouchableOpacity activeOpacity={0.5}>
          <Image
            source={images.optionIcon}
            style={{ width: scale(20), height: scale(20), tintColor: "grey" }}
          />
        </TouchableOpacity> */}
      </View>
      {/* image slider view */}
      <Slider data={files} />
      <View style={styles.bottomView}>
        <View style={[commonStyle.row]}>
          <View
            style={{
              flexDirection: "row",
              gap: scale(15),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                onClickLikeBtn();
              }}
            >
              <Ionicons
                name={itemData?.isCurrentUserLiked ? "heart" : "heart-outline"}
                size={scale(24)}
                color={itemData?.isCurrentUserLiked ? "red" : "black"}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                onClickComment();
              }}
            >
              <MaterialCommunityIcons
                name="message-outline"
                size={scale(24)}
                color="black"
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                onClickMsgBtn();
              }}
            >
              <Ionicons name="mail-outline" size={scale(24)} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onClickBookmarkBtn();
              }}
            >
              <Ionicons
                name={itemData?.isCurrentUserSaved?'ios-bookmark':"ios-bookmark-outline"}
                size={scale(24)}
                color="black"
              />
              {/* fill icon */}
              {/* <Ionicons name="ios-bookmark" size={scale(24)} color="black" /> */}
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => {
                Linking.openURL(
                  `whatsapp://send?phone=${itemData?.user?.phoneNumber}&text=Hello`
                );
              }}
            >
              <Image
                source={images.whatsAppLogo}
                style={[styles.iconStyle, { marginRight: moderateScale(15) }]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${itemData?.user?.phoneNumber}`);
              }}
              activeOpacity={0.4}
            >
              <Image source={images.phoneIcon} style={styles.iconStyle} />
            </TouchableOpacity>
          </View>
        </View>
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
  subTxt: {
    fontFamily: "Montserrat-Light",
    fontSize: moderateScale(9),
  },
  cardImgView: {
    height: verticalScale(300),
    paddingVertical: verticalScale(3),
  },
  onlyRowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomView: {
    marginHorizontal: moderateScale(10),
    marginVertical: verticalScale(8),
  },
  dotStyle: {
    width: scale(7),
    height: scale(7),
    borderRadius: scale(5),
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
  },
  iconStyle: {
    width: scale(25),
    height: scale(25),
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
});
