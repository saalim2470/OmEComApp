import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import MainHeader from "../../Components/MainHeader";
import { Feather, Ionicons } from "@expo/vector-icons";
import images from "../../Constants/images";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import screenName from "../../Constants/screenName";
import colors from "../../Constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSubscriptionPlan } from "../../store/subscriptionSlices/SubscriptionPlanSlice";
import Loading from "../../Components/Loading";
import {
  getSubscriptionPlanId,
  resetGetSubscriptionPlanData,
} from "../../store/subscriptionSlices/GetSubscriptionPlanSlice";
import { useNavigation } from "@react-navigation/native";
import {
  addAdContentApi,
  reseAdPosttData,
} from "../../store/AdContentSlices/AddAdContent";
import CustomeAlertModal from "../../Components/CustomeAlertModal";
import {
  resetData,
  setPostDataDraft,
} from "../../store/addAdContentSlices/AddPostData";
import { useState } from "react";
import SubscriptionStripe from "../../Components/SubscriptionComponents/SubscriptionStripe";
import { groupBy, subcriptionType, typeOfAds } from "../../Constants/Constant";
import SubscriptionHeading from "../../Components/SubscriptionComponents/SubscriptionHeading";
import RbBottomSheet from "../../Components/BottomSheet/RbBottomSheet";
import SubscriptionDesc from "../../Components/SubscriptionComponents/SubscriptionDesc";
import {
  postBannerOrSliderApi,
  resetUploadBannerSliderPostData,
} from "../../store/bannerorSliderAdSlices/PostBannerOrSliderSlice";
import * as WebBrowser from "expo-web-browser";

