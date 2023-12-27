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

const OtherUserProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    otherUserDetail: userDetail,
    contentData: contentData,
    error: contentError,
    isLoading: contentLoading,
  } = useSelector((state) => state.getContentByUserId);
  const likeDataRes = useSelector(
    (state) => state.getAddContentByCategory.likeData
  );
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    if (userDetail != null && userDetail?.Success) {
      dispatch(getContentByUserIdApi(userDetail?.Data?.userId, 1, 50));
    }
  }, [userDetail]);
  useEffect(() => {
    if (contentData != null && contentData.Success) {
      setPostData(contentData?.Data);
    }
  }, [contentData]);
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
  if (contentLoading) {
    return <Loading />;
  }
  if (contentError != null && !contentError.Success) {
    return (
      <ServerError msg={contentError?.ErrorMessage || "Some error occured"} />
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
        <FriendlyMsg msg={"Ad Not Found"} />
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
    </SafeAreaView>
  );
};

export default OtherUserProfile;

const styles = StyleSheet.create({});
