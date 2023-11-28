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
import SubscriptionBottomSheet from "../../Components/SubscriptionBottomSheet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSubscriptionPlan } from "../../store/subscriptionSlices/SubscriptionPlanSlice";
import Loading from "../../Components/Loading";
import { getSubscriptionPlanId } from "../../store/subscriptionSlices/GetSubscriptionPlanSlice";
import { useNavigation } from "@react-navigation/native";
import {
  addAdContentApi,
  reseAdPosttData,
} from "../../store/AdContentSlices/AddAdContent";
import CustomeAlertModal from "../../Components/CustomeAlertModal";
import { resetData } from "../../store/addAdContentSlices/AddPostData";
import { useState } from "react";

const Subscription = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const postData = useSelector((state) => state.addPost);
  const addPostData = useSelector((state) => state.addAdContentData);
  const subscriptionLoading = useSelector(
    (state) => state.subscriptionPlan.isLoading
  );
  const subscriptionData = useSelector(
    (state) => state.subscriptionPlan.subscriptionData
  );
  const getSubscriptionLoading = useSelector(
    (state) => state.getSubscriptionPlan.isLoading
  );
  const getSubscriptionData = useSelector(
    (state) => state.getSubscriptionPlan.subscriptionPlanData
  );
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  console.log("-=--getsubscriptiondata-=-=-", getSubscriptionData);
  useEffect(() => {
    dispatch(getSubscriptionPlan(1, 10));
  }, []);
  useEffect(() => {
    if (getSubscriptionData && getSubscriptionData.Success) {
      // navigation.navigate(screenName.productPreview);
      // navigation.navigate(screenName.productPreview);
      console.log("-=-=-=params ", postData?.postDataDraft);
      dispatch(addAdContentApi(postData?.postDataDraft));
    }
  }, [getSubscriptionData]);
  useEffect(() => {
    if (addPostData?.addContentData?.Success) {
      setShowAlert({
        show: true,
        title: "Success",
        msg: "Ad Content Added Successfully",
        type: "success",
      });
    }
  }, [addPostData?.addContentData]);

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
      {subscriptionLoading || getSubscriptionLoading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.headingView}>
            <Text style={styles.headingTxt}>Inner Ads</Text>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.headingBtnTxt}>Read More...</Text>
            </TouchableOpacity>
          </View>
          {subscriptionData?.Data?.map((item, index) => {
            if (item?.subscriptionType == 0) {
              {
                return (
                  <View style={styles.stripeWrapper}>
                    <Text style={styles.stripeTxt}>{item?.name}</Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.stripeTxt}>
                        &#8377; {item?.price}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(getSubscriptionPlanId(item?.id));
                          // navigation.navigate('Payment')
                        }}
                        style={styles.striprBtn}
                        activeOpacity={0.6}
                      >
                        <Text style={[styles.stripeTxt, { color: "white" }]}>
                          Choose
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
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
          {subscriptionData?.Data?.map((item, index) => {
            if (item?.subscriptionType == 1) {
              {
                return (
                  <View style={styles.stripeWrapper}>
                    <Text style={styles.stripeTxt}>{item?.name}</Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.stripeTxt}>
                        &#8377; {item?.price}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          console.log(item.id);
                        }}
                        style={styles.striprBtn}
                        activeOpacity={0.6}
                      >
                        <Text style={[styles.stripeTxt, { color: "white" }]}>
                          Choose
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
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
          {subscriptionData?.Data?.map((item, index) => {
            if (item?.subscriptionType == 2) {
              {
                return (
                  <View style={styles.stripeWrapper}>
                    <Text style={styles.stripeTxt}>{item?.name}</Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.stripeTxt}>
                        &#8377; {item?.price}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          console.log(item.id);
                        }}
                        style={styles.striprBtn}
                        activeOpacity={0.6}
                      >
                        <Text style={[styles.stripeTxt, { color: "white" }]}>
                          Choose
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
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
          setShowAlert({ ...showAlert, show: false });
          dispatch(resetData());
          dispatch(reseAdPosttData());
          navigation.navigate(screenName.bottomNavigation);
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
