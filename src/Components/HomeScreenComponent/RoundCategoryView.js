import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { setCategoryId } from "../../store/StoreDataSlice";
import { useDispatch, useSelector } from "react-redux";
import HomeScreenCategory from "./HomeScreenCategory";
import { defaultCategoryImg } from "../../Constants/defaults";
import { allCategorie } from "../../Constants/Constant";
import colors from "../../Constants/colors";

const RoundCategoryView = ({ onClickCategory = () => {} }) => {
  const dispatch = useDispatch();
  const categoryDataRes = useSelector((state) => state.category.categoryData);
  const categoryId = useSelector((state) => state.storeData.categoryId);
  const [categoryData, setCategoryData] = useState(null);
  useEffect(() => {
    setCategoryData(categoryDataRes);
  }, [categoryDataRes]);
  const listFooterComponent = () => {
    return (
        <ActivityIndicator
          // style={{ paddingVertical: verticalScale(20)}}
          size={"large"}
          color={colors.themeColor}
        />
 
    );
  };
  const renderCategory = ({ item, index }) => {
  
    return (
      <HomeScreenCategory
        item={item}
        data={categoryData}
        index={index}
        selectedCategory={categoryId}
        onClick={() => {
          dispatch(setCategoryId(item?.id));
          onClickCategory(item?.id);
        }}
      />
    );
  };
  return (
    <View style={styles.storyView}>
       <HomeScreenCategory
        item={allCategorie}
        single={true}
        selectedCategory={categoryId}
        onClick={() => {
          dispatch(setCategoryId(allCategorie?.id));
          onClickCategory(allCategorie.id);
        }}
      />
      <FlatList
        data={categoryData}
        keyExtractor={(item, index) => `category${item.id}_${index}`}
        showsHorizontalScrollIndicator={false}
        horizontal
        onEndReachedThreshold={1}
        renderItem={renderCategory}
        // ListFooterComponent={listFooterComponent}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
};

export default RoundCategoryView;

const styles = StyleSheet.create({
  storyView: {
    marginTop: verticalScale(10),
    flexDirection: "row",
  },
});
