import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import commonStyle from '../../Constants/commonStyle'
import MainHeader from '../../Components/MainHeader'
import ServerError from '../../Components/ErrorScreens/ServerError'
import Loading from '../../Components/Loading'
import { Divider } from 'react-native-paper'
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import ProfileFeedCard from '../../Components/ProfileScreenComponent/ProfileFeedCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUserContentApi } from '../../store/profileSlices/GetUserContentSlice'

const MyAds = ({route}) => {
  const dispatch = useDispatch();
  const {
    userContentData: userContentRes,
    error: userContentError,
    isLoading: userContentLoading,
  } = useSelector((state) => state.getUSerContent);
  useEffect(() => {
    dispatch(getUserContentApi(1, 70));
  }, [route]);
  const renderItem = ({ item, index }) => {
    return <ProfileFeedCard itemData={item} />;
  };
  return (
   <SafeAreaView style={commonStyle.container}>
  <MainHeader />
  {userContentLoading ? (
        <Loading />
      ) : userContentError != null && !userContentError.Success ? (
        <ServerError
          msg={
            userContentError?.ErrorMessage ||
            "Some error occured during fetching data"
          }
        />
      ) : userContentRes.length <= 0 ? (
        <Text>Post your fisrt Ad</Text>
      ) : (
        <FlatList
          data={userContentRes}
          keyExtractor={(item, index) => {
            `data_${item.id}_${index}`;
          }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={
            <Divider style={{ marginBottom: verticalScale(8) }} />
          }
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          renderItem={renderItem}
        />
      )}
   </SafeAreaView>
  )
}

export default MyAds

const styles = StyleSheet.create({})