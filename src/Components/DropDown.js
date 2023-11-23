import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import images from "../Constants/images";

const DropDown = ({
  dropDownInputStyle = {},
  dropDownContainer = {},
  containerRow = {},
  isSearch,
  searchTxtBox,
  dropDownInputTxt = {},
  dropDownContainerTxt = {},
  selectedColor,
  arrowSize,
  dropDownData,
  onChange = () => {},
  onChangeObject = () => {},
  isLeftIcon,
  leftIconUrl,
  leftIconStyle,
  disabled,
  selectedTxtColor,
  onChangeId = () => {},
  placeholder,
  valueField,
  displayField,
}) => {
  const [selectedData, setSelectedData] = useState(placeholder);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(dropDownData);
  const searchRef = useRef();
  const onSearch = (text) => {
    if (text !== "") {
      let tempData = data.filter((item) => {
        return (
          item[displayField].toLowerCase().indexOf(text.toLowerCase()) > -1
        );
      });
      setData(tempData);
    } else {
      setData(dropDownData);
    }
  };
  useEffect(() => {
    setData(dropDownData);
  }, []);

  useEffect(() => {
    setSelectedData(placeholder);
  }, []);

  return (
    <View>
      <TouchableOpacity
        disabled={disabled}
        // style={styles.dropDownSelector}
        style={dropDownInputStyle}
        onPress={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isLeftIcon ? (
          <Image source={leftIconUrl} style={leftIconStyle} />
        ) : null}
        <Text style={[dropDownInputTxt]}>{selectedData}</Text>
        {isOpen ? (
          <Image
            source={images.downArrow}
            style={[arrowSize, { transform: [{ rotate: "180deg" }] }]}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={images.downArrow}
            style={[arrowSize]}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
      {isOpen && (
        <View style={dropDownContainer}>
          {isSearch && (
            <TextInput
              placeholder="Search..."
              style={searchTxtBox}
              ref={searchRef}
              onChangeText={(text) => {
                onSearch(text);
              }}
            />
          )}
          <FlatList
            data={data}
            nestedScrollEnabled={true}
            keyExtractor={(item) => {
              item.id;
            }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    containerRow,
                    {
                      backgroundColor:
                        selectedData === item[displayField] && selectedColor,
                    },
                  ]}
                  onPress={() => {
                    setSelectedData(item[displayField]),
                      onSearch(""),
                      isSearch && searchRef.current.clear();
                    onChange && onChange(item[displayField]);
                    onChangeObject && onChangeObject(item);
                    onChangeId && onChangeId(item[valueField]);
                    setIsOpen(false);
                  }}
                >
                  <Text
                    style={[
                      dropDownContainerTxt,
                      {
                        color:
                          selectedData === item[displayField]
                            ? selectedTxtColor
                            : null,
                      },
                    ]}
                  >
                    {item[displayField]}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default DropDown;
