import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import commonStyle from "../../Constants/commonStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import ProfileScreenTopView from "../../Components/ProfileScreenComponent/ProfileScreenTopView";
import { Divider, Menu } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserContentApi,
  resetUserContentPage,
  resetUserPage,
  setUserContentPage,
} from "../../store/profileSlices/GetUserContentSlice";
import Loading from "../../Components/Loading";
import ServerError from "../../Components/ErrorScreens/ServerError";
import FriendlyMsg from "../../Components/ErrorScreens/FriendlyMsg";
import CustomeAlertModal from "../../Components/CustomeAlertModal";
import { resetLikeData } from "../../store/AdContentSlices/LikeSlice";
import { resetSaveData } from "../../store/AdContentSlices/SaveContentSlice";
import FeedCard from "../../Components/ProductComponent/FeedCard";
import screenName from "../../Constants/screenName";
import { resetDeleteAdContentData } from "../../store/AdContentSlices/DeleteAdContent";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import ErrorMsg from "../../Components/ErrorScreens/ErrorMsg";
import colors from "../../Constants/colors";
import CustomeHeader from "../../Components/CustomeHeader";
import useLikeHook from "../../CustomeHooks/useLikeHook";

const MyAds = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  let maxToRenderPerBatch = 100;
  const { postData, setPostData } = useLikeHook(likeDataRes, saveDataRes);
  const {
    userContentData: userContentRes,
    error: userContentError,
    isLoading: userContentLoading,
    isSuccess: userContentSuccess,
    page: userContentPage,
    pageSize: userContentPageSize,
    isReachedEnd: userContentReachedEnd,
    isMoreLoading: userContentMoreLoading,
  } = useSelector((state) => state.getUSerContent);
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
    error: deleteError,
    statusCode: deleteStatusCode,
    deleteData: deleteDataRes,
    isLoading: deleteLoading,
  } = useSelector((state) => state.deleteAdContent);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPost, setCurrentPost] = useState();
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen focused");
      return () => {
        console.log("Screen unfocused");
        setCurrentPost(null);
      };
    }, [])
  );
  useEffect(() => {
    getUserContent();
  }, [isFocused, userContentPage, refreshing]);
  useEffect(() => {
    if (deleteDataRes !== null && deleteDataRes?.Success)
      dispatch(resetUserContentPage());
  }, [deleteDataRes?.Success]);
  useEffect(() => {
    if (userContentRes != null && userContentSuccess) {
      setPostData(userContentRes);
      setRefreshing(false);
    }
  }, [userContentRes]);
  useEffect(() => {
    const handleErrorCode = (code) => {
      if (code === 401) {
        showModal("UnAuthorized", "Please login to continue", "warning");
      } else if (
        likeError != null ||
        saveError != null ||
        deleteError != null
      ) {
        const errorMessage =
          likeError?.ErrorMessage ||
          saveError?.ErrorMessage ||
          deleteError?.ErrorMessage ||
          "Some Error Occurred";
        showModal("Error", errorMessage, "error");
      }
    };

    handleErrorCode(likeErrorCode || saveErrorCode || deleteStatusCode);
  }, [
    likeError,
    likeErrorCode,
    saveError,
    saveErrorCode,
    deleteError,
    deleteStatusCode,
  ]);
  useEffect(() => {
    if (userContentError != null && !userContentError?.Success) {
      setRefreshing(false);
    }
  }, [userContentError]);

  const getUserContent = () => {
    dispatch(getUserContentApi(userContentPage, userContentPageSize));
  };
  const showModal = (title, msg, type) => {
    setShowAlert({
      show: true,
      title: title,
      msg: msg,
      type: type,
    });
  };
  const onClickModalBtn = () => {
    dispatch(resetLikeData());
    dispatch(resetSaveData());
    dispatch(resetDeleteAdContentData());
    setShowAlert({
      ...showAlert,
      show: false,
    });
  };
  const renderItem = ({ item, index }) => {
    return (
      <FeedCard
        itemData={item}
        profile={true}
        currentPost={currentPost}
        onClickMoreBtn={() => {
          navigation.navigate(screenName.productDetail, { data: item });
        }}
      />
    );
  };
  const onRefresh = useCallback(() => {
    dispatch(resetUserContentPage());
    setRefreshing(true);
  }, []);
  const listFooterComponent = () => {
    return (
      userContentMoreLoading && (
        <ActivityIndicator
          style={{ paddingVertical: verticalScale(20) }}
          size={"large"}
          color={colors.themeColor}
        />
      )
    );
  };
  const onReachedEnd = () => {
    if (!userContentReachedEnd) {
      dispatch(setUserContentPage(userContentPage + 1));
    }
  };
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentPost(viewableItems[0].item?.id);
    }
  }).current;

  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"My Ads"} />
      {(!refreshing && userContentLoading) || deleteLoading ? (
        <Loading />
      ) : userContentError != null && !userContentError.Success ? (
        <ErrorMsg />
      ) : !userContentLoading && postData.length <= 0 ? (
        <FriendlyMsg msg={"Post Your First Ad"} />
      ) : (
        <FlatList
          data={postData}
          keyExtractor={(item, index) => {
            `data_${item.id}_${index}`;
          }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={
            <Divider style={{ marginBottom: verticalScale(8) }} />
          }
          initialNumToRender={40}
          ListFooterComponent={listFooterComponent}
          onEndReached={onReachedEnd}
          onEndReachedThreshold={1}
          maxToRenderPerBatch={maxToRenderPerBatch}
          updateCellsBatchingPeriod={maxToRenderPerBatch / 2}
          windowSize={5}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          fadeDuration={0}
          scrollEventThrottle={12}
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

export default MyAds;

const styles = StyleSheet.create({});
