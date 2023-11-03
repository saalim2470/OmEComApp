import { StyleSheet, Text, View, Image } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const CommentView = ({ isShow, onChange = () => {} }) => {
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["50%", "90%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    onChange(index);
  }, []);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={"collapse"}
        enableTouchThrough={true}
        // disappearsOnIndex={1}
        // appearsOnIndex={2}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isShow}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      onChange={handleSheetChanges}
    >
      <View style={{ borderWidth: 1, flex: 1 }}>
        <Text>Comments</Text>
      </View>
    </BottomSheet>
  );
};

export default CommentView;

const styles = StyleSheet.create({});
