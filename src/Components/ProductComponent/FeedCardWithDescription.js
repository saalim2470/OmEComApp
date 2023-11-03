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

const FeedCardWithDescription = ({
  itemData,
  isShowContactBtn,
  onClickMsgBtn = () => {},
  onClickBookmarkBtn = () => {},
  onClickComment = () => {},
}) => {
  const getIcon = (icon, onPress = () => {}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
      >
        <Image source={icon} style={{ width: scale(18), height: scale(18) }} />
      </TouchableOpacity>
    );
  };
  const [activeTab, setActiveTab] = useState(0);
  return (
    <View style={{ marginBottom: verticalScale(8) }}>
      <View style={styles.cardHeaderView}>
        <View style={styles.onlyRowStyle}>
          <Avatar.Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXmEcKM5U_dh_rHnbnc1UHQHu6gtJmxurdXg&usqp=CAU",
            }}
            size={scale(35)}
          />
          <View style={{ marginLeft: moderateScale(5) }}>
            <Text style={styles.headingTxt}>{itemData?.userName}</Text>
            <Text style={styles.subTxt}>
              {itemData?.location.length > 50
                ? `${itemData?.location.substring(0, 50)}.....`
                : itemData?.location}
            </Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.5}>
          <Image
            source={images.optionIcon}
            style={{ width: scale(20), height: scale(20), tintColor: "grey" }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardImgView}>
        <SliderBox
          images={itemData?.files}
          sliderBoxHeight={"100%"}
          dotColor={colors.themeColor}
          inactiveDotColor="#FFFFFF"
          disableOnPress={true}
          imageLoadingColor={colors.themeColor}
          dotStyle={styles.dotStyle}
        />
      </View>
      <View style={styles.bottomView}>
        <View style={[commonStyle.row]}>
          <View
            style={[
              {
                width: "45%",
              },
              commonStyle.row,
            ]}
          >
            {getIcon(images.unLikeIcon, () => {
              console.log("Like");
            })}
            {getIcon(images.messageIcon, () => {
              onClickComment();
            })}
            {getIcon(images.emailIcon, () => {
              onClickMsgBtn();
            })}
            {getIcon(
              itemData?.isSaved ? images.bookmarkFillIcon : images.bookmarkIcon,
              () => {
                onClickBookmarkBtn();
              }
            )}
          </View>
          {isShowContactBtn ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => {
                  Linking.openURL(
                    `whatsapp://send?phone=${itemData?.mobileNo}&text=Hello`
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
                  Linking.openURL(`tel:${itemData?.mobileNo}`);
                }}
                activeOpacity={0.4}
              >
                <Image source={images.phoneIcon} style={styles.iconStyle} />
              </TouchableOpacity>
            </View>
          ) : null}
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
        {activeTab == 0 ? <Overview itemData={itemData} /> : <Specification />}
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
