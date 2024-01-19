import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../../Constants/colors";

const Filters = () => {
  const [selectFilter, setSelectFilter] = useState();
  return (
    <View style={{ marginHorizontal: moderateScale(10) }}>
      <Text style={styles.heading}>Filter</Text>
        <TouchableOpacity
          style={[
            styles.btn,
            { backgroundColor: selectFilter === 0 ? colors.themeColor : null },
          ]}
          activeOpacity={0.6}
          onPress={() => setSelectFilter(0)}
        >
          <Text
            style={[
              styles.btnTxt,
              { color: selectFilter === 0 ? "white" : null },
            ]}
          >
            Search By Content
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            { backgroundColor: selectFilter === 1 ? colors.themeColor : null },
          ]}
          activeOpacity={0.6}
          onPress={() => setSelectFilter(1)}
        >
          <Text
            style={[
              styles.btnTxt,
              { color: selectFilter === 1 ? "white" : null },
            ]}
          >
            Search By user
          </Text>
        </TouchableOpacity>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  btn: {
    borderWidth: 0.8,
    marginVertical: verticalScale(8),
    padding: moderateScale(5),
    // borderColor: colors.themeColor,
  },
  btnTxt: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(13),
  },
  heading: {
    fontFamily: "Montserrat-Bold",
    fontSize: scale(16),
    marginBottom: verticalScale(5),
  },
});
