import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import ImageGrid from "../../Components/ImageGrid";
import { useSelector } from "react-redux";
import SearchHeader from "../../Components/SearchScreenComponents/SearchHeader";
import Loading from "../../Components/Loading";

const SearchResultScreen = ({ navigation }) => {
  const {
    isLoading: searchLoading,
    searchResult: searchResultRes,
    isSuccess: searchSuccess,
    error: searchError,
  } = useSelector((state) => state.searchContent);
  const a = useSelector((state) => state.searchContent);
  console.log("-=-=-=search -==", a);
  const [searchTxt, setSearchTxt] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isDataFound, setIsDataFound] = useState(false);
  useEffect(() => {
    if (searchSuccess) {
      searchResultRes?.length <= 0
        ? setIsDataFound(false)
        : setIsDataFound(true);
      setSearchData(searchResultRes);
    }
  }, [searchResultRes]);

  return (
    <View style={commonStyle.container}>
      <View style={styles.innerContainer}>
        {/* header view start */}
        <SearchHeader />
        {searchLoading ? (
          <Loading />
        ) : !searchLoading && searchError == null && searchResultRes == null ? (
          <Text style={[commonStyle.headingTxt, { fontSize: scale(12) }]}>
            {`${searchData?.length} items found for "${searchTxt}"`}
          </Text>
        ) : (
          <ImageGrid data={searchData} />
        )}
      </View>
    </View>
  );
};

export default SearchResultScreen;

const styles = StyleSheet.create({
  innerContainer: {
    marginTop: verticalScale(8),
    flex: 1,
    paddingHorizontal: moderateScale(15),
  },
});
