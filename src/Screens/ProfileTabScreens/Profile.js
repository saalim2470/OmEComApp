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
  useMemo,
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
import { useIsFocused } from "@react-navigation/native";
import ErrorMsg from "../../Components/ErrorScreens/ErrorMsg";
import colors from "../../Constants/colors";
import ShimmerLoading from "../../Components/LoadingComponents/ShimmerLoading";
import { getLoggedInUSerInfo } from "../../store/authSlices/LoginSlice";

const Profile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  let maxToRenderPerBatch = 100;
  const {
    userContentData: userContentRes,
    error: userContentError,
    isLoading: userContentLoading,
    isSuccess: userContentSuccess,
    page: userContentPage,
    pageSize: userContentPageSize,
    isReachedEnd: userContentReachedEnd,
    isMoreLoading: userContentMoreLoading,
    totalCount: userTotalContent,
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
  const {
    error: deleteError,
    statusCode: deleteStatusCode,
    deleteData: deleteDataRes,
    isLoading: deleteLoading,
  } = useSelector((state) => state.deleteAdContent);
  const [postData, setPostData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  const userDataResMemoized = useMemo(() => userContentRes, [userContentRes]);
  useEffect(() => {
    dispatch(getLoggedInUSerInfo());
  }, [refreshing]);

  useEffect(() => {
    getUserContent();
  }, [userContentPage, refreshing]);

  useEffect(() => {
    if (deleteDataRes !== null && deleteDataRes?.Success)
      dispatch(resetUserContentPage());
  }, [deleteDataRes?.Success]);
  useEffect(() => {
    if (userDataResMemoized != null && userContentSuccess) {
      setPostData(userDataResMemoized);
      setRefreshing(false);
    }
  }, [userDataResMemoized, userContentSuccess]);
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
  return (
    <SafeAreaView style={commonStyle.container}>
      <ProfileScreenTopView
        profileData={userDetail}
        isEditBtn={true}
        totalPost={userTotalContent}
      />
      {deleteLoading ? (
        <Loading />
      ) : !refreshing && userContentLoading ? (
        // <Loading />
        <ShimmerLoading />
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
          maxToRenderPerBatch={maxToRenderPerBatch}
          updateCellsBatchingPeriod={maxToRenderPerBatch / 2}
          ListFooterComponent={listFooterComponent}
          onEndReached={onReachedEnd}
          onEndReachedThreshold={1}
          removeClippedSubviews={true}
          // windowSize={10}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
