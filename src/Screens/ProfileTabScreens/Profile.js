import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import ProfileScreenTopView from "../../Components/ProfileScreenComponent/ProfileScreenTopView";
import { Divider, Menu } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { getUserContentApi } from "../../store/profileSlices/GetUserContentSlice";
import Loading from "../../Components/Loading";
import ServerError from "../../Components/ErrorScreens/ServerError";
import ProfileFeedCard from "../../Components/ProfileScreenComponent/ProfileFeedCard";
import FriendlyMsg from "../../Components/ErrorScreens/FriendlyMsg";

const Profile = ({ route }) => {
  const dispatch = useDispatch();
  const {
    userContentData: userContentRes,
    error: userContentError,
    isLoading: userContentLoading,
    isSuccess: userContentSuccess,
  } = useSelector((state) => state.getUSerContent);
  const userDetail = useSelector((state) => state.login?.userDetail);
  const likeDataRes = useSelector(
    (state) => state.getAddContentByCategory.likeData
  );
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    dispatch(getUserContentApi(1, 70));
  }, []);
  useEffect(() => {
    if (userContentSuccess) {
      setPostData(userContentRes);
    }
  }, [userContentSuccess]);
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

  const renderItem = ({ item, index }) => {
    return <ProfileFeedCard itemData={item} />;
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <ProfileScreenTopView profileData={userDetail} isEditBtn={true} />
      {userContentLoading ? (
        <Loading />
      ) : userContentError != null && !userContentError.Success ? (
        <ServerError
          msg={
            userContentError?.ErrorMessage ||
            "Some error occured during fetching data"
          }
        />
      ) : userContentRes.length <= 0 ? (
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
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
