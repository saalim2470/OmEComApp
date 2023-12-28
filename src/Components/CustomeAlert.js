import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

const CustomeAlert = ({ show, title, msg, onDismiss = () => {},onCliCkOk=()=>{} }) => {
  return (
    <Portal>
      <Dialog visible={show} onDismiss={() => onDismiss()}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{msg}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => onDismiss()}>Cancel</Button>
          <Button onPress={() => onCliCkOk()}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CustomeAlert;

const styles = StyleSheet.create({});