const Subscription = ({ route }) => {
  const { adsType } = route?.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const postData = useSelector((state) => state.addPost);
  const addContentDataRes = useSelector((state) => state.addAdContentData);
  const subscriptionPlanLoading = useSelector(
    (state) => state.subscriptionPlan.isLoading
  );
  const subscriptionPlanData = useSelector(
    (state) => state.subscriptionPlan.subscriptionData
  );
  const getSubscriptionLoading = useSelector(
    (state) => state.getSubscriptionPlan.isLoading
  );
  const getSubscriptionData = useSelector(
    (state) => state.getSubscriptionPlan.subscriptionPlanData
  );
  const {
    error: getSubscriptionPlanError,
    errorCode: getSubscriptionPlanErrorCode,
  } = useSelector((state) => state.getSubscriptionPlan);
  const {
    uploadAdsData: bannerSliderPostAdsRes,
    error: bannerSliderPostAdsError,
    isLoading: bannerSliderPostAdsLoading,
  } = useSelector((state) => state.postBannerOrSliderSlice);
  console.log(
    "=-=-=banner slider data-=-=-",
    useSelector((state) => state.postBannerOrSliderSlice)
  );
  const [openSheet, setOpenSheet] = useState(false);
  const [subsType, setSubsType] = useState();
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  useEffect(() => {
    dispatch(getSubscriptionPlan(1, 70));
  }, []);
  useEffect(() => {
    if (
      (getSubscriptionData && getSubscriptionData?.Success) ||
      (bannerSliderPostAdsRes && bannerSliderPostAdsRes?.Success)
    ) {
      openRazorpay(
        getSubscriptionData?.Data?.short_url ||
          bannerSliderPostAdsRes?.Data?.short_url
      );
      // if (postData?.postDataDraft != null) {
      //   adsType !== subcriptionType[0]
      //     ? dispatch(postBannerOrSliderApi(postData?.postDataDraft))
      // : dispatch(addAdContentApi(postData?.postDataDraft));
      // } else {
      //   setShowAlert({
      //     show: true,
      //     title: "Success",
      //     msg: "Subscription Added",
      //     type: "success",
      //   });
      // }
    }
  }, [getSubscriptionData, bannerSliderPostAdsRes]);
  useEffect(() => {
    if (
      addContentDataRes?.addContentData?.Success ||
      bannerSliderPostAdsRes?.Success
    ) {
      setShowAlert({ ...showAlert, show: false });
      clearData();
      dispatch(setPostDataDraft(null));
      navigate();
    }
  }, [addContentDataRes?.addContentData, bannerSliderPostAdsRes]);
  useEffect(() => {
    if (
      (getSubscriptionPlanError != null &&
        !getSubscriptionPlanError?.Success) ||
      (bannerSliderPostAdsError !== null && !bannerSliderPostAdsError?.Success)
    ) {
      handleError(
        getSubscriptionPlanError?.ErrorMessage ||
          bannerSliderPostAdsError?.ErrorMessage ||
          "Some Error Occured"
      );
    }
  }, [
    getSubscriptionPlanErrorCode,
    getSubscriptionPlanError,
    bannerSliderPostAdsError,
  ]);
  const handleError = (error) => {
    setShowAlert({
      show: true,
      title: "Error",
      msg: error,
      type: "error",
    });
  };
  const navigate = () => {
    switch (adsType) {
      case subcriptionType[1]:
        navigation.navigate(screenName.drawerNavigation, {
          screen: screenName.bottomNavigation,
          params: {
            screen: screenName.bottomNavigationHomeRoute,
            params: {
              screen: screenName.homeScreen,
            },
          },
        });
        break;
      case subcriptionType[2]:
        navigation.navigate(screenName.drawerNavigation, {
          screen: screenName.bottomNavigation,
          params: {
            screen: screenName.bottomNavigationHomeRoute,
            params: {
              screen: screenName.homeScreen,
            },
          },
        });
        break;
      case subcriptionType[3]:
        navigation.navigate(screenName.drawerNavigation, {
          screen: screenName.bottomNavigation,
          params: {
            screen: screenName.bottomNavigationSearchRoute,
            params: {
              screen: screenName.search,
            },
          },
        });
        break;
      case subcriptionType[4]:
        navigation.navigate(screenName.drawerNavigation, {
          screen: screenName.bottomNavigation,
          params: {
            screen: screenName.bottomNavigationSearchRoute,
            params: {
              screen: screenName.search,
            },
          },
        });
        break;

      default:
        navigation.navigate(screenName.drawerNavigation, {
          screen: screenName.bottomNavigation,
          params: {
            screen: screenName.bottomNavigationHomeRoute,
            params: {
              screen: screenName.mainHome,
            },
          },
        });
        break;
    }
  };

  const onClickModalBtn = () => {
    setShowAlert({ ...showAlert, show: false });
    clearData();

    showAlert.type == "success" && navigate();
  };
  const clearData = () => {
    dispatch(resetData());
    dispatch(resetGetSubscriptionPlanData());
    dispatch(reseAdPosttData());
    dispatch(resetUploadBannerSliderPostData());
  };
  const openRazorpay = async (url) => {
    try {
      let result = await WebBrowser.openBrowserAsync(url);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <MainHeader navigation={navigation} />
      {subscriptionPlanLoading ||
      getSubscriptionLoading ||
      bannerSliderPostAdsLoading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <SubscriptionHeading
            subcriptionType={subcriptionType[0]}
            onClickRead={() => {
              setSubsType(0);
              setOpenSheet(true);
            }}
          />
          {subscriptionPlanData?.Data?.items?.map((item, index) => {
            if (item?.subscriptionType === 0)
              return (
                <>
                  <SubscriptionStripe
                    item={item}
                    disabled={
                      adsType === "all"
                        ? false
                        : adsType !== subcriptionType[0]
                        ? true
                        : false
                    }
                    onClick={() => {
                      dispatch(
                        getSubscriptionPlanId(item?.id, postData?.postDataDraft)
                      );
                    }}
                  />
                </>
              );
          })}
          <SubscriptionHeading
            subcriptionType={subcriptionType[1]}
            onClickRead={() => {
              setSubsType(1);
              setOpenSheet(true);
            }}
          />
          {subscriptionPlanData?.Data?.items?.map((item, index) => {
            if (item?.subscriptionType === 1)
              return (
                <>
                  <SubscriptionStripe
                    item={item}
                    disabled={
                      adsType === "all"
                        ? false
                        : adsType !== subcriptionType[1]
                        ? true
                        : false
                    }
                    onClick={() => {
                      dispatch(
                        postBannerOrSliderApi(item?.id, postData?.postDataDraft)
                      );
                    }}
                  />
                </>
              );
          })}
          <SubscriptionHeading
            subcriptionType={subcriptionType[2]}
            onClickRead={() => {
              setSubsType(2);
              setOpenSheet(true);
            }}
          />
          {subscriptionPlanData?.Data?.items?.map((item, index) => {
            if (item?.subscriptionType === 2)
              return (
                <>
                  <SubscriptionStripe
                    item={item}
                    disabled={
                      adsType === "all"
                        ? false
                        : adsType !== subcriptionType[2]
                        ? true
                        : false
                    }
                    onClick={() => {
                      dispatch(
                        postBannerOrSliderApi(item?.id, postData?.postDataDraft)
                      );
                    }}
                  />
                </>
              );
          })}
          <SubscriptionHeading
            subcriptionType={subcriptionType[3]}
            onClickRead={() => {
              setSubsType(3);
              setOpenSheet(true);
            }}
          />
          {subscriptionPlanData?.Data?.items?.map((item, index) => {
            if (item?.subscriptionType === 6)
              return (
                <>
                  <SubscriptionStripe
                    item={item}
                    disabled={
                      adsType === "all"
                        ? false
                        : adsType !== subcriptionType[3]
                        ? true
                        : false
                    }
                    onClick={() => {
                      dispatch(
                        postBannerOrSliderApi(item?.id, postData?.postDataDraft)
                      );
                    }}
                  />
                </>
              );
          })}
          <SubscriptionHeading
            subcriptionType={subcriptionType[4]}
            onClickRead={() => {
              setSubsType(4);
              setOpenSheet(true);
            }}
          />
          {subscriptionPlanData?.Data?.items?.map((item, index) => {
            if (item?.subscriptionType === 7)
              return (
                <>
                  <SubscriptionStripe
                    item={item}
                    disabled={
                      adsType === "all"
                        ? false
                        : adsType !== subcriptionType[4]
                        ? true
                        : false
                    }
                    onClick={() => {
                      dispatch(
                        postBannerOrSliderApi(item?.id, postData?.postDataDraft)
                      );
                    }}
                  />
                </>
              );
          })}
        </ScrollView>
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
      <RbBottomSheet
        isOpen={openSheet}
        setIsOpen={setOpenSheet}
        children={<SubscriptionDesc subsType={subsType} />}
        height={verticalScale(300)}
      />
    </SafeAreaView>
  );
};

export default Subscription;

const styles = StyleSheet.create({});
