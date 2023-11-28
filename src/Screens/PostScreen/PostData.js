import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import commonStyle from "../../Constants/commonStyle";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import CustomeButton from "../../Components/CustomeButton";
import { Avatar } from "react-native-paper";
import { TextInput } from "react-native";
import { Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";
import BottomComponent from "../../Components/PostScreenComponent/BottomComponent";
import Modal from "react-native-modal";
import { Pressable } from "react-native";

const PostData = () => {
  return (
    <SafeAreaProvider style={commonStyle.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.headerView}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="arrow-back-outline"
              size={scale(25)}
              color="black"
            />
            <Text style={styles.headerTxt}>Create post</Text>
          </View>
          <CustomeButton
            style={{
              width: scale(50),
              borderRadius: scale(5),
              marginVertical: moderateScale(0),
            }}
            title={"Post"}
          />
        </View>
        <View style={styles.userView}>
          <Avatar.Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXmEcKM5U_dh_rHnbnc1UHQHu6gtJmxurdXg&usqp=CAU",
            }}
            size={scale(45)}
          />
          <View style={{ marginLeft: moderateScale(5) }}>
            <Text style={styles.headingTxt}>Saalim Shaikh</Text>
          </View>
        </View>
        <View style={styles.txtInputView}>
          <TextInput placeholder="About Something" multiline={true} />
          <View style={{borderWidth:1}}></View>
        </View>
      </View>
      <BottomComponent />
      {/* <Modal
        isVisible={false}
        coverScreen={true}
        backdropOpacity={0.4}
        style={{ marginHorizontal: 0, marginVertical: 0 }}
      >
        <View
          style={{
            backgroundColor: "white",
            // height: verticalScale(50),
            position: "absolute",
            bottom: 0,
            width: "100%",
            paddingVertical: verticalScale(5),
          }}
        >
          <Pressable
            style={{
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              padding: scale(7),
            }}
          >
            <Ionicons name="ios-images" size={scale(23)} color="green" />
            <Text style={{ marginRight: moderateScale() }}>Images</Text>
          </Pressable>
        </View>
      </Modal> */}
    </SafeAreaProvider>
  );
};

export default PostData;

const styles = StyleSheet.create({
  headerView: {
    borderBottomWidth: 0.5,
    marginTop: verticalScale(30),
    paddingHorizontal: moderateScale(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(5),
  },
  headerTxt: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(18),
    marginLeft: moderateScale(4),
  },
  userView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(8),
    marginTop: verticalScale(5),
  },
  headingTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: scale(16),
  },
  txtInputView: {
    marginTop: verticalScale(5),
    paddingHorizontal: moderateScale(8),
  },
});
