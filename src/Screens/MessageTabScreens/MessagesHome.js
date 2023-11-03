import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import commonStyle from "../../Constants/commonStyle";
import CustomeHeader from "../../Components/CustomeHeader";
import { TextInput } from "react-native";
import { Image } from "react-native";
import images from "../../Constants/images";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Divider } from "react-native-paper";
import MessageStripeCard from "../../Components/MessageScreenComponents.js/MessageStripeCard";
import screenName from "../../Constants/screenName";
import TextBoxWithLabel from "../../Components/TextBoxWithLabel";

const MessagesHome = ({ navigation }) => {
  const data = [
    {
      id: 1,
      userName: "Albert Flores",
      msg: "Hey there Where up?",
      profileImg:
        "https://pbs.twimg.com/profile_images/685700874434314240/80T5j3HF_400x400.jpg",
      productImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRABH5we5erv84MFP1C4sPZjBLZPR9G4PdSSQ3qUiETN_XDIFrA",
    },
    {
      id: 2,
      userName: "Jenny Wilson",
      msg: "Hey there?",
      profileImg:
        "https://www.shutterstock.com/image-photo/head-shot-young-attractive-businessman-260nw-1854697390.jpg",
      productImg:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFja2V0fGVufDB8fDB8fHww",
    },
    {
      id: 3,
      userName: "Jacob Jones",
      msg: "Hey! Whats up?",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlYoDi4xcHh-rR-TARrw0GXBUiIyDlIqOSclRM7f1ZTwqYHp08eqsGB3lnaCHvphFB3m8&usqp=CAU",
      productImg: "",
    },
    {
      id: 4,
      userName: "Guy Hawkins",
      msg: "Hey there Where up?",
      profileImg:
        "https://st4.depositphotos.com/1016231/20219/i/450/depositphotos_202192658-stock-photo-fashion-girl-glasses-stands-posing.jpg",
      productImg:
        "https://5.imimg.com/data5/NZ/BM/XP/SELLER-4410597/cotton-shirting-fabric.jpg",
    },
  ];
  return (
    <View style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"Messages"} />
      <View style={commonStyle.innerContainer}>
        <View style={styles.searchBoxStyle}>
          <Image source={images.searchIcon} style={styles.searchIconStyle} />
          <TextInput
            placeholder="Search"
            style={{
              paddingHorizontal: moderateScale(6),
              width: "90%",
            }}
          />
        </View>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={<Divider />}
          keyExtractor={(item) => {
            item.id;
          }}
          renderItem={({ item, index }) => {
            return (
              <MessageStripeCard
                data={item}
                onClickMsg={() => {
                  navigation.navigate(screenName.messageChatScreen);
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default MessagesHome;

const styles = StyleSheet.create({
  searchBoxStyle: {
    flexDirection: "row",
    paddingHorizontal: moderateScale(5),
    height: verticalScale(33),
    alignItems: "center",
    width: "100%",
    borderRadius: scale(3),
    backgroundColor: "#f3f3f3",
    marginBottom: verticalScale(20),
  },
  searchIconStyle: {
    width: scale(15),
    height: scale(15),
    marginRight: moderateScale(10),
    marginLeft: moderateScale(8),
  },
});
