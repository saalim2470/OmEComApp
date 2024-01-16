import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import commonStyle from "../../Constants/commonStyle";
import Header from "../../Components/Header";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CategoryCard from "../../Components/PostScreenComponent/CategoryCard";
import { FlatList } from "react-native";
import CustomeButton from "../../Components/CustomeButton";
import { useState } from "react";
import images from "../../Constants/images";
import screenName from "../../Constants/screenName";
import { useDispatch, useSelector } from "react-redux";
import CustomeAlert from "../../Components/CustomeAlert";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCategory } from "../../store/addAdContentSlices/AddPostData";
import { setCategoryId } from "../../store/StoreDataSlice";

const PostCategory = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.addPost);
  const categoryData = useSelector((state) => state.category.categoryData);
  const [checked, setChecked] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  // set data when go back to edit
  useEffect(() => {
    if (postData?.category) {
      setChecked(postData?.category);
    }
  }, [postData?.category]);

  const onClickNext = () => {
    if (!checked && checked == null) {
      setShowAlert(true);
    } else {
      dispatch(setCategory(checked));
      navigation.navigate(screenName.postData);
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <CategoryCard
        item={item}
        onClick={() => {
          setChecked(item.id);
          dispatch(setCategoryId(item?.id));
        }}
        status={checked}
      />
    );
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      {/* <Header /> */}
      <View
        style={[commonStyle.innerContainer, { marginTop: verticalScale(30) }]}
      >
        <Text style={commonStyle.headingTxt}>Category</Text>
        <Text style={styles.SmallHading}>Select relavant category</Text>
        <FlatList
          data={categoryData}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: verticalScale(10) }}
          keyExtractor={(item,index) => {
            return `category_${item.id}_${index}`;
          }}
          renderItem={renderItem}
        />
        <CustomeButton
          title={"Next"}
          style={{ paddingVertical: moderateScale(13) }}
          onClick={() => {
            onClickNext();
          }}
        />
      </View>
      <CustomeAlert
        show={showAlert}
        title={"Alert"}
        msg={"Please Select category"}
        onDismiss={() => {
          setShowAlert(false);
        }}
      />
    </SafeAreaView>
  );
};

export default PostCategory;

const styles = StyleSheet.create({
  SmallHading: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(10),
    marginBottom: verticalScale(10),
  },
  categoryCard: {
    borderWidth: 0.5,
    height: verticalScale(60),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(10),
    backgroundColor: "#FFFFFF",
  },
  categoryCardLeftView: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  categoryTxt: {
    fontSize: scale(13),
    fontFamily: "Montserrat-Regular",
  },
});
