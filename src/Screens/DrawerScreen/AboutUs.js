import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomeHeader from "../../Components/CustomeHeader";
import commonStyle from "../../Constants/commonStyle";
import { WebView } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import { getLegalDataApi } from "../../store/legalData/GetLegalData";
import Loading from "../../Components/Loading";
import ErrorMsg from "../../Components/ErrorScreens/ErrorMsg";
import FriendlyMsg from "../../Components/ErrorScreens/FriendlyMsg";
import { moderateScale, verticalScale } from "react-native-size-matters";

const AboutUs = () => {
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
    return <FriendlyMsg msg={"No availaible information for about us"} />;
  }
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"About us"} />
      <WebView
        source={{ html: data?.Data?.aboutUsContent }}
        minimumFontSize={40}
        containerStyle={{
          marginHorizontal: moderateScale(20),
          paddingBottom: verticalScale(5),
        }}
      />
    </SafeAreaView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({});
