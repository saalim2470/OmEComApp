import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FriendlyMsg = ({ msg }) => {
  return (
    <View style={[{ alignItems: "center", justifyContent: "center", flex: 1 }]}>
      <Text style={{ fontFamily: "Montserrat-Light" }}>
        {msg ? msg : "Data Not Found"}
      </Text>
    </View>
  );
};

export default FriendlyMsg;

const styles = StyleSheet.create({});
