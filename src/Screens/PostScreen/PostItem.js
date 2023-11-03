import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { version } from "react";
import commonStyle from "../../Constants/commonStyle";
import images from "../../Constants/images";
import CustomeButton from "../../Components/CustomeButton";
import { scale, verticalScale } from "react-native-size-matters";
import PostHeader from "../../Components/PostScreenComponent/PostHeader";
import screenName from "../../Constants/screenName";

const PostItem = ({ navigation }) => {
  return (
    <SafeAreaView style={commonStyle.container}>
      <PostHeader
        leftTxt={"Welcome Elenar Pena"}
        leftView={
          "https://pbs.twimg.com/profile_images/685700874434314240/80T5j3HF_400x400.jpg"
        }
      />
      <View style={[commonStyle.innerContainer, { justifyContent: "center" }]}>
        <Image
          source={images.uploadFillIcon}
          style={styles.img}
          resizeMode="contain"
        />
        <Text style={styles.txt}>
          You currently dont't have any items far sale Post your first item to
          get started
        </Text>
        <CustomeButton
          title={"Post item"}
          style={styles.btn}
          onClick={() => {
            navigation.navigate(screenName.addProductImage);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  txt: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(12),
    alignSelf: "center",
    textAlign: "center",
  },
  img: {
    alignSelf: "center",
    marginBottom: verticalScale(20),
  },
  btn: {
    alignSelf: "center",
    width: scale(120),
    marginTop: verticalScale(20),
  },
});
