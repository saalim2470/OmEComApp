import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import HeaderWithMiddleName from "../../Components/HeaderWithMiddleName";
import ProfileScreenTopView from "../../Components/ProfileScreenComponent/ProfileScreenTopView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getContentByUserIdApi,
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

const OtherUserProfile = ({ navigation }) => {
  const maxToRenderPerBatch = 100;
  const dispatch = useDispatch();
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
  const [postData, setPostData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userProfileDetail, setUserProfileDetail] = useState(null);
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
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

  const getContent = () => {
    dispatch(
      getContentByUserIdApi(
        userDetail?.Data?.userId,
        userContentPage,
        userContentPageSize
      )
    );
  };
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
  const onClickModalBtn = () => {
    dispatch(resetLikeData());
    dispatch(resetSaveData());
    setShowAlert({
      ...showAlert,
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
  if (!refreshing && contentLoading) {
    return <Loading />;
  }
  if (contentError != null && !contentError.Success) {
    return (
      // <ServerError msg={contentError?.ErrorMessage || "Some error occured"} />
      <ErrorMsg statusCode={statusCode} />
    );
  }
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
      {contentData != null && contentData?.length <= 0 ? (
        <FriendlyMsg />
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
          ListFooterComponent={listFooterComponent}
          onEndReached={onReachedEnd}
          onEndReachedThreshold={1}
          initialNumToRender={40}
          maxToRenderPerBatch={maxToRenderPerBatch}
          updateCellsBatchingPeriod={maxToRenderPerBatch / 2}
          // windowSize={10}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
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

export default OtherUserProfile;

const styles = StyleSheet.create({});
