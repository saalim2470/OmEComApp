import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";
import { Divider } from "react-native-paper";
import { ScrollView } from "react-native";
import AdView from "../../Components/SearchScreenComponents/AdView";
import FeedCardWithDescription from "../../Components/ProductComponent/FeedCardWithDescription";
import { useDispatch, useSelector } from "react-redux";
import CustomeAlertModal from "../../Components/CustomeAlertModal";
import { useEffect } from "react";
import { setError } from "../../store/AdContentSlices/GetAdContentSlice";
import FeedCard from "../../Components/ProductComponent/FeedCard";

const ProductDetail = ({ route }) => {
  const dispatch = useDispatch();
  const contentdata = useSelector((state) => state.getAddContentByCategory);
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  useEffect(() => {
    if (
      contentdata?.error != null ||
      (undefined &&
        !contentdata?.error?.Success &&
        contentdata?.statusCode === 401)
    ) {
      setShowAlert({
        show: true,
        title: "Authentication Error",
        msg: "Please Login to continue",
        type: "error",
      });
    }
  }, [contentdata?.error]);
  const onClickModalBtn = () => {
    dispatch(setError(null));
    setShowAlert({ ...showAlert, show: false });
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"Product Detail"} />
      <Divider />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <FeedCard itemData={route?.params?.data} disable={true} />
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
