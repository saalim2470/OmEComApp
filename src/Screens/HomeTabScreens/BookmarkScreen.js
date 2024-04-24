import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
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
import {
  getSavedContentApi,
  resetSavedAdContentPage,
  setSavedContentPage,
} from "../../store/AdContentSlices/GetSavedContent";
import CustomeHeader from "../../Components/CustomeHeader";
import ShimmerLoading from "../../Components/LoadingComponents/ShimmerLoading";
import CustomeFlatlist from "../../Components/CustomeFlatlist";
import useErrorHook from "../../CustomeHooks/useErrorHook";
import useLikeHook from "../../CustomeHooks/useLikeHook";

const BookmarkScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const maxToRenderPerBatch = 100;
  const isFocused = useIsFocused();
  const type='saved'
  const {
    savedContent: userContentRes,
    error: userContentError,
    isLoading: userContentLoading,
    isSuccess: userContentSuccess,
    page: userContentPage,
    pageSize: userContentPageSize,
    isReachedEnd: userContentReachedEnd,
    isMoreLoading: userContentMoreLoading,
  } = useSelector((state) => state.getSavedContent);
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
  // const [postData, setPostData] = useState([]);
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
    totalComment,
    type
  );
  const [refreshing, setRefreshing] = useState(false);
  const [currentPost, setCurrentPost] = useState();
  const { apiShowError, setApiShowError } = useErrorHook(
    likeError || saveError || deleteError,
    likeErrorCode || saveErrorCode || deleteStatusCode
  );
  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen focused");
      getSavedContent();
      return () => {
        console.log("Screen unfocused");
        setCurrentPost(null);
      };
    }, [refreshing, userContentPage])
  );
  // useEffect(() => {
  //   getSavedContent();
  // }, [isFocused]);
  useEffect(() => {
    if (userContentRes != null && userContentSuccess) {
      setPostData(userContentRes);
      setRefreshing(false);
    }
  }, [userContentRes, userContentSuccess]);
  useEffect(() => {
    if (userContentError != null && !userContentError?.Success) {
      setRefreshing(false);
    }
  }, [userContentError]);

  const getSavedContent = () => {
    dispatch(getSavedContentApi(userContentPage, userContentPageSize));
  };
  const onClickModalBtn = () => {
    dispatch(resetLikeData());
    dispatch(resetSaveData());
    dispatch(resetDeleteAdContentData());
    setApiShowError({
      ...apiShowError,
      show: false,
    });
  };
  const renderItem = ({ item, index }) => {
    return (
      <FeedCard
        itemData={item?.adContent}
        currentPost={currentPost}
        onClickMoreBtn={() => {
          navigation.navigate(screenName.productDetail, {
            data: item?.adContent,
          });
        }}
      />
    );
  };
  const onRefresh = useCallback(() => {
    dispatch(resetSavedAdContentPage());
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
      dispatch(setSavedContentPage(userContentPage + 1));
    }
  };
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentPost(viewableItems[0].item?.adContentID);
    }
  }).current;
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"Saved Items"} />
      {(!refreshing && userContentLoading) || deleteLoading ? (
        // <Loading />
        <ShimmerLoading />
      ) : userContentError != null && !userContentError.Success ? (
        <ErrorMsg />
      ) : !userContentLoading && postData.length <= 0 ? (
        <FriendlyMsg msgWithImage={"No Saved Ads"} />
      ) : (
        <View style={{ flex: 1, marginBottom: verticalScale(10) }}>
          <CustomeFlatlist
            data={postData}
            renderItem={renderItem}
            onEndReached={onReachedEnd}
            listFooterComponent={listFooterComponent}
            onRefresh={onRefresh}
            refreshing={refreshing}
            onViewableItemsChanged={onViewableItemsChanged}
          />
        </View>
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

export default BookmarkScreen;

const styles = StyleSheet.create({});
