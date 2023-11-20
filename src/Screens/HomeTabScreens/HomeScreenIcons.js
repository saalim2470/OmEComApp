import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Flatlist,
} from "react-native";
import React, { useEffect } from "react";
import commonStyle from "../../Constants/commonStyle";
import images from "../../Constants/images";
import MainHeader from "../../Components/MainHeader";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import screenName from "../../Constants/screenName";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryData } from "../../store/categorySlices/CategorySlice";
import Loading from "../../Components/Loading";
import CategoryView from "../../Components/HomeScreenComponent/CategoryView";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreenIcons = ({ navigation }) => {
  const dispatch = useDispatch();
  const categoryLoading = useSelector((state) => state.category.isLoading);
  const categoryData = useSelector((state) => state.category.categoryData);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    dispatch(getCategoryData(1, 10));
  }, []);
  useEffect(() => {
    if (categoryData?.Success) {
      setCategory(categoryData?.Data);
    }
  }, [categoryData]);

  return (
    <SafeAreaView style={commonStyle.container}>
      <MainHeader
        leftIcon={<Feather name="menu" size={scale(30)} color="black" />}
        middleIcon={images.omLogo}
        rightIcon={
          <Ionicons
            name="notifications-outline"
            size={scale(30)}
            color="black"
          />
        }
        onClickRightIcon={() => {
          navigation.navigate(screenName.notification);
        }}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      {categoryLoading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.categoryWrapper}>
            {category &&
              category?.map((item, index) => {
                return <CategoryView data={item} />;
              })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default HomeScreenIcons;

const styles = StyleSheet.create({
  categoryWrapper: {
    flex: 1,
    marginHorizontal: moderateScale(8),
    marginTop: verticalScale(10),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: scale(10),
    // gap: scale(15),
  },
  iconView: {
    width: scale(95),
    height: scale(90),
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: scale(8),
    backgroundColor: "#FFFFFF",
    marginVertical: verticalScale(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  iconTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(10),
    textAlign: "center",
  },
  iconsParentView: {
    paddingHorizontal: moderateScale(15),
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 20,
    rowGap: 5,
  },
});
