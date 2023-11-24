import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
import CustomeAlert from "../../Components/CustomeAlert";
import { useDispatch, useSelector } from "react-redux";
import { setItemDetail } from "../../store/addAdContentSlices/AddPostData";
import images from "../../Constants/images";
import colors from "../../Constants/colors";
import CustomeAlertModal from "../../Components/CustomeAlertModal";

const ItemDetail = ({ navigation }) => {
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.addPost);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [classifiedTitle, setClassifiedTitle] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState(null);
  const [brand, setBrand] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [isSpecificationValid, setIsSpecificationValid] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: null,
    msg: null,
    type: null,
  });
  const [specifications, setSpecifications] = useState([]);
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
  // set data when go back to edit
  useEffect(() => {
    if (postData?.itemDetail) {
      setClassifiedTitle(postData?.itemDetail?.title);
      setCondition(postData?.itemDetail?.condition);
      setPrice(postData?.itemDetail?.price);
      setBrand(postData?.itemDetail?.brand);
      setShortDesc(postData?.itemDetail?.shorDescription);
      setDesc(postData?.itemDetail?.description);
    }
  }, [postData?.itemDetail]);
  const checkSpecification = () => {
    const isValid = specifications.every((spec) => {
      return (
        spec.label !== null &&
        spec.label !== undefined &&
        spec.value !== null &&
        spec.value !== undefined
      );
    });
    setIsSpecificationValid(isValid);
    return isValid;
  };
  const onClickNext = () => {
    if (
      classifiedTitle != "" &&
      condition != "" &&
      price != null &&
      brand != "" &&
      shortDesc != "" &&
      desc != ""
    ) {
      const data = {
        title: classifiedTitle,
        shorDescription: shortDesc,
        description: desc,
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        promoterId: 0,
        condition: condition,
        price: price,
        brand: brand,
        specifications: JSON.stringify(specifications),
        // specifications:
        //   checkSpecification() == true ? JSON.stringify(specifications) : null,
      };
      dispatch(setItemDetail(data));
      navigation.navigate(screenName.productPreview);
    } else {
      setShowAlert({
        show: true,
        title: "Validation",
        msg: "Fill Values",
        type: "warning",
      });
    }
  };
  const addSpecificationTxtBox = () => {
    setSpecifications([...specifications, { label: null, value: null }]);
  };
  const removeSpecificationTxtBox = (index) => {
    const tempData = [...specifications];
    const data = tempData.filter((element, index1) => index != index1);
    setSpecifications(data);
  };
  const addSpecificationData = (index, field, txt) => {
    const tempData = [...specifications];
    const a = {
      ...tempData[index],
      [field]: txt,
    };
    tempData[index] = a;
    setSpecifications(tempData);
  };
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
              value={classifiedTitle}
              labelTxt={"Classified Title"}
              placeholder={"Enter title"}
              onChange={(txt) => {
                setClassifiedTitle(txt);
              }}
            />
            <TextBoxWithLabel
              value={condition}
              labelTxt={"Condition"}
              placeholder={"Enter Condition"}
              onChange={(txt) => {
                setCondition(txt);
              }}
            />
            <TextBoxWithLabel
              value={price}
              labelTxt={"Price"}
              placeholder={"Enter Price"}
              onChange={(txt) => {
                setPrice(txt);
              }}
            />
            <TextBoxWithLabel
              value={brand}
              labelTxt={"Brand"}
              placeholder={"Enter Brand"}
              onChange={(txt) => {
                setBrand(txt);
              }}
            />

            <TextBoxWithLabel
              value={shortDesc}
              labelTxt={"Short Description"}
              placeholder={"Enter descripition in one line"}
              onChange={(txt) => {
                setShortDesc(txt);
              }}
            />
            <TextBoxWithLabel
              value={desc}
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
              onChange={(txt) => {
                setDesc(txt);
              }}
            />
            <View style={commonStyle.row}>
              <Text style={styles.labelStyle}>Specifications</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  addSpecificationTxtBox();
                }}
                style={styles.addBtnCircle}
              >
                <Image source={images.plusIcon} style={styles.addBtnImg} />
              </TouchableOpacity>
            </View>
            {specifications?.map((item, index) => {
              return (
                <View
                  style={[
                    {
                      gap: scale(8),
                    },
                    commonStyle.row,
                  ]}
                >
                  <TextBoxWithLabel
                    value={item.label}
                    placeholder={"Enter Label"}
                    onChange={(txt) => {
                      addSpecificationData(index, "label", txt);
                    }}
                  />
                  <TextBoxWithLabel
                    value={item.value}
                    placeholder={"Enter value"}
                    onChange={(txt) => {
                      addSpecificationData(index, "value", txt);
                    }}
                  />
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      removeSpecificationTxtBox(index);
                    }}
                    style={[
                      styles.addBtnCircle,
                      {
                        backgroundColor: colors.themeColor,
                        marginBottom: verticalScale(15),
                        marginTop: verticalScale(10),
                      },
                    ]}
                  >
                    <View style={styles.btnMinus}></View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </KeyboardAvoidingView>
        </ScrollView>
        {isKeyboardOpen ? null : (
          <CustomeButton
            title={"Next"}
            onClick={() => {
              onClickNext();
            }}
            style={{
              paddingVertical: moderateScale(13),
              width: "100%",
              alignSelf: "center",
            }}
          />
        )}
      </View>
      <CustomeAlertModal
        isVisible={showAlert.show}
        title={showAlert.title}
        msg={showAlert.msg}
        type={showAlert.type}
        onClickBtn={() => {
          setShowAlert({ ...showAlert, show: false });
        }}
      />
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
  addBtnCircle: {
    borderRadius: 100,
    width: scale(20),
    height: scale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnImg: {
    width: "100%",
    height: "100%",
    tintColor: colors.themeColor,
  },
  btnMinus: {
    borderWidth: 1,
    width: scale(9),
    backgroundColor: "white",
    borderColor: "white",
  },
  labelStyle: {
    fontFamily: "Montserrat-Bold",
    fontSize: scale(11),
  },
});
