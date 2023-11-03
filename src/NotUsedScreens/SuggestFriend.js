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
import commonStyle from "../Constants/commonStyle";
import MainAppHeader from "../Components/MainAppHeader";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import colors from "../Constants/colors";
import CustomeButton from "../Components/CustomeButton";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import screenName from "../Constants/screenName";

const SuggestFriend = () => {
  const navigation = useNavigation();
  const data = [
    {
      id: 0,
      name: "Jerome Bell",
      email: "jerome@gmail.com",
      img: "https://www.mecgale.com/wp-content/uploads/2017/08/dummy-profile.png",
    },
    {
      id: 1,
      name: "Jenny Wilson",
      email: "jennyWilson@gmail.com",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQq6gaTf6N93kzolH98ominWZELW881HqCgw&usqp=CAU",
    },
    {
      id: 2,
      name: "Jerome Bell",
      email: "jerome@gmail.com",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Djw-ESwGJhydwzAcfHgJ0LDE0ab7m5lp9Q&usqp=CAU",
    },
    {
      id: 3,
      name: "Bessie Cooper",
      email: "bessie@gmail.com",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGFAqgki6wFc40CSPU0edlpw11kF_CVNAdDTHrsDi8FMi-XMB1ABQmouGcM9YE9p1MIoI&usqp=CAU",
    },
    {
      id: 4,
      name: "Jerome Bell",
      email: "jerome@gmail.com",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkorfoIvR3yhiEXZ8ymQ9haT_j7TNWpHn7Vw&usqp=CAU",
    },
    {
      id: 5,
      name: "Jerome Bell",
      email: "jerome@gmail.com",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJtGyTovDNKuEymNUKCMB_oc1SZKEQIGFOw&usqp=CAU",
    },
  ];
  return (
    <SafeAreaView style={commonStyle.container}>
      <MainAppHeader onClickRightIcon={() => {}} />
      <View style={commonStyle.innerContainer}>
        <Text
          style={[commonStyle.headingTxt, { marginBottom: verticalScale(30) }]}
        >
          Suggested Friend
        </Text>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => {
            item.id;
          }}
          renderItem={({ item, index }) => {
            return (
              <>
                <Divider />
                <View style={styles.stripeView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={styles.profileCicle}>
                      <Image
                        source={{ uri: item.img }}
                        resizeMode="cover"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </View>
                    <View>
                      <Text style={styles.nameTxt}>{item.name}</Text>
                      <Text style={styles.emailTxt}>{item.email}</Text>
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
              </>
            );
          }}
        />
        <CustomeButton
          title={"Next"}
          style={{ height: verticalScale(38) }}
          onClick={() => {
            navigation.navigate(screenName.tellUsAboutLooksLike);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SuggestFriend;

const styles = StyleSheet.create({
  profileCicle: {
    width: scale(33),
    height: scale(33),
    borderRadius: 100,
    marginRight: moderateScale(6),
    overflow: "hidden",
  },
  nameTxt: {
    fontFamily: "Montserrat-Bold",
    fontSize: moderateScale(11),
  },
  emailTxt: {
    fontFamily: "Montserrat-Regular",
    fontSize: moderateScale(9),
  },
  stripeView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: verticalScale(10),
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
});
