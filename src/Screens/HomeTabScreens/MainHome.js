import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback, useMemo } from "react";
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
import { setCategoryId } from "../../store/StoreDataSlice";
import ShimmerLoading from "../../Components/LoadingComponents/ShimmerLoading";

const MainHome = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const maxToRenderPerBatch = 100;
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
  const a = useSelector((state) => state.getAddContentByCategory);
  console.log("-=-=-=content data-=---", a);

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
  const [postData, setPostData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  // useFocusEffect(
  //   useCallback(() => {
  //     dispatch(setGetAdContentPage(1));
  //     getContentDataByCategory(categoryId);
  //   }, [categoryId])
  // );
  const contentDataResMemoized = useMemo(
    () => contentDataRes,
    [contentDataRes]
  );
  useEffect(() => {
    // dispatch(setGetAdContentPage(1));
    getContentDataByCategory(categoryId);
  }, [categoryId, contentDataPage, refreshing]);

  useEffect(() => {
    if (
      contentDataError != null &&
      !contentDataError?.Success &&
      statusCode === 401
    ) {
      setRefreshing(false);
      setShowAlert({
        show: true,
        title: "Authentication Error",
        msg: "Please Login to continue",
        type: "error",
      });
    }
  }, [contentDataError]);
  useEffect(() => {
    if (contentDataResMemoized != null && contentDataSuccess) {
      setPostData(contentDataResMemoized);
      setRefreshing(false);
    }
  }, [contentDataResMemoized, contentDataSuccess]);
  useEffect(() => {
    if (likeDataRes != null && likeDataRes.Success) {
      updateData(likeDataRes?.Data, "like");
    }
  }, [likeDataRes]);
  useEffect(() => {
    if (saveDataRes != null && saveDataRes.Success) {
      updateData(saveDataRes?.Data, "save");
    }
  }, [saveDataRes]);
  useEffect(() => {
    const handleErrorCode = (code) => {
      if (code === 401) {
        showModal("UnAuthorized", "Please login to continue", "warning");
      } else if (likeError != null || saveError != null) {
        const errorMessage =
          likeError?.ErrorMessage ||
          saveError?.ErrorMessage ||
          "Some Error Occurred";
        showModal("Error", errorMessage, "error");
      }
    };

    handleErrorCode(likeErrorCode || saveErrorCode);
  }, [likeError, likeErrorCode, saveError, saveErrorCode]);
  const onRefresh = useCallback(() => {
    dispatch(resetPage());
    setRefreshing(true);
    // dispatch(setCategoryId(categoryId));
    // getContentDataByCategory(categoryId);
  }, []);

  const updateData = (data, actionType) => {
    const updatedData = postData.map((item) => {
      if (actionType === "like" && item.id === data.contentId) {
        return {
          ...item,
          isCurrentUserLiked: data.isLiked,
          totalLikes: data.totalLikes,
        };
      }
      if (actionType === "save" && item.id === data.adContentID) {
        return {
          ...item,
          isCurrentUserSaved: data.isSaved,
        };
      }
      return item;
    });
    setPostData(updatedData);
  };
  const showModal = (title, msg, type) => {
    setShowAlert({
      show: true,
      title: title,
      msg: msg,
      type: type,
    });
  };
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
      // getContentDataByCategory(categoryId);
    }
  };
  const onClickCategory = (id) => {
    // dispatch(resetAdContent());
    // dispatch(resetAdContentData());
    // dispatch(setCategoryId(id));
    // dispatch(setGetAdContentPage(1));
    // getContentDataByCategory(id);
    dispatch(resetPage());
  };
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
        <FriendlyMsg msg={"Content not availaibale"} />
      ) : (
        <FlatList
          data={postData}
          keyExtractor={(item, index) => {
            return `data_${item.id}_${index}`;
          }}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={1}
          onEndReached={() => {
            onReachedEnd();
          }}
          contentContainerStyle={{ gap: scale(10) }}
          ItemSeparatorComponent={
            <Divider style={{ marginBottom: verticalScale(8) }} />
          }
          ListFooterComponent={listFooterComponent}
          renderItem={renderItem}
          initialNumToRender={40}
          maxToRenderPerBatch={maxToRenderPerBatch}
          // windowSize={10}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={maxToRenderPerBatch / 2}
          refreshing={refreshing}
          onRefresh={onRefresh}
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
