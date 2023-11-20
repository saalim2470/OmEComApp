import { StyleSheet, Text, View, Image } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const SubscriptionBottomSheet = ({ isShow, onChange = () => {} }) => {
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["30%", "75%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    onChange(index);
  }, []);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
        opacity={0.5}
      />
    ),
    []
  );
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isShow}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onChange={handleSheetChanges}
      backgroundStyle={{ borderWidth: 1 }}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.contentContainer}>
        <Text> &#9679; </Text>
      </View>
    </BottomSheet>
  );
};

export default SubscriptionBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(15),
    paddingTop: verticalScale(5),
  },
});
