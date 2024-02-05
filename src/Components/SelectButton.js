import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Divider, RadioButton } from "react-native-paper";
import colors from "../Constants/colors";
import CustomeButton from "./CustomeButton";

const SelectButton = ({
  onClickBtn = () => {},
  title,
  btnData,
  onClickNextBtn = () => {},
  value,
}) => {
  const [selectBtn, setSelectBtn] = useState();
  const [btns, setBtns] = useState(btnData);

  return (
    <View style={{ marginHorizontal: moderateScale(10), flex: 1 }}>
      <Text style={styles.heading}> {title}</Text>
      <Divider />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: verticalScale(8), flex: 1 }}
      >
        {btns?.map((item, index) => {
          return (
            <View style={styles.filterRow} key={item?.id.toString()}>
              <Text style={styles.filterTxt}>{item?.title}</Text>
              <RadioButton
                value={value}
                status={value === item?.id ? "checked" : "unchecked"}
                color={colors.selectedColor}
                onPress={() => {
                  //   setvalue(item?.id);
                  onClickBtn(item?.id);
                }}
              />
            </View>
          );
        })}
      </ScrollView>
      <CustomeButton
        title={"Done"}
        disabled={!value ? true : false}
        onClick={() => {
          onClickNextBtn();
        }}
        style={{ marginHorizontal: moderateScale(10) }}
      />
    </View>
  );
};

export default SelectButton;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Montserrat-Medium",
    fontSize: scale(18),
    marginBottom: verticalScale(7),
    textAlign: "center",
    marginTop: verticalScale(8),
  },
  filterRow: {
    marginVertical: verticalScale(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterTxt: {
    fontSize: scale(15),
    fontFamily: "Montserrat-Regular",
  },
});
