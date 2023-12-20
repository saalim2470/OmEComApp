import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import React from "react";
import MainHeader from "../../Components/MainHeader";
import commonStyle from "../../Constants/commonStyle";
import images from "../../Constants/images";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CategorieCircle from "../../Components/CategorieCircle";
import { Divider } from "react-native-paper";
import FeedCard from "../../Components/ProductComponent/FeedCard";
import screenName from "../../Constants/screenName";
import { useState } from "react";
import CommentView from "../../Components/PostScreenComponent/CommentView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../../Components/Loading";
import { Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomeAlertModal from "../../Components/CustomeAlertModal";
import {
  getAdContentByCategory,
  setError,
} from "../../store/AdContentSlices/GetAdContentSlice";
import HomeScreenCategory from "../../Components/HomeScreenComponent/HomeScreenCategory";

const MainHome = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const categoryDataRes = useSelector((state) => state.category.categoryData);
  const contentDataRes = useSelector(
    (state) => state.getAddContentByCategory.contentData
  );
  const contentdata = useSelector((state) => state.getAddContentByCategory);
  console.log("-=-=contnt-=-=-", contentdata);
  const contentDataLoading = useSelector(
    (state) => state.getAddContentByCategory.isLoading
  );
  const [isShowCommentView, setIsShowCommentView] = useState(-1);
  const [categoryData, setCategoryData] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [adContentData, setAdContentData] = useState([]);
  const [isReachedEnd, setIsReachedEnd] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  useEffect(() => {
    // setPageNumber((prevPageNumber) => prevPageNumber + 1);
    // getContentDataByCategory(route?.params?.categoryId);
    setSelectedCategory(route?.params?.categoryId);
  }, [route]);
  useEffect(() => {
    getContentDataByCategory(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (
      contentdata?.error != null &&
      !contentdata?.error?.Success &&
      contentdata?.statusCode === 401
    ) {
      setShowAlert({
        show: true,
        title: "Authentication Error",
        msg: "Please Login to continue",
        type: "error",
      });
    }
  }, [contentdata?.error]);
  useEffect(() => {
    setCategoryData(categoryDataRes?.Data);
  }, [categoryDataRes]);

  const getContentDataByCategory = (categoryID) => {
    const updatedPageNumber = pageNumber + 1;
    console.log("-=-=pagenu -=-=", updatedPageNumber);
    dispatch(getAdContentByCategory(categoryID, updatedPageNumber, pageSize));
    setPageNumber(updatedPageNumber);
  };
  const onClickModalBtn = () => {
    dispatch(setError(null));
    setShowAlert({ ...showAlert, show: false });
  };
  const renderItem = ({ item, index }) => {
    return (
      <FeedCard
        itemData={item}
        isMoreBtn={true}
        isOfferBtn={true}
        onClickComment={() => {
          setIsShowCommentView(0);
        }}
        onClickMoreBtn={() => {
          navigation.navigate(screenName.productDetail, { data: item });
        }}
      />
    );
  };
  const renderCategory = ({ item, index }) => {
    return (
      <HomeScreenCategory
        item={item}
        data={categoryData}
        index={index}
        selectedCategory={selectedCategory}
        onClick={() => {
          setPageNumber(0);
          setSelectedCategory(item?.id);
          // getContentDataByCategory(item.id);
        }}
      />
    );
  };
  const listFooterComponent = () => {
    return (
      contentDataLoading && (
        <ActivityIndicator style={{ marginVertical: verticalScale(20) }} />
      )
    );
  };
  const onReachedEnd = () => {
    if (contentdata?.isReachedEnd == false) {
      getContentDataByCategory(selectedCategory);
    }
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <MainHeader
        leftIcon={<Feather name="menu" size={scale(30)} color="black" />}
        middleIcon={images.omLogo}
        rightIcon={
          <Ionicons
            name="notifications-outline"
            size={scale(30)}
            color="black"
          />
        }
        onClickRightIcon={() => {
          navigation.navigate(screenName.notification);
        }}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <View style={styles.storyView}>
        {/* <CategorieCircle data={categoryData} /> */}
        <FlatList
          data={categoryData}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={renderCategory}
        />
      </View>
      <Divider style={{ marginVertical: verticalScale(8) }} />
      {
        // contentDataLoading ? (
        //   <Loading />
        // ) :
        !contentDataLoading && contentDataRes.length <= 0 ? (
          <Text style={styles.msgTxt}>{`Content not availaibale`}</Text>
        ) : (
          <FlatList
            data={contentDataRes}
            keyExtractor={(item) => {
              item.id;
            }}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={1}
            onEndReached={() => {
              onReachedEnd();
            }}
            ItemSeparatorComponent={
              <Divider style={{ marginBottom: verticalScale(8) }} />
            }
            ListFooterComponent={listFooterComponent}
            renderItem={renderItem}
          />
        )
      }
      {/* <CommentView
        isShow={isShowCommentView}
        onChange={(value) => {
          setIsShowCommentView(value);
        }}
      /> */}
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

export default MainHome;

const styles = StyleSheet.create({
  storyView: {
    marginTop: verticalScale(10),
  },
  msgTxt: {
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
  },
});
