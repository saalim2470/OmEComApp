import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import MainHeader from "../../Components/MainHeader";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import RoundCategoryView from "../../Components/HomeScreenComponent/RoundCategoryView";
import { Divider } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import BannerSlider from "../../Components/HomeScreenComponent/BannerSlider";
import SliderCard from "../../Components/HomeScreenComponent/SliderCard";
import screenName from "../../Constants/screenName";
import CustomeBottomSheet from "../../Components/CustomeBottomSheet";
import { setCategoryId } from "../../store/StoreDataSlice";
import { useDispatch, useSelector } from "react-redux";
import ShimmerLoading from "../../Components/LoadingComponents/ShimmerLoading";
import CardSlider from "../../Components/HomeScreenComponent/CardSlider";
import { getPromotedContentApi } from "../../store/bannerorSliderAdSlices/GetPromotedContentSlice";
import Loading from "../../Components/Loading";
import { baseURL, serverImagePath } from "../../Constants/defaults";
import ServerError from "../../Components/ErrorScreens/ServerError";
import FriendlyMsg from "../../Components/ErrorScreens/FriendlyMsg";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {
    promotedContent: promotedContentRes,
    isLoading: promotedContentLoading,
    isSuccess: promotedContentSuccess,
    statusCode: promotedContentStatusCode,
    error: promotedContentError,
  } = useSelector((state) => state.getPromotedContentSlice);
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);
  const [adImg, setAdImg] = useState();
  const [bannerImageData, setBannerImageData] = useState([]);
  const [sliderImageData, setSliderImageData] = useState([]);
  useFocusEffect(
    useCallback(() => {
      getPromotedContent();
    }, [])
  );
  useEffect(() => {
    if (promotedContentSuccess && promotedContentRes?.length > 0) {
      const bannerAds = promotedContentRes?.filter(
        (item, index) => item?.subscriptionType === 1
      );
      const sliderAds = promotedContentRes?.filter(
        (item, index) => item?.subscriptionType === 2
      );
      setBannerImageData(bannerAds);
      setSliderImageData(sliderAds);
    }
  }, [promotedContentSuccess, promotedContentRes]);
  const getPromotedContent = () => {
    dispatch(getPromotedContentApi(1, 10));
  };
  if (promotedContentLoading) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={commonStyle.container}>
      <MainHeader navigation={navigation} />
      <RoundCategoryView
        onClickCategory={(id) => {
          navigation.navigate(screenName.bottomNavigation, {
            screen: screenName.bottomNavigationHomeRoute,
            params: {
              screen: screenName.mainHome,
            },
          });
        }}
      />
      <Divider style={{ marginVertical: verticalScale(8) }} />
      {promotedContentRes?.length === 0 ? (
        <FriendlyMsg />
      ) : promotedContentError !== null && !promotedContentError?.Success ? (
        <ServerError
          msg={promotedContentError?.ErrorMessage}
          statusCode={promotedContentStatusCode}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <BannerSlider
            data={bannerImageData}
            onClick={(index) => {
              setAdImg(bannerImageData[index]?.imagePath);
              setIsShowBottomSheet(true);
            }}
          />
          <View
            style={{
              marginTop: verticalScale(10),
            }}
          >
            <CardSlider
              data={sliderImageData}
              onClickCard={(item) => {
                setAdImg(item?.imagePath);
                setIsShowBottomSheet(true);
              }}
            />
          </View>
        </ScrollView>
      )}
      <CustomeBottomSheet
        isOpen={isShowBottomSheet}
        setIsOpen={setIsShowBottomSheet}
        data={adImg}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
