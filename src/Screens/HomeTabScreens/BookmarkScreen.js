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
import { Divider, Menu } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading";
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

const BookmarkScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const maxToRenderPerBatch = 100;
  const isFocused = useIsFocused();
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
  const [postData, setPostData] = useState([]);
  const {
    isSuccess: getCommentSuccesss,
    totalCount: totalComment,
    contentId: commentId,
  } = useSelector((state) => state.getCommentByContentId);
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
    if (likeDataRes != null && likeDataRes.Success) {
      updateData(likeDataRes?.Data, "like");
    }
  }, [likeDataRes]);
  useEffect(() => {
    if (saveDataRes != null && saveDataRes.Success) {
      const updatedData = postData.filter(
        (item) => item?.adContent?.id !== saveDataRes?.Data?.adContentID
      );
      setPostData(updatedData);
    }
  }, [saveDataRes]);
  useEffect(() => {
    if (userContentError != null && !userContentError?.Success) {
      setRefreshing(false);
    }
  }, [userContentError]);
  useEffect(() => {
    if (getCommentSuccesss) {
      updateData(commentId, "comment");
    }
  }, [getCommentSuccesss]);

  const getSavedContent = () => {
    dispatch(getSavedContentApi(userContentPage, userContentPageSize));
  };
  const updateData = (data, type) => {
    switch (type) {
      case "like":
        like(data);
        break;
      case "comment":
        comment(data);
        break;
      default:
        break;
    }
    // const updatedData = postData.map((item) => {
    //   if (type === "like" && item?.adContent?.id === data.contentId) {
    //     return {
    //       ...item,
    //       adContent: {
    //         ...item.adContent,
    //         isCurrentUserLiked: data.isLiked,
    //         totalLikes: data.totalLikes,
    //       },
    //     };
    //   }
    //   if (type === "comment" && item?.adContent?.id === data) {
    //     return {
    //       ...item,
    //       totalComments: totalComment,
    //     };
    //   }
    //   return item;
    // });
    // setPostData(updatedData);
  };
  const like = (data) => {
    let newArray = [...postData];
    let currentData = newArray.find(
      (element, index) => element?.adContent?.id === data.contentId
    );
    const index = newArray.findIndex((x) => x?.adContent?.id === currentData?.adContent?.id);
    const newData = {
      ...currentData,
      adContent: {
        ...currentData.adContent,
        isCurrentUserLiked: data.isLiked,
        totalLikes: data.totalLikes,
      },
    };
    newArray[index] = newData;
    setPostData(newArray);
  };
  const comment = (id) => {
    let newArray = [...postData];
    let currentData = newArray.find((element, index) => element?.adContent?.id === id);
    const index = newArray.findIndex((x) => x?.adContent?.id === currentData?.adContent?.id);
    const newData = {
      ...currentData,
      adContent: {
        ...currentData.adContent,
        totalComments: totalComment,
      },
    };
    newArray[index] = newData;
    setPostData(newArray);
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
