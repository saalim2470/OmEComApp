import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useEffect } from "react";
import commonStyle from "../../Constants/commonStyle";
import MainHeader from "../../Components/MainHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryData,
  setCategoryPage,
} from "../../store/categorySlices/CategorySlice";
import Loading from "../../Components/Loading";
import CategoryView from "../../Components/HomeScreenComponent/CategoryView";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ServerError from "../../Components/ErrorScreens/ServerError";
import FriendlyMsg from "../../Components/ErrorScreens/FriendlyMsg";

const HomeScreenIcons = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const categoryLoading = useSelector((state) => state.category.isLoading);
  const categoryData = useSelector((state) => state.category.categoryData);
  const categoryStatusCode = useSelector((state) => state.category.statusCode);
  const categoryError = useSelector((state) => state.category.error);
  const categoryPage = useSelector((state) => state.category.page);
  const categoryPageSize = useSelector((state) => state.category.pageSize);
  const categoryReachedEnd = useSelector(
    (state) => state.category.isReachedEnd
  );
  const categoryMoreLoading = useSelector(
    (state) => state.category.isMoreLoading
  );
  const categorySuccess = useSelector((state) => state.category.isSuccess);
  const [category, setCategory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getCategory();
  }, []);
  useEffect(() => {
    if (categorySuccess) {
      setCategory(categoryData);
      setRefreshing(false);
    }
  }, [categoryData, categorySuccess]);
  useEffect(() => {
    if (categoryError !== null && categoryStatusCode !== null) {
      setRefreshing(false);
    }
  }, [categoryError, categoryStatusCode]);

  const getCategory = () => {
    dispatch(getCategoryData(categoryPage, categoryPageSize));
  };
  const onRefresh = useCallback(() => {
    dispatch(setCategoryPage(1));
    setRefreshing(true);
    getCategory();
  }, []);
  return (
    <SafeAreaView style={commonStyle.container}>
      <MainHeader navigation={navigation} />
      {!refreshing && categoryLoading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {!categoryLoading && categoryStatusCode != null ? (
            <ServerError statusCode={categoryStatusCode} />
          ) : category.length <= 0 ? (
            <FriendlyMsg />
          ) : (
            <CategoryView data={category} />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default HomeScreenIcons;

const styles = StyleSheet.create({});
