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
import { addLikeOnContentApi } from "../../store/AdContentSlices/GetAdContentSlice";
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
  console.log(itemData);
  const dispatch = useDispatch();
  const contentDataRes = useSelector(
    (state) => state.getAddContentByCategory.likeData
  );
  const [visible, setVisible] = useState(false);
  const [files, setFiles] = useState([]);
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
  const onClickBookmarkBtn = () => {};
  const imageurl = () => {
    let data = JSON.parse(itemData?.imagesData);
    let values = [];
    console.log(data);
    data.map((item, index) => {
      values.push(`${baseURL}${serverImagePath}/${item}`);
    });
    setFiles(values);
  };
  useEffect(() => {
    imageurl();
  }, [itemData]);

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
            <Text style={styles.subTxt}>
              {itemData?.location?.length > 50
                ? `${itemData?.location?.substring(0, 50)}.....`
                : itemData?.location}
            </Text>
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
                name="ios-bookmark-outline"
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
        <Text style={styles.bottomTxt("Montserrat-Bold")}>
          {itemData?.title}
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
              {itemData?.condition}
            </Text>
          </Text>
          <Text
            style={[
              styles.bottomTxt("Montserrat-Medium"),
              { marginLeft: moderateScale(10) },
            ]}
          >
            Brand:{" "}
            <Text style={styles.bottomTxt("Montserrat-Bold")}>
              {itemData?.brand}
            </Text>
          </Text>
        </View>
        <Text
          style={[
            styles.bottomTxt("Montserrat-Light"),
            { marginTop: verticalScale(10) },
          ]}
        >
          {itemData?.shorDescription}
        </Text>
        <View style={[commonStyle.row, { marginTop: verticalScale(8) }]}>
          <Text style={styles.bottomTxt("Montserrat-Medium")}>
            Price:{" "}
            <Text
              style={[
                styles.bottomTxt("Montserrat-Bold"),
                { color: colors.themeColor },
              ]}
            >
              {itemData?.price}
            </Text>
          </Text>
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent:
                  !isMoreBtn || !isOfferBtn ? "flex-end" : "space-between",
                alignItems: "center",
                width: "25%",
              },
            ]}
          >
            {isMoreBtn ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  onClickMoreBtn();
                }}
                style={[
                  styles.btnStyle,
                  {
                    backgroundColor: "#d8d8d8",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.btnTxt,
                    {
                      color: "#000000",
                      fontSize: scale(8),
                    },
                  ]}
                >
                  More
                </Text>
              </TouchableOpacity>
            ) : null}
            {isOfferBtn ? (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.btnStyle,
                  {
                    backgroundColor: "#fe98bf",
                    display: !isOfferBtn ? "none" : null,
                  },
                ]}
              >
                <Text style={[styles.btnTxt, { fontSize: scale(8) }]}>
                  Offer
                </Text>
              </TouchableOpacity>
            ) : null}
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
  subTxt: {
    fontFamily: "Montserrat-Light",
    fontSize: moderateScale(9),
  },
  cardImgView: {
    height: verticalScale(300),
    paddingVertical: verticalScale(3),
  },
  btnStyle: {
    alignSelf: "flex-end",
    justifyContent: "center",
    backgroundColor: "#fcc441",
  },
  btnTxt: {
    fontSize: scale(10),
    marginHorizontal: moderateScale(8),
    marginVertical: verticalScale(4),
    color: "#FFFFFF",
    fontFamily: "Montserrat-Medium",
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
    marginHorizontal: moderateScale(10),
    marginVertical: verticalScale(8),
  },
  descTxt: {
    fontFamily: "Montserrat-Light",
    fontSize: moderateScale(11),
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
});
