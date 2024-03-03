import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import WebView from "react-native-webview";
import { subcriptionType } from "../../Constants/Constant";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionTypeRulesApi } from "../../store/subscriptionSlices/SubscriptionTypeRulesSlice";
import Loading from "../Loading";
import ServerError from "../ErrorScreens/ServerError";

const SubscriptionDesc = ({ subsType }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const {
    isLoading,
    subscriptionTypeRulesData: rulesData,
    error,
    errorCode,
  } = useSelector((state) => state.subscriptionTypeRulesSlice);
  useEffect(() => {
    dispatch(getSubscriptionTypeRulesApi());
  }, []);
  useEffect(() => {
    if (rulesData !== null && rulesData?.Success) {
      switch (subsType) {
        case 0:
          setData(rulesData?.Data?.InsideNormal);
          break;
        case 1:
          setData(rulesData?.Data?.BannerAdHomePage);
          break;
        case 2:
          setData(rulesData?.Data?.SliderAdHomePage);
          break;
        case 3:
          setData(rulesData?.Data?.BannerAdSearchPage);
          break;
        case 4:
          setData(rulesData?.Data?.SliderAdSearchPage);
          break;

        default:
          break;
      }
    }
  }, [rulesData]);

  if (isLoading) {
    return <Loading />;
  }
  if (error !== null && !error?.Success) {
    return <ServerError msg={error?.ErrorMessage} statusCode={errorCode} />;
  }
  return (
    <View style={{ marginHorizontal: moderateScale(8), flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.heading}>{subcriptionType[subsType]}</Text>
        <WebView
          source={{ html: data }}
          minimumFontSize={40}
          containerStyle={{
            marginHorizontal: moderateScale(20),
            paddingBottom: verticalScale(5),
          }}
        />
      </View>
    </View>
  );
};

export default SubscriptionDesc;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Montserrat-Bold",
    fontSize: scale(15),
    marginBottom: verticalScale(5),
  },
});
