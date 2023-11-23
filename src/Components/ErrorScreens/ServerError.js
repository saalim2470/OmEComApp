import { StyleSheet, Text, View } from "react-native";
import React from "react";
import commonStyle from "../../Constants/commonStyle";

const ServerError = ({ statusCode }) => {
  return (
    <View
      style={[
        commonStyle.container,
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      {statusCode == 500 && <Text>Internal server Error</Text>}
      {statusCode == 404 && <Text>Not Found</Text>}
    </View>
  );
};

export default ServerError;

const styles = StyleSheet.create({});
