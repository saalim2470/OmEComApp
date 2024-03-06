import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import SearchHeader from "../../Components/SearchScreenComponents/SearchHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getSearchData,
  resetSearchResultPage,
  setSearchResultPage,
} from "../../store/searchContentSlices/SearchContentSlice";
import FeedCard from "../../Components/ProductComponent/FeedCard";
import colors from "../../Constants/colors";
import ShimmerLoading from "../../Components/LoadingComponents/ShimmerLoading";
import screenName from "../../Constants/screenName";
import useLikeHook from "../../CustomeHooks/useLikeHook";
import { useFocusEffect } from "@react-navigation/native";
import CustomeFlatlist from "../../Components/CustomeFlatlist";

const SearchResultScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const filterType = useSelector((state) => state.storeData.searchFilterId);
  const {
    isLoading: searchLoading,
    searchResult: searchResultRes,
    isSuccess: searchSuccess,
    error: searchError,
    isMoreLoading: searchMoreLoading,
    isReachedEnd: searchDataReachedEnd,
    page: searchPage,
  } = useSelector((state) => state.searchContent);
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
  const { postData, setPostData } = useLikeHook(likeDataRes, saveDataRes);
  const [currentIndex, setCurrentIndex] = useState();
  const [currentPost, setCurrentPost] = useState();
  const [searchKeyWord, setSearchKeyWord] = useState("");
  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen focused");
      return () => {
        console.log("Screen unfocused");
        setCurrentPost(null);
      };
    }, [])
  );
  useEffect(() => {
    if (searchKeyWord != "")
      dispatch(getSearchData(searchKeyWord, searchPage, 10, filterType));
  }, [searchPage]);
  useEffect(() => {
    if (searchResultRes != null && searchSuccess) {
      setPostData(searchResultRes);
    }
  }, [searchResultRes, searchSuccess]);
  const onClickSearch = () => {
    if (searchKeyWord != "") {
      dispatch(resetSearchResultPage());
      dispatch(getSearchData(searchKeyWord, 1, 10, filterType));
    }
  };
  const listFooterComponent = () => {
    return (
      searchMoreLoading && (
        <ActivityIndicator
          style={{ paddingVertical: verticalScale(20) }}
          size={"large"}
          color={colors.themeColor}
        />
      )
    );
  };
  const onReachedEnd = () => {
    if (!searchDataReachedEnd) {
      dispatch(setSearchResultPage(searchPage + 1));
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <FeedCard
        itemData={item}
        currentPost={currentPost}
        onClickMoreBtn={() => {
          navigation.navigate(screenName.productDetail, { data: item });
        }}
      />
    );
  };
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentPost(viewableItems[0].item?.id);
    }
  }).current;
  return (
    <SafeAreaView style={commonStyle.container}>
      <View style={styles.innerContainer}>
        {/* header view start */}
        <SearchHeader
          value={searchKeyWord}
          onClickClearIcon={() => {
            setSearchKeyWord("");
          }}
          onChange={(keyWord) => {
            setSearchKeyWord(keyWord);
          }}
          onClickSearch={() => {
            onClickSearch();
          }}
        />
      </View>
      {searchLoading ? (
        // <Loading />
        <ShimmerLoading />
      ) : !searchLoading && searchSuccess && searchResultRes?.length === 0 ? (
        <Text style={{ alignSelf: "center" }}>Data Not Found</Text>
      ) : (
        <View>
          <CustomeFlatlist
            data={postData}
            renderItem={renderItem}
            onEndReached={onReachedEnd}
            listFooterComponent={listFooterComponent}
            onViewableItemsChanged={onViewableItemsChanged}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchResultScreen;

const styles = StyleSheet.create({
  innerContainer: {
    paddingHorizontal: moderateScale(15),
  },
  whiteBackContainer: {
    marginTop: verticalScale(10),
    backgroundColor: "#FFFFFF",
    elevation: 3,
  },
});
