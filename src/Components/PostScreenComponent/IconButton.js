import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import {
    Ionicons,
  } from "@expo/vector-icons";
  import { scale } from "react-native-size-matters";

const IconButton = ({name,color}) => {
  return (
    <Pressable>
      <Ionicons name={name} size={scale(23)} color={color} />
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({})