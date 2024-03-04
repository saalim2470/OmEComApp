import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";
import { WebView } from "react-native-webview";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLegalDataApi } from "../../store/legalData/GetLegalData";
import Loading from "../../Components/Loading";
import ErrorMsg from "../../Components/ErrorScreens/ErrorMsg";
import FriendlyMsg from "../../Components/ErrorScreens/FriendlyMsg";

const RefundPolicy = () => {
  const dispatch = useDispatch();
  const {
    legalData: data,
    isLoading: loading,
    error: error,
  } = useSelector((state) => state.getLegalData);
  useEffect(() => {
    dispatch(getLegalDataApi());
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (error !== null && !error?.Success) {
    return <ErrorMsg />;
  }
  if (!loading && error === null && data === null) {
    return <FriendlyMsg msg={"Privacy Policy not availaible"} />;
  }
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"Refund Policy"} />
      <WebView
        source={{ html: data?.Data?.refundPolicyContent }}
        minimumFontSize={40}
        containerStyle={{
          marginHorizontal: moderateScale(20),
          paddingBottom: verticalScale(5),
        }}
      />
    </SafeAreaView>
  );
};

export default RefundPolicy;

const styles = StyleSheet.create({});
