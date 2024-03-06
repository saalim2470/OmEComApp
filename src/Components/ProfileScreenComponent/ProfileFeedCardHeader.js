import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useState } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import {  Menu } from "react-native-paper";
import images from "../../Constants/images";
import screenName from "../../Constants/screenName";
import { useNavigation } from "@react-navigation/native";
import CustomeAlert from "../CustomeAlert";
import { useDispatch } from "react-redux";
import { deleteAdContentApi } from "../../store/AdContentSlices/DeleteAdContent";
import ProfileImage from "../ProfileImage";
import ProfileName from "../ProfileName";

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
        <ProfileImage
          url={itemData?.user?.profilePicturePath}
          size={scale(35)}
        />
        <ProfileName data={itemData}/>
      </View>
      <View>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                openMenu();
              }}
            >
              <Image
                source={images.optionIcon}
                resizeMode="contain"
                style={{
                  width: scale(20),
                  height: scale(20),
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
      </View>
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

export default memo(ProfileFeedCardHeader);

const styles = StyleSheet.create({
  cardHeaderView: {
    flexDirection: "row",
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
    gap: scale(10),
  },
  onlyRowStyle: {
    flexDirection: "row",
    flex: 1,
  },
});
