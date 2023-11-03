import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import commonStyle from "../../Constants/commonStyle";
import Header from "../../Components/Header";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CategoryCard from "../../Components/PostScreenComponent/CategoryCard";
import { FlatList } from "react-native";
import CustomeButton from "../../Components/CustomeButton";
import { useState } from "react";
import images from "../../Constants/images";
import screenName from "../../Constants/screenName";

const PostCategory = ({ navigation }) => {
  const data = [
    {
      id: 1,
      name: "Vehicals",
      icon: images.cat_vehicalIcon,
    },
    {
      id: 2,
      name: "Electricals",
      icon: images.cat_electricIcon,
    },
    {
      id: 3,
      name: "Electronics",
      icon: images.cat_electronicsIcon,
    },
    {
      id: 4,
      name: "Animals & Pets",
      icon: images.cat_animalIcon,
    },
    {
      id: 5,
      name: "Home Decor",
      icon: images.cat_homeDecorIcon,
    },
    {
      id: 6,
      name: "Farming",
      icon: images.cat_farmingIcon,
    },
    {
      id: 7,
      name: "Fruit & Vegitables",
      icon: images.cat_fruitIcon,
    },
    {
      id: 8,
      name: "Others",
      icon: images.cat_othersIcon,
    },
  ];
  const [checked, setChecked] = useState();
  return (
    <SafeAreaView style={commonStyle.container}>
      <Header />
      <View style={commonStyle.innerContainer}>
        <Text style={commonStyle.headingTxt}>Category</Text>
        <Text style={styles.SmallHading}>Select relavant category</Text>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: verticalScale(10) }}
          keyExtractor={(item) => {
            item.id;
          }}
          renderItem={({ item, index }) => {
            return (
              <CategoryCard
                item={item}
                onClick={() => {
                  setChecked(item.name);
                }}
                status={checked}
              />
            );
          }}
        />
        <CustomeButton
          title={"Next"}
          style={{ paddingVertical: moderateScale(13) }}
          onClick={() => {
            navigation.navigate(screenName.itemDetail);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PostCategory;

const styles = StyleSheet.create({
  SmallHading: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(10),
    marginBottom: verticalScale(10),
  },
  categoryCard: {
    borderWidth: 0.5,
    height: verticalScale(60),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(10),
    backgroundColor: "#FFFFFF",
  },
  categoryCardLeftView: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  categoryTxt: {
    fontSize: scale(13),
    fontFamily: "Montserrat-Regular",
  },
});
