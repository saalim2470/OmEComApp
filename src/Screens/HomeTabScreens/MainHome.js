import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import MainHeader from "../../Components/MainHeader";
import { SafeAreaView } from "react-native";
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

const MainHome = ({ navigation, route }) => {
  const categoryData = useSelector((state) => state.category.categoryData);
  const contentDataRes = useSelector(
    (state) => state.getAddContentByCategory.contentData
  );
  const contentDataLoading = useSelector(
    (state) => state.getAddContentByCategory.isLoading
  );
  const [isShowCommentView, setIsShowCommentView] = useState(-1);
  const [contentData, setContentData] = useState([]);
  useEffect(() => {
    if (contentDataRes?.Success) {
      const data = [];
      contentDataRes?.Data.map((item, index) => {
        data.push({
          ...item,
          userName: "_.abc._",
          location: "Surat",
          files: [
            "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1672876197.29825462!600x600!85.jpg",
            "https://i02.appmifile.com/mi-com-product/fly-birds/pair/pc/pc-pair.png?f=webp",
          ],
        });
      });
      setContentData(data);
    }
  }, [contentDataRes]);

  const onClickSaved = (index) => {
    // const newData = [...feedData];
    // const obj = {
    //   ...newData[index],
    //   isSaved: !newData[index].isSaved,
    // };
    // newData[index] = obj;
    // setFeedData(newData);
  };

  return (
    <SafeAreaView style={commonStyle.container}>
      <MainHeader
        leftIcon={images.menuIcon}
        middleIcon={images.omLogo}
        rightIcon={images.notificationIcon}
        onClickRightIcon={() => {
          navigation.navigate(screenName.notification);
        }}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <View style={styles.storyView}>
        <CategorieCircle data={categoryData?.Data} />
      </View>
      <Divider style={{ marginVertical: verticalScale(8) }} />
      {contentDataLoading ? (
        <Loading />
      ) : contentData.length <= 0 ? (
        <Text style={styles.msgTxt}>{`Content not availaibale`}</Text>
      ) : (
        <FlatList
          data={contentData}
          keyExtractor={(item) => {
            item.id.toString();
          }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={
            <Divider style={{ marginBottom: verticalScale(8) }} />
          }
          renderItem={({ item, index }) => {
            return (
              <FeedCard
                itemData={item}
                isMoreBtn={true}
                isOfferBtn={true}
                onClickBookmarkBtn={() => {
                  onClickSaved(index);
                }}
                onClickComment={() => {
                  setIsShowCommentView(0);
                }}
                onClickMsgBtn={() => {}}
                onClickMoreBtn={() => {
                  navigation.navigate(screenName.productDetail, { data: item });
                }}
              />
            );
          }}
        />
      )}
      <CommentView
        isShow={isShowCommentView}
        onChange={(value) => {
          setIsShowCommentView(value);
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
