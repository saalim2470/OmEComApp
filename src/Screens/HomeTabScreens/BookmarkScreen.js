import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import commonStyle from "../../Constants/commonStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Divider, Menu } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserContentPage,
} from "../../store/profileSlices/GetUserContentSlice";
import Loading from "../../Components/Loading";
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
import {
  getSavedContentApi,
  setSavedContentPage,
} from "../../store/AdContentSlices/GetSavedContent";
import CustomeHeader from "../../Components/CustomeHeader";

const BookmarkScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
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
  const [refreshing, setRefreshing] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  useEffect(() => {
    getSavedContent();
  }, [isFocused, deleteDataRes?.Success]);
  useEffect(() => {
    if (userContentRes != null && userContentSuccess) {
      setPostData(userContentRes);
      setRefreshing(false);
    }
  }, [userContentRes,userContentSuccess]);
  useEffect(() => {
    if (likeDataRes != null && likeDataRes.Success) {
      updateData(likeDataRes?.Data);
    }
  }, [likeDataRes]);
  useEffect(() => {
    if (saveDataRes != null && saveDataRes.Success) {
      const updatedData=postData.filter((item)=>item?.adContent?.id!==saveDataRes?.Data?.adContentID)
      setPostData(updatedData)
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

  const getSavedContent = () => {
    dispatch(getSavedContentApi(userContentPage, userContentPageSize));
  };
  const updateData = (data) => {
    const updatedData = postData.map((item) => {
      if (item?.adContent?.id === data.contentId) {
        return {
          ...item,
          adContent:{
            ...item.adContent,
            isCurrentUserLiked: data.isLiked,
            totalLikes: data.totalLikes,
          },
       
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
        itemData={item?.adContent}
        onClickMoreBtn={() => {
          navigation.navigate(screenName.productDetail, { data: item?.adContent });
        }}
      />
    );
  };
  const onRefresh = useCallback(() => {
    dispatch(setSavedContentPage(1));
    setRefreshing(true);
    getSavedContent();
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
      getSavedContent();
    }
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"Saved Items"} />
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
          initialNumToRender={10}
          ListFooterComponent={listFooterComponent}
          onEndReached={onReachedEnd}
          onEndReachedThreshold={1}
          maxToRenderPerBatch={10}
          windowSize={10}
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

export default BookmarkScreen;

const styles = StyleSheet.create({});
