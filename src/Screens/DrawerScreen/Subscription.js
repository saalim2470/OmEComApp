import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
import { groupBy, subcriptionType } from "../../Constants/Constant";
import SubscriptionHeading from "../../Components/SubscriptionComponents/SubscriptionHeading";
import RbBottomSheet from "../../Components/BottomSheet/RbBottomSheet";
import SubscriptionDesc from "../../Components/SubscriptionComponents/SubscriptionDesc";

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
    dispatch(setPostDataDraft(null));
    showAlert.type == "success" &&
      navigation.navigate(screenName.drawerNavigation, {
        screen: screenName.bottomNavigation,
        params: {
          screen: screenName.bottomNavigationHomeRoute,
          params: {
            screen: screenName.mainHome,
          },
        },
      });
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <MainHeader navigation={navigation} />
      {subscriptionPlanLoading || getSubscriptionLoading ? (
        <Loading />
      ) : (
        <>
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
                    onClick={() => {
                      dispatch(getSubscriptionPlanId(item?.id));
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
                    onClick={() => {
                      dispatch(getSubscriptionPlanId(item?.id));
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
                    onClick={() => {
                      dispatch(getSubscriptionPlanId(item?.id));
                    }}
                  />
                </>
              );
          })}
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
