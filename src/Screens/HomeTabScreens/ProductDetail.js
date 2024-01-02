import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";
import { Divider } from "react-native-paper";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomeAlertModal from "../../Components/CustomeAlertModal";
import { useEffect } from "react";
import { setError } from "../../store/AdContentSlices/GetAdContentSlice";
import FeedCard from "../../Components/ProductComponent/FeedCard";
import Loading from "../../Components/Loading";

const ProductDetail = ({ route }) => {
  const dispatch = useDispatch();
  const {
    error: likeError,
    statusCode: likeErrorCode,
    likeData: likeDataRes,
  } = useSelector((state) => state.like);
  const {
    error: saveError,
    statusCode: saveErrorCode,
    saveData: saveDataRes,
  } = useSelector((state) => state.saveContent);
  const [adContent, setAdContent] = useState(null);
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  useEffect(() => {
    setAdContent(route?.params?.data);
  }, [route?.params]);
  useEffect(() => {
    if (likeDataRes != null && likeDataRes.Success) {
      updateData(likeDataRes?.Data, "like");
    }
  }, [likeDataRes]);
  useEffect(() => {
    if (saveDataRes != null && saveDataRes.Success) {
      updateData(saveDataRes?.Data, "save");
    }
  }, [saveDataRes]);

  const onClickModalBtn = () => {
    dispatch(setError(null));
    setShowAlert({ ...showAlert, show: false });
  };
  const updateData = (data, actionType) => {
    if (actionType === "like" && adContent?.id === data?.contentId) {
      setAdContent({
        ...adContent,
        isCurrentUserLiked: data?.isLiked,
        totalLikes: data?.totalLikes,
      });
    }
    if (actionType === "save" && adContent?.id === data?.adContentID) {
      setAdContent({
        ...adContent,
        isCurrentUserSaved: data?.isSaved,
      });
    }
  };
  if (!adContent && adContent == null) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"Product Detail"} />
      <Divider />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <FeedCard itemData={adContent} disable={true} showFullDesc={true} />
        {/* unComment After 1st version */}
        {/* <AdView /> */}
      </ScrollView>
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

export default ProductDetail;

const styles = StyleSheet.create({});
