import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import screenName from "../../Constants/screenName";
import images from "../../Constants/images";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import RbBottomSheet from "../BottomSheet/RbBottomSheet";
import Filters from "./Filters";

const screenHeight=Dimensions.get('screen').height/2
const SearchScreenTopView = () => {
  const navigation = useNavigation();
  const [openSheet, setOpenSheet] = useState(false);
  return (
    <>
      <View style={[commonStyle.row, { paddingHorizontal: moderateScale(15) }]}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.txtBoxView}
          onPress={() => {
            navigation.navigate(screenName.searchResultScreen);
          }}
        >
          <Image source={images.searchIcon} style={styles.serachIconStyle} />
          <Text style={styles.txtBoxPlaceholder}>Search something</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setOpenSheet(true);
          }}
        >
          <Image
            source={images.filterIcon}
            style={{ width: scale(20), height: scale(20) }}
          />
        </TouchableOpacity>
      </View>
      <RbBottomSheet
        isOpen={openSheet}
        height={screenHeight}
        setIsOpen={setOpenSheet}
        children={
          <Filters
            onClickFilter={(id) => {
              console.log(id);
            }}
          />
        }
      />
    </>
  );
};

export default SearchScreenTopView;

const styles = StyleSheet.create({
  txtBoxView: {
    borderWidth: 1,
    width: scale(280),
    flexDirection: "row",
    height: verticalScale(38),
    alignItems: "center",
    marginTop: verticalScale(10),
    paddingLeft: moderateScale(12),
    borderColor: "#cacaca",
  },
  txtBoxPlaceholder: {
    fontFamily: "Montserrat-Regular",
    fontSize: scale(12),
  },
  serachIconStyle: {
    width: scale(15),
    height: scale(15),
    marginRight: moderateScale(10),
  },
});
