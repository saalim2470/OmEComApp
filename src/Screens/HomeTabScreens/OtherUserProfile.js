import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import HeaderWithMiddleName from "../../Components/HeaderWithMiddleName";
import ProfileScreenTopView from "../../Components/ProfileScreenComponent/ProfileScreenTopView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getContentByUserIdApi,
  getOtherUserInfoApi,
  resetContentByUserIdPage,
  setUserContentPage,
} from "../../store/profileSlices/GetContentByUserId";
import { Divider } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Loading from "../../Components/Loading";
import FriendlyMsg from "../../Components/ErrorScreens/FriendlyMsg";
import FeedCard from "../../Components/ProductComponent/FeedCard";
import screenName from "../../Constants/screenName";
import CustomeAlertModal from "../../Components/CustomeAlertModal";
import { resetLikeData } from "../../store/AdContentSlices/LikeSlice";
import { resetSaveData } from "../../store/AdContentSlices/SaveContentSlice";
import ErrorMsg from "../../Components/ErrorScreens/ErrorMsg";
import colors from "../../Constants/colors";
import useLikeHook from "../../CustomeHooks/useLikeHook";
import ServerError from "../../Components/ErrorScreens/ServerError";
import { useFocusEffect } from "@react-navigation/native";
import CustomeFlatlist from "../../Components/CustomeFlatlist";
import useErrorHook from "../../CustomeHooks/useErrorHook";

const OtherUserProfile = ({ navigation, route }) => {
  const maxToRenderPerBatch = 100;
  const dispatch = useDispatch();
  const { userId } = route?.params;
  const {
    otherUserDetail: userDetail,
    contentData: contentData,
    error: contentError,
    isLoading: contentLoading,
    statusCode: statusCode,
    page: userContentPage,
    pageSize: userContentPageSize,
    isMoreLoading: userContentMoreLoading,
    isReachedEnd: userContentReachedEnd,
    isSuccess: userContentSuccess,
    totalCount: userTotalContent,
  } = useSelector((state) => state.getContentByUserId);
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
    followResData: follow_unFollowData,
    isLoading: follow_UnFollowLoading,
  } = useSelector((state) => state.follow_UnFollowSlice);
  const { postData, setPostData } = useLikeHook(likeDataRes, saveDataRes);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPost, setCurrentPost] = useState();
  const [userProfileDetail, setUserProfileDetail] = useState(null);
  const { apiShowError, setApiShowError } = useErrorHook(
    likeError || saveError,
    likeErrorCode || saveErrorCode
  );
  console.log(useSelector((state) => state.getContentByUserId));
  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen focused");
      dispatch(getOtherUserInfoApi(route?.params?.userId));
      return () => {
        console.log("Screen unfocused other user");
        setCurrentPost(null);
      };
    }, [])
  );

  useEffect(() => {
    if (userId) dispatch(getOtherUserInfoApi(userId));
  }, [userId]);
  useEffect(() => {
    if (userDetail !== null && userDetail?.Success) {
      setUserProfileDetail(userDetail?.Data);
      getContent();
    }
  }, [userContentPage, refreshing, userDetail]);
  useEffect(() => {
    if (follow_unFollowData !== null && follow_unFollowData?.Success) {
      setUserProfileDetail({
        ...userProfileDetail,
        isCurrentUserFollowed: follow_unFollowData?.Data?.isFollow,
        totalFollowers: follow_unFollowData?.Data?.totalFollowers,
      });
    }
  }, [follow_unFollowData]);

  useEffect(() => {
    if (contentData != null && userContentSuccess) {
      setPostData(contentData);
      setRefreshing(false);
    }
  }, [contentData, userContentSuccess]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    console.log(viewableItems);
    if (viewableItems && viewableItems.length > 0) {
      setCurrentPost(viewableItems[0].item?.id);
    }
  }).current;
  const getContent = () => {
    dispatch(
      getContentByUserIdApi(
        // userDetail?.Data?.userId,
        userId,
        userContentPage,
        userContentPageSize
      )
    );
  };
  console.log("-=-=-=6 getcontent");
  const onClickModalBtn = () => {
    dispatch(resetLikeData());
    dispatch(resetSaveData());
    setApiShowError({
      ...apiShowError,
      show: false,
    });
  };
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
  const onRefresh = useCallback(() => {
    dispatch(resetContentByUserIdPage());
    setRefreshing(true);
  }, []);

  if (contentError != null && !contentError?.Success) {
    return (
      <ServerError
        msg={contentError?.ErrorMessage || "Some error occured"}
        statusCode={statusCode}
      />
    );
  }
  //   if (!refreshing && contentLoading) {
  //   return <Loading />;
  // }
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
  return (
    <SafeAreaView style={commonStyle.container}>
      <HeaderWithMiddleName
        title={`${userProfileDetail?.firstName} ${userProfileDetail?.lastName}`}
      />
      <ProfileScreenTopView
        isEditBtn={false}
        profileData={userProfileDetail}
        totalPost={userTotalContent}
      />
      {!refreshing && contentLoading ? (
        <Loading />
      ) : postData != null && postData?.length <= 0 ? (
        <FriendlyMsg />
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

export default OtherUserProfile;

const styles = StyleSheet.create({});
