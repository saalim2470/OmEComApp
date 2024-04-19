import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import MainHeader from "../../Components/MainHeader";
import commonStyle from "../../Constants/commonStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Dialog, Divider } from "react-native-paper";
import FeedCard from "../../Components/ProductComponent/FeedCard";
import screenName from "../../Constants/screenName";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../../Components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomeAlertModal from "../../Components/CustomeAlertModal";
import {
  getAdContentByCategory,
  getAllContentApi,
  resetAdContent,
  resetAdContentData,
  resetPage,
  setError,
  setGetAdContentPage,
} from "../../store/AdContentSlices/GetAdContentSlice";
import colors from "../../Constants/colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import FriendlyMsg from "../../Components/ErrorScreens/FriendlyMsg";
import { resetSaveData } from "../../store/AdContentSlices/SaveContentSlice";
import { resetLikeData } from "../../store/AdContentSlices/LikeSlice";
import RoundCategoryView from "../../Components/HomeScreenComponent/RoundCategoryView";
import ErrorMsg from "../../Components/ErrorScreens/ErrorMsg";
import ShimmerLoading from "../../Components/LoadingComponents/ShimmerLoading";
import useLikeHook from "../../CustomeHooks/useLikeHook";
import ListingComponent from "../../Components/ListingComponent";
import CustomeFlatlist from "../../Components/CustomeFlatlist";
import useErrorHook from "../../CustomeHooks/useErrorHook";

const MainHome = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.storeData.categoryId);
  const {
    contentData: contentDataRes,
    isLoading: contentDataLoading,
    isSuccess: contentDataSuccess,
    error: contentDataError,
    statusCode: statusCode,
    isMoreLoading: contentMoreLoading,
    isReachedEnd: contentReachedEnd,
    page: contentDataPage,
    pageSize: contentDataPageSize,
  } = useSelector((state) => state.getAddContentByCategory);

  const {
    error: likeError,
    statusCode: likeErrorCode,
    likeData: likeDataRes,
  } = useSelector((state) => state.like);
  const {
    error: saveError,
    statusCode: saveErrorCode,
    saveData: saveDataRes,
  } = useSelector((state) => state.saveContent);
  const {
    isSuccess: getCommentSuccesss,
    totalCount: totalComment,
    contentId: commentId,
  } = useSelector((state) => state.getCommentByContentId);
  const { postData, setPostData } = useLikeHook(
    likeDataRes,
    saveDataRes,
    commentId,
    getCommentSuccesss,
    totalComment
  );
  // const [postData, setPostData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPost, setCurrentPost] = useState();
  const { apiShowError, setApiShowError } = useErrorHook(
    likeError || saveError,
    likeErrorCode || saveErrorCode
  );
  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen focused");
      return () => {
        console.log("Screen unfocused");
        setCurrentPost(null);
      };
    }, [])
  );
  const contentDataResMemoized = useMemo(
    () => contentDataRes,
    [contentDataRes]
  );
  useEffect(() => {
    getContentDataByCategory(categoryId);
  }, [categoryId, contentDataPage, refreshing]);

  useEffect(() => {
    if (contentDataResMemoized != null && contentDataSuccess) {
      setPostData(contentDataResMemoized);
      setRefreshing(false);
    }
  }, [contentDataResMemoized, contentDataSuccess]);
  const onRefresh = useCallback(() => {
    dispatch(resetPage());
    setRefreshing(true);
  }, []);
  const getContentDataByCategory = (categoryID) => {
    if (categoryId === 0) {
      dispatch(getAllContentApi(contentDataPage, contentDataPageSize));
    } else {
      dispatch(
        getAdContentByCategory(categoryId, contentDataPage, contentDataPageSize)
      );
    }
  };
  const onClickModalBtn = () => {
    dispatch(setError(null));
    dispatch(resetSaveData());
    dispatch(resetLikeData());
    setApiShowError({ ...apiShowError, show: false });
  };
  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <FeedCard
          itemData={item}
          currentPost={currentPost}
          onClickMoreBtn={() => {
            navigation.navigate(screenName.productDetail, { data: item });
          }}
        />
      );
    },
    [navigation, currentPost]
  );
  const listFooterComponent = () => {
    return (
      contentMoreLoading && (
        <ActivityIndicator
          style={{ paddingVertical: verticalScale(20) }}
          size={"large"}
          color={colors.themeColor}
        />
      )
    );
  };
  const onReachedEnd = () => {
    if (!contentReachedEnd) {
      dispatch(setGetAdContentPage(contentDataPage + 1));
    }
  };
  const onClickCategory = (id) => {
    dispatch(resetPage());
  };
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentPost(viewableItems[0].item?.id);
    }
  }).current;

  return (
    <SafeAreaView style={commonStyle.container}>
      <MainHeader navigation={navigation} />
      <RoundCategoryView
        onClickCategory={(id) => {
          onClickCategory(id);
        }}
      />
      <Divider style={{ marginVertical: verticalScale(8) }} />
      {!refreshing && contentDataLoading ? (
        // <Loading />
        <ShimmerLoading />
      ) : !contentDataLoading && contentDataError != null ? (
        <ErrorMsg />
      ) : !contentDataLoading && postData?.length <= 0 ? (
        <FriendlyMsg msgWithImage={"Content not availaibale"} />
      ) : (
        <CustomeFlatlist
          data={postData}
          renderItem={renderItem}
          onEndReached={onReachedEnd}
          listFooterComponent={listFooterComponent}
          onRefresh={onRefresh}
          refreshing={refreshing}
          onViewableItemsChanged={onViewableItemsChanged}
        />
      )}
      <CustomeAlertModal
        isVisible={apiShowError.show}
        title={apiShowError.title}
        msg={apiShowError.msg}
        type={apiShowError.type}
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
