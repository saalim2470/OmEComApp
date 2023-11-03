import { Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import commonStyle from "../../Constants/commonStyle";
import Header from "../../Components/Header";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import TextBoxWithLabel from "../../Components/TextBoxWithLabel";
import { KeyboardAvoidingView } from "react-native";
import { Divider } from "react-native-paper";
import CustomeButton from "../../Components/CustomeButton";
import screenName from "../../Constants/screenName";

const ItemDetail = ({ navigation }) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={commonStyle.container}>
      <Header />
      <View style={commonStyle.innerContainer}>
        <Text style={commonStyle.headingTxt}>Describe your classified</Text>
        <Text style={styles.SmallHading}>Describe the item</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            style={{ marginTop: verticalScale(10), flex: 1 }}
            behavior="padding"
          >
            <TextBoxWithLabel
              labelTxt={"Classified Title"}
              placeholder={"Enter title"}
              onChange={(txt) => {}}
            />
            <TextBoxWithLabel
              labelTxt={"Condition"}
              placeholder={"Enter Condition"}
              onChange={(txt) => {}}
            />
            <TextBoxWithLabel
              labelTxt={"Price"}
              placeholder={"Enter Price"}
              onChange={(txt) => {}}
            />
            <TextBoxWithLabel
              labelTxt={"Brand"}
              placeholder={"Enter Brand"}
              onChange={(txt) => {}}
            />

            <TextBoxWithLabel
              labelTxt={"Short Description"}
              placeholder={"Enter descripition in one line"}
              onChange={(txt) => {}}
            />
            <TextBoxWithLabel
              labelTxt={"Description"}
              txtInputStyle={{
                height: "100%",
              }}
              textAlignVertical={"top"}
              placeholder={"Enter Description"}
              txtBoxStyle={{
                height: verticalScale(200),
                paddingVertical: verticalScale(3),
              }}
              multiline={true}
              onChange={(txt) => {}}
            />
            <Divider />
          </KeyboardAvoidingView>
        </ScrollView>
        {isKeyboardOpen ? null : (
          <CustomeButton
            title={"Next"}
            onClick={() => {
              navigation.navigate(screenName.productPreview);
            }}
            style={{
              paddingVertical: moderateScale(13),
              width: "100%",
              alignSelf: "center",
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  SmallHading: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(10),
    marginBottom: verticalScale(10),
  },
});
