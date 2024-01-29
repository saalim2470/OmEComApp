import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import commonStyle from "../../Constants/commonStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CategoryCard from "../../Components/PostScreenComponent/CategoryCard";
import { FlatList } from "react-native";
import CustomeButton from "../../Components/CustomeButton";
import { useState } from "react";
import screenName from "../../Constants/screenName";
import { useDispatch, useSelector } from "react-redux";
import CustomeAlert from "../../Components/CustomeAlert";
import { useEffect } from "react";
import { setCategory } from "../../store/addAdContentSlices/AddPostData";
import { setCategoryId } from "../../store/StoreDataSlice";
import {
  getCategoryData,
  setCategoryPage,
} from "../../store/categorySlices/CategorySlice";

const PostCategory = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.addPost);
  const categoryData = useSelector((state) => state.category.categoryData);
  const categoryPage = useSelector((state) => state.category.page);
  const categoryPageSize = useSelector((state) => state.category.pageSize);
  const categorySuccess = useSelector((state) => state.category.isSuccess);
  const categoryMoreLoading = useSelector(
    (state) => state.category.isMoreLoading
  );
  const categoryReachedEnd = useSelector(
    (state) => state.category.isReachedEnd
  );
  const [checked, setChecked] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (!categoryData) {
      getCategory();
    }
  }, [categoryPage]);
  useEffect(() => {
    if (categoryData && categorySuccess) {
      setCategories(categoryData);
    }
  }, [categoryData, categorySuccess]);
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
          onClickNext();
        }}
        status={checked}
      />
    );
  };
  const getCategory = () => {
    dispatch(getCategoryData(categoryPage, categoryPageSize));
  };
  const listFooterComponent = () => {
    return (
      categoryMoreLoading && (
        <ActivityIndicator size={"large"} color={colors.themeColor} />
      )
    );
  };
  const onReachedEnd = () => {
    if (!categoryReachedEnd) {
      dispatch(setCategoryPage(categoryPage + 1));
      // getCategory();
    }
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      {/* <Header /> */}
      <View
        style={[commonStyle.innerContainer, { marginTop: verticalScale(30) }]}
      >
        <View style={commonStyle.row}>
          <View>
            <Text style={commonStyle.headingTxt}>Category</Text>
            <Text style={styles.SmallHading}>Select relavant category</Text>
          </View>
          {/* <CustomeButton
            title={"Next"}
            style={{
              paddingVertical: verticalScale(8),
              paddingHorizontal: moderateScale(12),
            }}
            onClick={() => {
              onClickNext();
            }}
          /> */}
        </View>
        <FlatList
          data={categories}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: verticalScale(10) }}
          keyExtractor={(item, index) => {
            return `category_${item.id}_${index}`;
          }}
          renderItem={renderItem}
          ListFooterComponent={listFooterComponent}
          onEndReached={onReachedEnd}
        />
      </View>
      <CustomeAlert
        show={showAlert}
        title={"Alert"}
        msg={"Please Select category"}
        onDismiss={() => {
          setShowAlert(false);
        }}
        onCliCkOk={() => {
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
