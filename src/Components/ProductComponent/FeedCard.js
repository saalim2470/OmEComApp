import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Avatar, Button, Divider, Menu } from "react-native-paper";
import { SliderBox } from "react-native-image-slider-box";
import images from "../../Constants/images";
import commonStyle from "../../Constants/commonStyle";
import colors from "../../Constants/colors";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addLikeOnContentApi,
  saveContentApi,
} from "../../store/AdContentSlices/GetAdContentSlice";
import Slider from "./Slider";
import { http } from "../../../http-common";
import { useEffect } from "react";
import { baseURL, serverImagePath } from "../../Constants/defaults";

const FeedCard = ({
  itemData,
  onClickMoreBtn = () => {},
  isMoreBtn,
  isOfferBtn,
  isShowOptionBtn,
  menuChildren,
  onClickMsgBtn = () => {},
}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const [isShowTxtBtn, setIsShowTxtBtn] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
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
  const txt =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but";
  return (
    <Pressable
      onPress={() => {
        onClickMoreBtn();
      }}
      style={{ marginBottom: verticalScale(8) }}
    >
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
              {itemData?.location?.length > 50
                ? `${itemData?.location?.substring(0, 50)}.....`
                : itemData?.location}
            </Text> */}
          </View>
        </View>
        {isShowOptionBtn ? (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            contentStyle={{ backgroundColor: "white" }}
            anchor={
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  openMenu();
                }}
              >
                <Image
                  source={images.optionIcon}
                  style={{
                    width: scale(20),
                    height: scale(20),
                    tintColor: "grey",
                  }}
                />
              </TouchableOpacity>
            }
          >
            {menuChildren}
            {/* <Menu.Item onPress={() => {}} title="Edit" />
            <Menu.Item onPress={() => {}} title="Delete" /> */}
          </Menu>
        ) : null}
      </View>
      <View style={styles.topView}>
        <Text style={styles.descTxt}>
          {txt.length > 100 && isShowTxtBtn == false
            ? `${txt.substring(0, 100)}`
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

      {/* slider image view */}
      <Slider data={files} />
      <View style={styles.bottomView}>
        <View style={[commonStyle.row, { marginBottom: verticalScale(10) }]}>
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
                name={
                  itemData?.isCurrentUserSaved
                    ? "ios-bookmark"
                    : "ios-bookmark-outline"
                }
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
