import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import commonStyle from "../../Constants/commonStyle";
import Header from "../../Components/Header";
import CustomeHeader from "../../Components/CustomeHeader";
import { Divider } from "react-native-paper";
import screenName from "../../Constants/screenName";
import { verticalScale } from "react-native-size-matters";
import images from "../../Constants/images";
import FeedCard from "../../Components/ProductComponent/FeedCard";

const BookmarkScreen = ({ navigation }) => {
  const [feedData, setFeedData] = useState([
    {
      id: 1,
      userName: "Elenaro",
      location: "63991 Eligin St.Canada 10229",
      title: "Exclusive Mens Shoe",
      condition: "Used-Excellent",
      brand: "Puma",
      size: "M",
      color: "Green",
      price: "348",
      isSaved: true,
      shortDesc:
        "Discover the perfect pair of shoes to elevate your style and comfort. Our collection offers a wide range of fashionable and functional footwear for every occasion.",
      longDescription:
        "Discover the perfect pair of shoes to elevate your style and comfort. Our collection offers a wide range of fashionable and functional footwear for every occasion. From sleek sneakers to elegant heels and rugged boots, we have something for everyone. Step into the world of quality and style with our shoes that not only look great but also feel great. Explore our selection today and find the perfect fit for your feet.",
      assets: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRABH5we5erv84MFP1C4sPZjBLZPR9G4PdSSQ3qUiETN_XDIFrA",
      ],
    },
    {
      id: 2,
      userName: "John Doe",
      location:
        "56782 Eligin St.London 10229 jshdc jhfdh fhdhjd shsfj gjhfgj hgfjgh fjghfj",
      title: "Exclusive Mens Shirts",
      condition: "Excellent",
      brand: "Levi's",
      size: "xxl",
      color: "Light Green",
      price: "499",
      isSaved: false,
      shortDesc:
        "Elevate your wardrobe with our collection of men's shirts. From classic dress shirts for formal occasions to casual and trendy designs for everyday wear, we offer a wide range of styles and colors to suit your unique taste.",
      longDescription:
        "Elevate your wardrobe with our collection of men's shirts. From classic dress shirts for formal occasions to casual and trendy designs for everyday wear, we offer a wide range of styles and colors to suit your unique taste. Our shirts are crafted from high-quality materials for a comfortable fit and lasting durability. Whether you're looking for a crisp white shirt for the office or a stylish patterned shirt for a night out, we have you covered. Explore our selection today and upgrade your fashion game with our versatile men's shirts.",
      assets: [images.introImg1, images.introImg2],
    },
    {
      id: 3,
      userName: "John Doe",
      location: "56782 Eligin St.London 10229",
      title: "Redmi Note 12 5G",
      isSaved: true,
      shortDesc:
        "Redmi Note 12 5G is future-ready with the new generation Dual 5G support.",
      longDescription:
        "The 16.94cm (6.67) 120Hz Super AMOLED display delivers vivid picture quality and sharp details. With this segment* leading display watch every movie scene come to life with perfect blacks and vibrant colour re-production.",
      assets: [
        "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1672876197.29825462!600x600!85.jpg",
        "https://i02.appmifile.com/mi-com-product/fly-birds/pair/pc/pc-pair.png?f=webp",
      ],
    },
    {
      id: 4,
      userName: "John Doe",
      location: "56782 Eligin St.London 10229",
      isSaved: true,
      title:
        "242 Ltr, 3 Star, Smart Inverter Compressor, DoorCooling+™, Smart Diagnosis™, Shiny Steel Finish, Frost-Free Double Door Refrigerator",
      shortDesc:
        "The new range of LG Frost Free Refrigerators with cutting edge Smart Inverter Compressor technology that takes energy efficiency to another level and helps you save more. Not only this, it comes with 10 year warranty and provides super silent operation.",
      longDescription:
        "LG Door Cooling+™ makes inside temperature more even and cools the refrigerator 35% faster than the conventional cooling system. This reduces the temperature gap between the inner part and the door side of the compartment; thus letting the food remain fresh for long.",
      assets: [
        "https://www.lg.com/in/images/refrigerators/md07524765/gallery/GL-I292RPZX-Refrigerators-Front-View-D-01.jpg",
        "https://www.lg.com/in/images/refrigerators/md07524765/gallery/GL-I292RPZX-Refrigerators-Front-Open-Food-D-02.jpg",
        "https://www.lg.com/in/images/refrigerators/md07524765/gallery/GL-I292RPZX-Refrigerators-Detailed-View-1-D-03.jpg",
        "https://www.lg.com/in/images/refrigerators/md07524765/gallery/GL-I292RPZX-Refrigerators-Detailed-View-2-D-04.jpg",
        "https://www.lg.com/in/images/refrigerators/md07524765/gallery/GL-I292RPZX-Refrigerators-Front-View-Top-Door-Open-D-05.jpg",
        "https://www.lg.com/in/images/refrigerators/md07524765/gallery/GL-I292RPZX-Refrigerators-Front-View-Bottom-Door-Open-D-06.jpg",
      ],
    },
  ]);
  const onClickSaved = (index) => {
    const newData = [...feedData];
    const obj = {
      ...newData[index],
      isSaved: !newData[index].isSaved,
    };
    newData[index] = obj;
    setFeedData(newData);
  };
  return (
    <SafeAreaView style={commonStyle.container}>
      <CustomeHeader isBackBtn={true} title={"Saved Items"} />
      <FlatList
        data={feedData}
        keyExtractor={(item) => {
          item.id.toString();
        }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={
          <Divider style={{ marginBottom: verticalScale(8) }} />
        }
        renderItem={({ item, index }) => {
          return (
            <FeedCard
              itemData={item}
              isMoreBtn={true}
              isOfferBtn={true}
              onClickBookmarkBtn={() => {
                onClickSaved(index);
              }}
              onClickMsgBtn={() => {
                navigation.navigate(screenName.messagesHome);
              }}
              onClickMoreBtn={() => {
                navigation.navigate(screenName.productDetail, { data: item });
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({});
