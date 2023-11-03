import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import commonStyle from "../Constants/commonStyle";
import MainAppHeader from "../Components/MainAppHeader";
import colors from "../Constants/colors";
import { Avatar } from "react-native-paper";
import images from "../Constants/images";
import CustomeButton from "../Components/CustomeButton";
import { useNavigation } from "@react-navigation/native";
import screenName from "../Constants/screenName";

const SuggestStore = () => {
  const navigation = useNavigation();
  const data = [
    {
      id: 0,
      storeName: "Big Brand",
      userName: "@brandi",
      profileImage:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQdKeks92pQ6vA_ifVh7bcF7n7TCAxJu5bsK8zOQoz_G6jIcmWl",
      images: [
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR4GqIRqFTrUAwQZnziNe31B4emzWufpcocjjU_SgQ2i6XcYXoQ",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlK_7k43-z3SJxVJ7R2V7nH7--A7SuwZLgXEg1SJWaWQLqj3nB",
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQb39jVZAE5IlzIOGClUaeADSoD1rzV2s7wiz2faJl66_g7m5aG",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWN8HnhVxqMVHPcrzqP44to43vG0CmeuRoHAmNxQayevgrDmzv",
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSYiW0lIt9u56EjlJlJC6NIg1TgcWAt-I15qOFNwtpHoIY2m-TM",
      ],
    },
    {
      id: 1,
      storeName: "Big Brand",
      userName: "@brandi",
      profileImage:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQdKeks92pQ6vA_ifVh7bcF7n7TCAxJu5bsK8zOQoz_G6jIcmWl",
      images: [
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR4GqIRqFTrUAwQZnziNe31B4emzWufpcocjjU_SgQ2i6XcYXoQ",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlK_7k43-z3SJxVJ7R2V7nH7--A7SuwZLgXEg1SJWaWQLqj3nB",
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQb39jVZAE5IlzIOGClUaeADSoD1rzV2s7wiz2faJl66_g7m5aG",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWN8HnhVxqMVHPcrzqP44to43vG0CmeuRoHAmNxQayevgrDmzv",
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSYiW0lIt9u56EjlJlJC6NIg1TgcWAt-I15qOFNwtpHoIY2m-TM",
      ],
    },
  ];
  return (
    <SafeAreaView style={commonStyle.container}>
      <MainAppHeader />
      <View style={commonStyle.innerContainer}>
        <Text style={commonStyle.headingTxt}>Suggested for you to follow</Text>
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.card}>
                <View style={styles.stripeView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {/* <View style={styles.profileCicle}> */}
                    {/* <Image
                        source={{ uri: item.img }}
                        resizeMode="cover"
                        style={{ width: "100%", height: "100%" }}
                      /> */}
                    {/* </View> */}
                    <Avatar.Image
                      size={scale(30)}
                      source={{
                        uri: item.profileImage,
                      }}
                      style={{ marginRight: moderateScale(3) }}
                    />
                    <View>
                      <Text style={styles.nameTxt}>{item.storeName}</Text>
                      <Text style={styles.emailTxt}>{item.userName}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[styles.btnView, { backgroundColor: "#f7f0ff" }]}
                  >
                    <Text
                      style={[
                        styles.btnTxt,
                        {
                          color: colors.themeColor,
                        },
                      ]}
                    >
                      Follow
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.cardBody}>
                  <View style={{ flex: 1, marginRight: moderateScale(3) }}>
                    <Image
                      source={{
                        uri: item.images[0],
                      }}
                      resizeMode="cover"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    {item.images.slice(1).map((element, ind) => {
                      return (
                        <Image
                          source={{
                            uri: element,
                          }}
                          resizeMode="cover"
                          style={{
                            width: "48%",
                            height: "48%",
                            margin: moderateScale(1),
                          }}
                        />
                      );
                    })}
                  </View>
                </View>
              </View>
            );
          }}
        />
        <CustomeButton
          title={"Done"}
          onClick={() => {
            navigation.navigate(screenName.homeScreen_drawerNavigation);
          }}
          style={{
            height: verticalScale(38),
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SuggestStore;

const styles = StyleSheet.create({
  profileCicle: {
    width: scale(33),
    height: scale(33),
    borderRadius: 100,
    marginRight: moderateScale(6),
    overflow: "hidden",
    borderWidth: 1,
  },
  nameTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: moderateScale(11),
  },
  emailTxt: {
    fontFamily: "Montserrat-Regular",
    fontSize: moderateScale(9),
    marginTop: verticalScale(1.5),
  },
  stripeView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: verticalScale(40),
    // paddingVertical: verticalScale(2),
    // borderTopWidth: 0.2,
    // borderBottomWidth: 0.2,
  },
  btnView: {
    width: scale(55),
    height: verticalScale(20),
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
  },
  btnTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: moderateScale(10.5),
  },
  card: {
    height: verticalScale(200),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(5),
  },
  cardBody: {
    flexDirection: "row",
    height: verticalScale(155),
    marginTop: verticalScale(5),
  },
});
