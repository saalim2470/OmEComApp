import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Portal, Snackbar } from "react-native-paper";

const CustomeSnackbar = ({ data, onClickDismiss = () => {} }) => {
  return (
    <Portal>
      <Snackbar
        visible={data?.isError}
        duration={1500}
        onDismiss={() => onClickDismiss()}
        action={{
          label: "close",
        }}
      >
        {data?.msg}
      </Snackbar>
    </Portal>
  );
};

export default CustomeSnackbar;

const styles = StyleSheet.create({});
