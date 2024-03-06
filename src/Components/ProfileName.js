import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import moment from 'moment';
import { getUserUploadTime } from '../Constants/Constant';
import images from '../Constants/images';

const ProfileName = ({data}) => {
  return (
    <View style={{ marginLeft: moderateScale(5), flex: 1 }}>
    {data?.placeName ? (
      <View
        style={[
          styles.onlyRowStyle,
          {
            flexWrap: "wrap",
          },
        ]}
      >
        <Text style={styles.headingTxt}>
          {`${data?.user?.firstname} ${data?.user?.lastname}`}
        </Text>
        <Text
          style={[
            {
              marginRight: moderateScale(5),
              fontFamily: "Montserrat-Light",
              fontSize: moderateScale(15),
            },
          ]}
        >
          - is at
        </Text>
        <TouchableOpacity
          // onPress={() => openMap()}
          activeOpacity={0.6}
          style={[
            styles.onlyRowStyle,
            {
              marginTop: verticalScale(5),
            },
          ]}
        >
          <Image
            source={images.location}
            resizeMode="contain"
            style={{
              width: scale(15),
              height: scale(13),
              marginRight: moderateScale(2),
            }}
          />
          <Text
            style={[styles.headingTxt, { fontSize: moderateScale(15) }]}
          >
            {`${data?.placeName}`}
          </Text>
        </TouchableOpacity>
      </View>
    ) : (
      <Text style={styles.headingTxt}>
        {`${data?.user?.firstname} ${data?.user?.lastname}`}
      </Text>
    )}
    <Text style={styles.subTxt}>
      {moment(getUserUploadTime(data?.createdDate))
        .startOf("seconds")
        .fromNow()}
    </Text>
  </View>
  )
}

export default ProfileName

const styles = StyleSheet.create({
    cardHeaderView: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: moderateScale(10),
      justifyContent: "space-between",
      paddingVertical: verticalScale(5),
    },
    headingTxt: {
      fontFamily: "Montserrat-Bold",
      fontSize: moderateScale(15),
    },
    onlyRowStyle: {
      flexDirection: "row",
      alignItems: "center",
    },
    subTxt: {
      fontSize: scale(9.5),
      fontFamily: "Montserrat-Light",
    },
  });