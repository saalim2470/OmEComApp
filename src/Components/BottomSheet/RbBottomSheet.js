import React, { useEffect, useRef, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

const RbBottomSheet = ({ isOpen, setIsOpen, height, children }) => {
  const refRBSheet = useRef();
  useEffect(() => {
    if (isOpen) {
      refRBSheet.current.open();
    } else {
      refRBSheet.current.close();
    }
  }, [isOpen]);
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={true}
      height={height}
      onClose={() => setIsOpen(false)}
      minClosingHeight={10}
      openDuration={700}
      dragFromTopOnly={true}
      customStyles={{
        draggableIcon: {
          backgroundColor: "#000",
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      {children}
    </RBSheet>
  );
};
export default RbBottomSheet;
const styles = StyleSheet.create({});
