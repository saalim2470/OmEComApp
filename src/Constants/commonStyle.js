import { StyleSheet } from "react-native";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";

const commonStyle = StyleSheet.create({
  headingTxt: {
    marginVertical: moderateVerticalScale(10),
    fontSize: scale(18),
    fontFamily: "Montserrat-Bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  innerContainer: {
    paddingHorizontal: moderateScale(15),
    marginTop: verticalScale(8),
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallHeading: {
    marginVertical: moderateVerticalScale(10),
    fontSize: moderateScale(14),
    fontFamily: "Montserrat-Bold",
  },
});

export default commonStyle;
