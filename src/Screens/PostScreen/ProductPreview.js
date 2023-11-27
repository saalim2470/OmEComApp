import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import commonStyle from "../../Constants/commonStyle";
import Header from "../../Components/Header";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../../Constants/colors";
import CustomeButton from "../../Components/CustomeButton";
import Loading from "../../Components/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdContentApi,
  reseAdPosttData,
} from "../../store/AdContentSlices/AddAdContent";
import {
  resetData,
  setPostDataDraft,
} from "../../store/addAdContentSlices/AddPostData";
import screenName from "../../Constants/screenName";
import CustomeAlertModal from "../../Components/CustomeAlertModal";
import Slider from "../../Components/ProductComponent/Slider";

const ProductPreview = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const formData = new FormData();
  // add content data api responce
  const addPostData = useSelector((state) => state.addAdContentData);
  console.log("--=-=-=add content data-=-=-=", addPostData);
  // static prevoius screen post data
  const postData = useSelector((state) => state.addPost);
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
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
  useEffect(() => {
    if (addPostData?.errorCode != null && addPostData?.errorCode == 403) {
      // dispatch(setPostDataDraft(formData));
      navigation.navigate(screenName.drawerNavigation, {
        screen: screenName.subscription,
        params: { formData },
      });
    }
  }, [addPostData.errorCode]);

  const onClickBtn = () => {
    postData.formDataFiles.forEach((element, index) => {
      const uriParts = element.uri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      formData.append("files", {
        uri: element.uri,
        name: `image_${index}.${fileType}`,
        type: `image/${fileType}`,
      });
    });
    formData.append("title", postData?.itemDetail?.title);
    formData.append("shorDescription", postData?.itemDetail?.shorDescription);
    formData.append("description", postData?.itemDetail?.description);
    formData.append("categoryId", postData?.category);
    formData.append("userId", postData?.itemDetail?.userId);
    formData.append("promoterId", postData?.itemDetail?.promoterId);
    formData.append("condition", postData?.itemDetail?.condition);
    formData.append("price", postData?.itemDetail?.price);
    formData.append("brand", postData?.itemDetail?.brand);
    formData.append("specifications", postData?.itemDetail?.specifications);
    dispatch(addAdContentApi(formData));
    dispatch(setPostDataDraft(formData));
    // navigation.navigate(screenName.drawerNavigation, {
    //   screen: screenName.subscription,
    // });
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
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Slider data={postData?.files} />
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
                Size: <Text style={styles.bottomTxt("Montserrat-Bold")}>M</Text>
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
        </View>
      </ScrollView>
      <CustomeButton
        title={"List item for sale"}
        isLoading={addPostData?.isLoading}
        onClick={() => {
          onClickBtn();
        }}
        style={styles.btn}
      />
      <CustomeAlertModal
        isVisible={showAlert.show}
        title={showAlert.title}
        msg={showAlert.msg}
        type={showAlert.type}
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
  btn: {
    paddingVertical: moderateScale(13),
    marginHorizontal: moderateScale(15),
    marginVertical: 0,
    marginBottom: verticalScale(10),
    marginTop: verticalScale(5),
  },
});
