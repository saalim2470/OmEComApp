import { StyleSheet, Text, View } from "react-native";
import React from "react";
import commonStyle from "../../Constants/commonStyle";

const ServerError = ({ statusCode, msg }) => {
  return (
    <View
      style={[
        commonStyle.container,
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      {statusCode == 500 ? (
        <Text>Internal server Error</Text>
      ) : statusCode == 404 ? (
        <Text>Page Not Found</Text>
      ) : (
        <Text>{msg ? msg : "Some error occured"}</Text>
      )}
    </View>
  );
};

export default ServerError;

const styles = StyleSheet.create({});
