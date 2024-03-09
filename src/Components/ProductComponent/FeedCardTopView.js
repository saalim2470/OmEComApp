import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import screenName from "../../Constants/screenName";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import ReadMore from "@fawazahmed/react-native-read-more";

const FeedCardTopView = ({ itemData, disable }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate(screenName.productDetail, { data: itemData });
      }}
      disabled={disable}
      style={styles.topView}
    >
      <ReadMore
        numberOfLines={3}
        style={styles.descTxt}
        seeMoreStyle={{ color: "blue" }}
        seeLessStyle={{ color: "blue" }}
      >
        {itemData?.description}
      </ReadMore>
    </Pressable>
  );
};

export default memo(FeedCardTopView);

const styles = StyleSheet.create({
  topView: {
    marginHorizontal: moderateScale(10),
    marginVertical: verticalScale(5),
  },
  descTxt: {
    fontFamily: "Montserrat-Regular",
    fontSize: scale(13),
  },
});
