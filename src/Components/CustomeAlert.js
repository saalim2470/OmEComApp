import { StyleSheet, View } from "react-native";
import React from "react";
import { Dialog, Portal, Text } from "react-native-paper";

const CustomeAlert = ({ show, onDismiss = () => {} }) => {
  return (
    <Portal>
      <Dialog visible={show} onDismiss={onDismiss()}>
        <Dialog.Title>This is a title</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">This is simple dialog</Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default CustomeAlert;

const styles = StyleSheet.create({});
