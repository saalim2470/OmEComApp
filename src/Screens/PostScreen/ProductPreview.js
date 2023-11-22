import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import commonStyle from "../../Constants/commonStyle";
import Header from "../../Components/Header";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../../Constants/colors";
import CustomeButton from "../../Components/CustomeButton";
import { SliderBox } from "react-native-image-slider-box";
import Loading from "../../Components/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdContentApi,
  reseAdPosttData,
} from "../../store/AdContentSlices/AddAdContent";
import { resetData } from "../../store/addAdContentSlices/AddPostData";
import CustomeAlert from "../../Components/CustomeAlert";
import screenName from "../../Constants/screenName";
import CustomeAlertModal from "../../Components/CustomeAlertModal";

const ProductPreview = ({ navigation, route }) => {
  const dispatch = useDispatch();
  // add content data api responce
  const addPostData = useSelector((state) => state.addAdContentData);
  console.log(addPostData);
  // static prevoius screen post data
  const postData = useSelector((state) => state.addPost);
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
  });
  useEffect(() => {
    if (addPostData?.addContentData?.Success) {
      setShowAlert({
        show: true,
        title: "Success",
        msg: "Ad Content Added Successfully",
      });
    }
  }, [addPostData?.addContentData]);

  const onClickBtn = () => {
    const data = {
      ...postData?.itemDetail,
      categoryId: postData?.category,
      // files: postData?.files,
      files: null,
    };
    console.log(data);
    dispatch(addAdContentApi(data));
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <Header />
      <Text
        style={[
          commonStyle.headingTxt,
          { paddingHorizontal: moderateScale(15), marginTop: verticalScale(8) },
        ]}
      >
        Preview
      </Text>
      <Text style={styles.SmallHading}>
        Approve your items before you list it
      </Text>
      {postData == null || addPostData?.isLoading ? (
        <Loading />
      ) : (
        <>
          <View style={{ height: verticalScale(300) }}>
            <SliderBox
              images={postData?.files}
              sliderBoxHeight={"100%"}
              dotColor={colors.themeColor}
              inactiveDotColor="#FFFFFF"
              disableOnPress={true}
              imageLoadingColor={colors.themeColor}
              dotStyle={{
                width: scale(7),
                height: scale(7),
                borderRadius: scale(5),
                marginHorizontal: 0,
                padding: 0,
                margin: 0,
              }}
            />
          </View>
          <View style={commonStyle.innerContainer}>
            <View style={styles.bottomView}>
              <Text style={styles.bottomTxt("Montserrat-Bold")}>
                {postData?.itemDetail?.title}
              </Text>
              <View
                style={[
                  styles.onlyRowStyle,
                  {
                    marginTop: verticalScale(8),
                  },
                ]}
              >
                <Text style={styles.bottomTxt("Montserrat-Medium")}>
                  Condition:{" "}
                  <Text style={styles.bottomTxt("Montserrat-Bold")}>
                    {postData?.itemDetail?.condition}
                  </Text>
                </Text>
                <Text
                  style={[
                    styles.bottomTxt("Montserrat-Medium"),
                    { marginLeft: moderateScale(10) },
                  ]}
                >
                  Brand:{" "}
                  <Text style={styles.bottomTxt("Montserrat-Bold")}>
                    {postData?.itemDetail?.brand}
                  </Text>
                </Text>
              </View>
              <View style={styles.onlyRowStyle}>
                <Text style={styles.bottomTxt("Montserrat-Medium")}>
                  Size:{" "}
                  <Text style={styles.bottomTxt("Montserrat-Bold")}>M</Text>
                </Text>
                <Text
                  style={[
                    styles.bottomTxt("Montserrat-Medium"),
                    { marginLeft: moderateScale(10) },
                  ]}
                >
                  Color:{" "}
                  <Text style={styles.bottomTxt("Montserrat-Bold")}>Green</Text>
                </Text>
              </View>
              <View style={[commonStyle.row, { marginTop: verticalScale(8) }]}>
                <Text style={styles.bottomTxt("Montserrat-Medium")}>
                  Price:{" "}
                  <Text
                    style={[
                      styles.bottomTxt("Montserrat-Bold"),
                      { color: colors.themeColor },
                    ]}
                  >
                    {postData?.itemDetail?.price}
                  </Text>
                </Text>
              </View>
              <Text
                style={[
                  styles.bottomTxt("Montserrat-Light"),
                  { marginVertical: verticalScale(10) },
                ]}
              >
                {postData?.itemDetail?.shorDescription}
              </Text>

              {/* long desc view */}
              <Text style={styles.bottomTxt("Montserrat-Light")}>
                {postData?.itemDetail?.description}
              </Text>
            </View>
            <CustomeButton
              title={"List item for sale"}
              isLoading={addPostData?.isLoading}
              onClick={() => {
                onClickBtn();
              }}
              style={{
                paddingVertical: moderateScale(13),
                position: "absolute",
                bottom: 0,
                width: "100%",
                alignSelf: "center",
              }}
            />
          </View>
        </>
      )}
      <CustomeAlertModal
        isVisible={showAlert.show}
        title={showAlert.title}
        msg={showAlert.msg}
        success={true}
        onClickBtn={() => {
          setShowAlert({ ...showAlert, show: false });
          dispatch(resetData());
          dispatch(reseAdPosttData());
          navigation.navigate(screenName.drawerNavigation, {
            screen: screenName.bottomNavigation,
            params: {
              screen: screenName.mainHome,
            },
          });
        }}
      />
    </SafeAreaView>
  );
};

export default ProductPreview;

const styles = StyleSheet.create({
  SmallHading: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(10),
    marginBottom: verticalScale(15),
    paddingHorizontal: moderateScale(15),
  },
  bottomTxt: (fontFamily) => ({
    fontSize: scale(10),
    fontFamily: fontFamily,
  }),
  onlyRowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomView: {
    // marginHorizontal: moderateScale(10),
    marginVertical: verticalScale(10),
  },
  descTxt: {
    fontFamily: "Montserrat-Light",
    fontSize: moderateScale(11),
  },
});
