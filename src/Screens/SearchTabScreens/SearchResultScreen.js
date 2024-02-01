import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import ImageGrid from "../../Components/ImageGrid";
import { useDispatch, useSelector } from "react-redux";
import SearchHeader from "../../Components/SearchScreenComponents/SearchHeader";
import Loading from "../../Components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getSearchData,
  resetSearchResultPage,
  setSearchResultPage,
} from "../../store/searchContentSlices/SearchContentSlice";
import { Divider } from "react-native-paper";
import FeedCard from "../../Components/ProductComponent/FeedCard";
import colors from "../../Constants/colors";
import ShimmerLoading from "../../Components/LoadingComponents/ShimmerLoading";

const SearchResultScreen = ({ navigation }) => {
  const dispatch = useDispatch();
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
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    if (searchKeyWord != "")
      dispatch(getSearchData(searchKeyWord, searchPage, 10));
  }, [searchPage]);
  useEffect(() => {
    if (searchResultRes != null && searchSuccess) {
      setSearchData(searchResultRes);
    }
  }, [searchResultRes, searchSuccess]);
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
  const updateData = (data, actionType) => {
    const updatedData = searchData.map((item) => {
      if (actionType === "like" && item.id === data.contentId) {
        return {
          ...item,
          isCurrentUserLiked: data.isLiked,
          totalLikes: data.totalLikes,
        };
      }
      if (actionType === "save" && item.id === data.adContentID) {
        return {
          ...item,
          isCurrentUserSaved: data.isSaved,
        };
      }
      return item;
    });
    setSearchData(updatedData);
  };
  const onClickSearch = () => {
    if (searchKeyWord != "") {
      dispatch(resetSearchResultPage());
      dispatch(getSearchData(searchKeyWord, 1, 10));
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
        onClickMoreBtn={() => {
          navigation.navigate(screenName.productDetail, { data: item });
        }}
      />
    );
  };
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
        <ShimmerLoading/>
      ) : !searchLoading && searchSuccess && searchResultRes?.length === 0 ? (
        <Text style={{ alignSelf: "center" }}>Data Not Found</Text>
      ) : (
        <View>
          <FlatList
            data={searchData}
            keyExtractor={(item, index) => {
              return `data_${item.id}_${index}`;
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
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={10}
            removeClippedSubviews={true}
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
