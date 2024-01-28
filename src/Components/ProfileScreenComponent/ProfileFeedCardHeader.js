import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Avatar, Menu } from "react-native-paper";
import images from "../../Constants/images";
import {
  baseURL,
  defaultProfileImg,
  serverImagePath,
} from "../../Constants/defaults";
import screenName from "../../Constants/screenName";
import { useNavigation } from "@react-navigation/native";
import CustomeAlert from "../CustomeAlert";
import { useDispatch } from "react-redux";
import { deleteAdContentApi } from "../../store/AdContentSlices/DeleteAdContent";
import moment from "moment";
import { getUserUploadTime } from "../../Constants/Constant";

const ProfileFeedCardHeader = ({ itemData }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.cardHeaderView}>
      <View style={styles.onlyRowStyle}>
        {itemData?.user?.profilePicturePath != null ||
        itemData?.user?.profilePicturePath != "" ? (
          <Avatar.Image
            source={{
              uri: `${baseURL}${serverImagePath}/${itemData?.user?.profilePicturePath}`,
            }}
            size={scale(35)}
          />
        ) : (
          <Avatar.Image
            source={{
              uri: defaultProfileImg,
            }}
            size={scale(35)}
          />
        )}
        <View style={{ marginLeft: moderateScale(5) }}>
          <Text
            style={styles.headingTxt}
          >{`${itemData?.user?.firstname} ${itemData?.user?.lastname}`}</Text>
          <Text style={styles.subTxt}>
            {moment(getUserUploadTime(itemData?.createdDate))
              .startOf("seconds")
              .fromNow()}
          </Text>
        </View>
      </View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        // contentStyle={{ backgroundColor: "white" }}
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
        <Menu.Item
          onPress={() => {
            navigation.navigate(screenName.postData, { editData: itemData });
            closeMenu();
          }}
          title="Edit"
        />
        <Menu.Item
          onPress={() => {
            setAlertVisible(true);
            closeMenu();
          }}
          title="Delete"
        />
      </Menu>
      <CustomeAlert
        show={alertVisible}
        title={"Delete"}
        msg={"Are you sure you want to delete this?"}
        onDismiss={() => setAlertVisible(false)}
        onCliCkOk={() => {
          setAlertVisible(false);
          dispatch(deleteAdContentApi(itemData?.id));
        }}
      />
    </View>
  );
};

export default ProfileFeedCardHeader;

const styles = StyleSheet.create({
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
  subTxt: {
    fontSize: scale(9.5),
    fontFamily: "Montserrat-Light",
  },
});
