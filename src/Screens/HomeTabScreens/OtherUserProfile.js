import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import HeaderWithMiddleName from "../../Components/HeaderWithMiddleName";
import ProfileScreenTopView from "../../Components/ProfileScreenComponent/ProfileScreenTopView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getContentByUserIdApi } from "../../store/profileSlices/GetContentByUserId";
import { Divider } from "react-native-paper";
import ProfileFeedCard from "../../Components/ProfileScreenComponent/ProfileFeedCard";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Loading from "../../Components/Loading";
import ServerError from "../../Components/ErrorScreens/ServerError";
import FriendlyMsg from "../../Components/ErrorScreens/FriendlyMsg";
import FeedCard from "../../Components/ProductComponent/FeedCard";
import screenName from "../../Constants/screenName";
import CustomeAlertModal from "../../Components/CustomeAlertModal";
import { resetLikeData } from "../../store/AdContentSlices/LikeSlice";
import { resetSaveData } from "../../store/AdContentSlices/SaveContentSlice";
import ErrorMsg from "../../Components/ErrorScreens/ErrorMsg";

const OtherUserProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    otherUserDetail: userDetail,
    contentData: contentData,
    error: contentError,
    isLoading: contentLoading,
    statusCode: statusCode,
  } = useSelector((state) => state.getContentByUserId);
  const a = useSelector((state) => state.getContentByUserId);
  console.log("-=-=-=other user-=-=-=-", a);
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
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  useEffect(() => {
    if (userDetail != null && userDetail?.Success) {
      dispatch(getContentByUserIdApi(userDetail?.Data?.userId, 1, 50));
    }
  }, [userDetail]);
  useEffect(() => {
    if (contentData != null && contentData.Success) {
      setPostData(contentData?.Data?.items);
    }
  }, [contentData]);
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
  if (contentLoading) {
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
        title={`${userDetail?.Data?.firstName} ${userDetail?.Data?.lastName}`}
      />
      <ProfileScreenTopView isEditBtn={false} profileData={userDetail?.Data} />
      {contentData != null && contentData?.Data?.length <= 0 ? (
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
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          renderItem={renderItem}
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
