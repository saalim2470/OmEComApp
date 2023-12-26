import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Avatar, Menu } from "react-native-paper";
import images from "../../Constants/images";
import { baseURL, serverImagePath } from "../../Constants/defaults";
import screenName from "../../Constants/screenName";
import { useNavigation } from "@react-navigation/native";

const ProfileFeedCardHeader = ({ itemData }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <View style={styles.cardHeaderView}>
      <View style={styles.onlyRowStyle}>
        <Avatar.Image
          source={{
            uri: `${baseURL}${serverImagePath}/${itemData?.user?.profilePicturePath}`,
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
        <Menu.Item
          onPress={() => {
            navigation.navigate(screenName.postData, { editData: itemData });
            closeMenu();
          }}
          title="Edit"
        />
        <Menu.Item onPress={() => {}} title="Delete" />
      </Menu>
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
});
