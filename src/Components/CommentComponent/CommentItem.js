import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const CommentItem = ({item}) => {
  return (
    <View style={styles.onlyRowStyle}>
    <Avatar.Image
      source={{
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXmEcKM5U_dh_rHnbnc1UHQHu6gtJmxurdXg&usqp=CAU",
      }}
      size={scale(30)}
    />
    <View
      style={{
        marginLeft: moderateScale(5),
        marginRight: moderateScale(15),
      }}
    >
      <Text style={styles.headingTxt}>{item?.userName}</Text>
      <Text style={styles.commentTxt}>
        {item?.comment}
      </Text>
    </View>
  </View>
  )
}

export default CommentItem

const styles = StyleSheet.create({
    headingTxt: {
        fontFamily: "Montserrat-Medium",
        fontSize: moderateScale(11),
      },
      onlyRowStyle: {
        flexDirection: "row",
        // alignItems: "center",
      },
      commentTxt: {
        fontFamily: "Montserrat-Medium",
        fontSize: scale(12),
        marginBottom:verticalScale(8)
      },
})