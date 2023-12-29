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
import FriendlyMsg from "../../Components/ErrorScreens/FriendlyMsg";
import CustomeAlertModal from "../../Components/CustomeAlertModal";
import { resetLikeData } from "../../store/AdContentSlices/LikeSlice";
import { resetSaveData } from "../../store/AdContentSlices/SaveContentSlice";
import FeedCard from "../../Components/ProductComponent/FeedCard";
import screenName from "../../Constants/screenName";

const Profile = ({navigation, route }) => {
  const dispatch = useDispatch();
  const {
    userContentData: userContentRes,
    error: userContentError,
    isLoading: userContentLoading,
    isSuccess: userContentSuccess,
  } = useSelector((state) => state.getUSerContent);
  const userDetail = useSelector((state) => state.login?.userDetail);
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
    dispatch(getUserContentApi(1, 70));
  }, []);
  useEffect(() => {
    if (userContentRes!=null&&userContentRes?.Success) {
      setPostData(userContentRes?.Data);
    }
  }, [userContentRes]);
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
  const renderItem = ({ item, index }) => {
    return (
      <FeedCard
        itemData={item}
        profile={true}
        onClickMoreBtn={() => {
          navigation.navigate(screenName.productDetail, { data: item });
        }}
      />
    );
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

export default Profile;

const styles = StyleSheet.create({});
