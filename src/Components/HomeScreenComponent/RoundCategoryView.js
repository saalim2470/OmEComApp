import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { setCategoryId } from "../../store/StoreDataSlice";
import { useDispatch, useSelector } from "react-redux";
import HomeScreenCategory from "./HomeScreenCategory";
import { defaultCategoryImg } from "../../Constants/defaults";
import { allCategorie } from "../../Constants/Constant";
import colors from "../../Constants/colors";
import {
  getCategoryData,
  setCategoryPage,
} from "../../store/categorySlices/CategorySlice";

const RoundCategoryView = ({ onClickCategory = () => {} }) => {
  const dispatch = useDispatch();
  const categoryDataRes = useSelector((state) => state.category.categoryData);
  const categoryId = useSelector((state) => state.storeData.categoryId);
  const categoryPage = useSelector((state) => state.category.page);
  const categoryPageSize = useSelector((state) => state.category.pageSize);
  const categorySuccess = useSelector((state) => state.category.isSuccess);
  const categoryMoreLoading = useSelector(
    (state) => state.category.isMoreLoading
  );
  const categoryReachedEnd = useSelector(
    (state) => state.category.isReachedEnd
  );
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    if (categoryDataRes && categorySuccess) {
      setCategoryData(categoryDataRes);
    }
  }, [categoryDataRes, categorySuccess]);

  const getCategory = () => {
    dispatch(getCategoryData(categoryPage, categoryPageSize));
  };
  const listFooterComponent = () => {
    return (
      categoryMoreLoading && (
        <ActivityIndicator size={"large"} color={colors.themeColor} />
      )
    );
  };
  const onReachedEnd = () => {
    if (!categoryReachedEnd) {
      dispatch(setCategoryPage(categoryPage + 1));
      getCategory();
    }
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
        onEndReachedThreshold={0.1}
        renderItem={renderCategory}
        ListFooterComponent={listFooterComponent}
        onEndReached={onReachedEnd}
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
