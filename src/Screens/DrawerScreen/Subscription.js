import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import MainHeader from "../../Components/MainHeader";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
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
import { resetData } from "../../store/addAdContentSlices/AddPostData";
import { useState } from "react";
import SubscriptionStripe from "../../Components/SubscriptionComponents/SubscriptionStripe";

const Subscription = ({ route }) => {
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
  const getSubscriptionData1 = useSelector(
    (state) => state.getSubscriptionPlan
  );
  console.log("-=-=-=-subscriptop-=-=-", getSubscriptionData1);
  const {
    error: getSubscriptionPlanError,
    errorCode: getSubscriptionPlanErrorCode,
  } = useSelector((state) => state.getSubscriptionPlan);
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  useEffect(() => {
    dispatch(getSubscriptionPlan(1, 10));
  }, []);
  useEffect(() => {
    if (getSubscriptionData && getSubscriptionData?.Success) {
      console.log("-=-=-postd data-=-=", postData?.postDataDraft);
      if (postData?.postDataDraft != null) {
        dispatch(addAdContentApi(postData?.postDataDraft));
      } else {
        setShowAlert({
          show: true,
          title: "Success",
          msg: "Subscription Added",
          type: "success",
        });
      }
    }
  }, [getSubscriptionData]);
  useEffect(() => {
    if (addContentDataRes?.addContentData?.Success) {
      setShowAlert({
        show: true,
        title: "Success",
        msg: "Ad Content Added Successfully",
        type: "success",
      });
    }
  }, [addContentDataRes?.addContentData]);
  useEffect(() => {
    if (
      getSubscriptionPlanErrorCode != null &&
      getSubscriptionPlanErrorCode === 401
    ) {
      setShowAlert({
        show: true,
        title: "UnAuthorized",
        msg: "Please login to continue",
        type: "warning",
      });
    } else if (
      getSubscriptionPlanError != null &&
      !getSubscriptionPlanError?.Success
    ) {
      setShowAlert({
        show: true,
        title: "Error",
        msg: getSubscriptionPlanError?.ErrorMessage,
        type: "error",
      });
    }
  }, [getSubscriptionPlanErrorCode, getSubscriptionPlanError]);

  const onClickModalBtn = () => {
    setShowAlert({ ...showAlert, show: false });
    dispatch(resetData());
    dispatch(resetGetSubscriptionPlanData());
    dispatch(reseAdPosttData());
    showAlert.type == "success" &&
      navigation.navigate(screenName.drawerNavigation, {
        screen: screenName.bottomNavigation,
      });
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <MainHeader
        leftIcon={<Feather name="menu" size={scale(30)} color="black" />}
        middleIcon={images.omLogo}
        rightIcon={
          <Ionicons
            name="notifications-outline"
            size={scale(30)}
            color="black"
          />
        }
        onClickRightIcon={() => {
          navigation.navigate(screenName.notification);
        }}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      {subscriptionPlanLoading || getSubscriptionLoading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.headingView}>
            <Text style={styles.headingTxt}>Inner Ads</Text>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.headingBtnTxt}>Read More...</Text>
            </TouchableOpacity>
          </View>
          {subscriptionPlanData?.Data?.map((item, index) => {
            if (item?.subscriptionType == 0) {
              {
                return (
                  <SubscriptionStripe
                    item={item}
                    onClick={() => {
                      dispatch(getSubscriptionPlanId(item?.id));
                    }}
                  />
                );
              }
            }
          })}
          <View style={styles.headingView}>
            <Text style={styles.headingTxt}>Home page/Front page Ad</Text>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.headingBtnTxt}>Read More...</Text>
            </TouchableOpacity>
          </View>
          {subscriptionPlanData?.Data?.map((item, index) => {
            if (item?.subscriptionType == 1) {
              {
                return (
                  <SubscriptionStripe
                    item={item}
                    onClick={() => {
                      dispatch(getSubscriptionPlanId(item?.id));
                    }}
                  />
                );
              }
            }
          })}
          <View style={styles.headingView}>
            <Text style={styles.headingTxt}>Pin Post</Text>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.headingBtnTxt}>Read More...</Text>
            </TouchableOpacity>
          </View>
          {subscriptionPlanData?.Data?.map((item, index) => {
            if (item?.subscriptionType == 2) {
              {
                return (
                  <SubscriptionStripe
                    item={item}
                    onClick={() => {
                      dispatch(getSubscriptionPlanId(item?.id));
                    }}
                  />
                );
              }
            }
          })}
          {/* <SubscriptionBottomSheet /> */}
        </>
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

export default Subscription;

const styles = StyleSheet.create({
  headingView: {
    //   borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scale(7),
    backgroundColor: colors.greyColor,
  },
  headingTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: scale(14),
  },
  headingBtnTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(11),
  },
  stripeWrapper: {
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(15),
    marginVertical: verticalScale(5),
  },
  stripeTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(14),
  },
  striprBtn: {
    padding: scale(8),
    marginLeft: moderateScale(10),
    backgroundColor: colors.themeColor,
    borderRadius: scale(2),
  },
});
