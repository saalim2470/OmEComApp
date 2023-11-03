import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import Header from "../../Components/Header";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import colors from "../../Constants/colors";
import images from "../../Constants/images";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import CustomeButton from "../../Components/CustomeButton";
import screenName from "../../Constants/screenName";
import * as ImagePicker from "expo-image-picker";

const AddProductImage = ({ navigation }) => {
  const [image, setImage] = useState([
    "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSbSJTQ-bLP_wkxHjbtNYHIQqv29xVJ9DEi9XZTfQiFvVIge8F5",
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQfnV3IXv0mCGxbLJ4DijOYj0tXsbZo1JQ1h6ZWFFTgr6fhHG5h",
  ]);
  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage([...image, result.assets[0].uri]);
    }
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <Header />
      <View style={commonStyle.innerContainer}>
        <Text style={commonStyle.headingTxt}>Add Photos</Text>
        <Text style={styles.SmallHading}>Add Photos of the items</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imgGridView}>
            {image.map((item, index) => {
              return (
                <View style={styles.imgBox} key={index}>
                  <Image
                    resizeMode="cover"
                    style={styles.imgStyle}
                    source={{
                      uri: item,
                    }}
                  />
                </View>
              );
            })}
            <View
              style={[
                styles.imgBox,
                {
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors.greyColor,
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  openImagePicker();
                }}
              >
                <Image source={images.plusIcon} style={styles.plusBtn} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <CustomeButton
          title={"Next"}
          onClick={() => {
            navigation.navigate(screenName.postCategory);
          }}
          style={{ paddingVertical: moderateScale(13) }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddProductImage;

const styles = StyleSheet.create({
  SmallHading: {
    fontFamily: "Montserrat-Light",
    fontSize: scale(10),
    marginBottom: verticalScale(10),
  },
  imgBox: {
    width: scale(100),
    height: verticalScale(100),
    flexDirection: "column",
    margin: scale(3),
  },
  plusBtn: {
    width: scale(22),
    height: scale(22),
    tintColor: colors.selectedColor,
  },
  imgStyle: {
    width: "100%",
    height: "100%",
  },
  imgGridView: {
    marginTop: verticalScale(10),
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: verticalScale(10),
  },
});
