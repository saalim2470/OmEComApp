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
  useRef,
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
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import ErrorMsg from "../../Components/ErrorScreens/ErrorMsg";
import colors from "../../Constants/colors";
import ShimmerLoading from "../../Components/LoadingComponents/ShimmerLoading";
import { getLoggedInUSerInfo } from "../../store/authSlices/LoginSlice";
import useLikeHook from "../../CustomeHooks/useLikeHook";
import CustomeFlatlist from "../../Components/CustomeFlatlist";
import useErrorHook from "../../CustomeHooks/useErrorHook";

const Profile = ({  route }) => {
  const navigation=useNavigation()
  const dispatch = useDispatch();
  const maxToRenderPerBatch = 100;
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
  const { postData, setPostData } = useLikeHook(likeDataRes, saveDataRes);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPost, setCurrentPost] = useState();
  const { apiShowError, setApiShowError } = useErrorHook(
    likeError || saveError || deleteError,
    likeErrorCode || saveErrorCode || deleteStatusCode
  );
  useFocusEffect(
    React.useCallback(() => {
      // getUserContent();
      dispatch(setUserContentPage(1));
      return () => {
        dispatch(resetUserContentPage(0));
        setCurrentPost(null);
      };
    }, [])
  );
  const userDataResMemoized = useMemo(
    () => userContentRes,
    [userContentRes, userContentSuccess]
  );
  useEffect(() => {
    console.log('-=---user info-=-=-');
    dispatch(getLoggedInUSerInfo());
  }, [refreshing]);

  useEffect(() => {
    if(userContentPage>0)
    getUserContent();
  }, [userContentPage, refreshing]);

  useEffect(() => {
    if (deleteDataRes !== null && deleteDataRes?.Success)
      dispatch(resetUserContentPage(1));
  }, [deleteDataRes?.Success]);
  useEffect(() => {
    if (userDataResMemoized != null && userContentSuccess) {
      setPostData(userDataResMemoized);
      setRefreshing(false);
    }
  }, [userDataResMemoized, userContentSuccess]);
  useEffect(() => {
    if (userContentError != null && !userContentError?.Success) {
      setRefreshing(false);
    }
  }, [userContentError]);

  const getUserContent = () => {
    dispatch(getUserContentApi(userContentPage, userContentPageSize));
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
  const renderItem = useCallback(({ item, index }) => {
    return (
      <FeedCard
        itemData={item}
        profile={true}
        currentPost={currentPost}
        onClickMoreBtn={() => {
          navigation.navigate(screenName.productDetail, { data: item });
        }}
      />
    );
  }, [navigation, currentPost]);
  

  const onRefresh = useCallback(() => {
    dispatch(resetUserContentPage(1));
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
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentPost(viewableItems[0].item?.id);
    }
  }).current;
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
        // <CustomeFlatlist
        //   data={postData}
        //   renderItem={renderItem}
        //   onEndReached={onReachedEnd}
        //   listFooterComponent={listFooterComponent}
        //   onRefresh={onRefresh}
        //   refreshing={refreshing}
        //   onViewableItemsChanged={onViewableItemsChanged}
        // />
        <FlatList
        data={postData}
        keyExtractor={(item, index) => {
          return `data_${item.id}_${index}`;
        }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={1}
        onEndReached={onReachedEnd}
        contentContainerStyle={{
          gap: scale(10),
          paddingBottom: verticalScale(10),
        }}
        ItemSeparatorComponent={
          <Divider style={{ marginBottom: verticalScale(8) }} />
        }
        ListFooterComponent={listFooterComponent}
        renderItem={renderItem}
        initialNumToRender={40}
        maxToRenderPerBatch={maxToRenderPerBatch}
        windowSize={5}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={maxToRenderPerBatch / 2}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        scrollEventThrottle={12}
        fadeDuration={0}
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

export default Profile;

const styles = StyleSheet.create({});
