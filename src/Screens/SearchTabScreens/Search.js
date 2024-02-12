import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { ScrollView } from "react-native";
import CustomeBottomSheet from "../../Components/CustomeBottomSheet";
import BannerSlider from "../../Components/HomeScreenComponent/BannerSlider";
import SearchScreenTopView from "../../Components/SearchScreenComponents/SearchScreenTopView";
import { SafeAreaView } from "react-native-safe-area-context";
import CardSlider from "../../Components/HomeScreenComponent/CardSlider";
import Loading from "../../Components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { getPromotedContentApi } from "../../store/bannerorSliderAdSlices/GetPromotedContentSlice";
import { baseURL, serverImagePath } from "../../Constants/defaults";

const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {
    promotedContent: promotedContentRes,
    isLoading: promotedContentLoading,
    isSuccess: promotedContentSuccess,
    statusCode: promotedContentStatusCode,
    error: promotedContentError,
  } = useSelector((state) => state.getPromotedContentSlice);
  const [bannerImageData, setBannerImageData] = useState([]);
  const [sliderImageData, setSliderImageData] = useState([]);
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);
  const [adImg, setAdImg] = useState();
  useFocusEffect(
    useCallback(() => {
      getPromotedContent();
    }, [])
  );
  // useEffect(() => {
  //   getPromotedContent();
  // }, [isFocused]);
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
      <SearchScreenTopView />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={[
            commonStyle.headingTxt,
            { fontSize: scale(12), paddingHorizontal: moderateScale(15) },
          ]}
        >
          Made for you
        </Text>
        <Text
          style={[
            styles.smallTxt,
            {
              marginTop: verticalScale(-5),
              paddingHorizontal: moderateScale(15),
            },
          ]}
        >
          Based on your recent activity
        </Text>
        {/* banner View */}
        <BannerSlider
          data={bannerImageData}
          onClick={(index) => {
            setAdImg(bannerImageData[index]);
            setIsShowBottomSheet(true);
          }}
        />
        <View style={{ flex: 1, marginTop: verticalScale(15) }}>
          <CardSlider
            data={sliderImageData}
            onClickCard={(item) => {
              setAdImg(item);
              setIsShowBottomSheet(true);
            }}
          />
        </View>
      </ScrollView>
      <CustomeBottomSheet
        isOpen={isShowBottomSheet}
        setIsOpen={setIsShowBottomSheet}
        data={adImg}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  smallTxt: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(10),
    marginBottom: verticalScale(12),
  },
});
