import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import MainHeader from "../../Components/MainHeader";
import commonStyle from "../../Constants/commonStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Divider } from "react-native-paper";
import FeedCard from "../../Components/ProductComponent/FeedCard";
import screenName from "../../Constants/screenName";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../../Components/Loading";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomeAlertModal from "../../Components/CustomeAlertModal";
import {
  getAdContentByCategory,
  setError,
} from "../../store/AdContentSlices/GetAdContentSlice";
import HomeScreenCategory from "../../Components/HomeScreenComponent/HomeScreenCategory";
import colors from "../../Constants/colors";
import ServerError from "../../Components/ErrorScreens/ServerError";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import FriendlyMsg from "../../Components/ErrorScreens/FriendlyMsg";

const MainHome = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const categoryId = useSelector((state) => state.storeData.categoryId);
  const categoryDataRes = useSelector((state) => state.category.categoryData);
  const contentDataRes = useSelector(
    (state) => state.getAddContentByCategory.contentData
  );
  const likeDataRes = useSelector(
    (state) => state.getAddContentByCategory.likeData
  );
  const contentdata = useSelector((state) => state.getAddContentByCategory);
  const contentDataLoading = useSelector(
    (state) => state.getAddContentByCategory.isLoading
  );
  const [categoryData, setCategoryData] = useState(null);
  const [pageSize, setPageSize] = useState(70);
  const [pageNumber, setPageNumber] = useState(1);
  const [postData, setPostData] = useState([]);
  const [isReachedEnd, setIsReachedEnd] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [contentData, setContentData] = useState(null);
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  useFocusEffect(
    useCallback(() => {
      setSelectedCategory(categoryId);
      getContentDataByCategory(categoryId);
    }, [categoryId])
  );

  useEffect(() => {
    if (
      contentdata?.error != null &&
      !contentdata?.error?.Success &&
      contentdata?.statusCode === 401
    ) {
      setShowAlert({
        show: true,
        title: "Authentication Error",
        msg: "Please Login to continue",
        type: "error",
      });
    }
  }, [contentdata?.error]);
  useEffect(() => {
    setCategoryData(categoryDataRes?.Data);
  }, [categoryDataRes]);
  useEffect(() => {
    if (contentDataRes != null && contentDataRes.Success) {
      setPostData(contentDataRes?.Data);
    }
  }, [contentDataRes]);
  useEffect(() => {
    if (likeDataRes != null && likeDataRes.Success) {
      const val = [];
      postData?.map((item, index) => {
        if (item?.id === likeDataRes?.Data?.contentId) {
          val.push({
            ...item,
            isCurrentUserLiked: likeDataRes?.Data?.isLiked,
            totalLikes: likeDataRes?.Data?.totalLikes,
          });
        } else {
          val.push(item);
        }
      });
      setPostData(val);
    }
  }, [likeDataRes]);

  // useEffect(() => {
  //   if (contentdata?.contentData.length > 0) {
  //     setPostData([...postData, ...contentdata?.contentData]);
  //   } else if (contentdata?.contentData.length == 0) {
  //     setIsReachedEnd(true);
  //   }
  // }, [contentdata?.isSuccess]);

  const getContentDataByCategory = (categoryID) => {
    dispatch(getAdContentByCategory(categoryID, 1, pageSize));
  };
  const onClickModalBtn = () => {
    dispatch(setError(null));
    setShowAlert({ ...showAlert, show: false });
  };
  const renderItem = ({ item, index }) => {
    return (
      <FeedCard
        itemData={item}
        onClickMoreBtn={() => {
          navigation.navigate(screenName.productDetail, { data: item });
        }}
      />
    );
  };
  const renderCategory = ({ item, index }) => {
    return (
      <HomeScreenCategory
        item={item}
        data={categoryData}
        index={index}
        selectedCategory={selectedCategory}
        onClick={() => {
          setSelectedCategory(item?.id);
          getContentDataByCategory(item.id);
        }}
      />
    );
  };
  const listFooterComponent = () => {
    return (
      contentDataLoading && (
        <ActivityIndicator
          style={{ marginVertical: verticalScale(20) }}
          size={"large"}
          color={colors.themeColor}
        />
      )
    );
  };
  const onReachedEnd = () => {
    if (!isReachedEnd) {
      getContentDataByCategory(selectedCategory);
    }
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <MainHeader />
      <View style={styles.storyView}>
        <FlatList
          data={categoryData}
          keyExtractor={(item, index) => `category${item.id}_${index}`}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={renderCategory}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      </View>
      <Divider style={{ marginVertical: verticalScale(8) }} />
      {contentDataLoading ? (
        <Loading />
      ) : !contentDataLoading && contentdata?.error != null ? (
        <ServerError />
      ) : !contentDataLoading && postData?.length <= 0 ? (
        <FriendlyMsg msg={"Content not availaibale"} />
      ) : (
        <FlatList
          data={postData}
          keyExtractor={(item, index) => {
            `data_${item.id}_${index}`;
          }}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={1}
          onEndReached={() => {
            // onReachedEnd();
          }}
          ItemSeparatorComponent={
            <Divider style={{ marginBottom: verticalScale(8) }} />
          }
          // ListFooterComponent={listFooterComponent}
          renderItem={renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      )}
      <CustomeAlertModal
        isVisible={showAlert.show}
        title={showAlert.title}
        msg={showAlert.msg}
        type={showAlert.type}
        onClickBtn={() => {
          onClickModalBtn();
        }}
      />
    </SafeAreaView>
  );
};

export default MainHome;

const styles = StyleSheet.create({
  storyView: {
    marginTop: verticalScale(10),
  },
  msgTxt: {
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
  },
});
