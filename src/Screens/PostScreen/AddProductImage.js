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
import { useDispatch, useSelector } from "react-redux";
import { setFiles } from "../../store/addAdContentSlices/AddPostData";
import { useEffect } from "react";
import { Entypo } from "@expo/vector-icons";

const AddProductImage = ({ navigation }) => {
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.addPost);
  const [image, setImage] = useState([]);
  // set data when go back to edit
  useEffect(() => {
    if (postData?.files) {
      setImage(postData?.files);
    }
  }, [postData?.files]);
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
  const onClickNext = () => {
    dispatch(setFiles(image));
    navigation.navigate(screenName.postCategory);
  };
  const onClickRemove = (index1) => {
    const tempData = [...image];
    const data = tempData.filter((element, index) => index != index1);
    setImage(data);
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
                  <TouchableOpacity
                    onPress={() => {
                      onClickRemove(index);
                    }}
                    activeOpacity={0.6}
                    style={{
                      position: "absolute",
                      alignSelf: "flex-end",
                      marginRight: moderateScale(2),
                    }}
                  >
                    <Entypo
                      name="circle-with-cross"
                      size={scale(15)}
                      color="white"
                    />
                  </TouchableOpacity>
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
            onClickNext();
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
    // flexDirection: "column",
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
