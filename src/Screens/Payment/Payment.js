import React, { useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import * as WebBrowser from 'expo-web-browser';

const Payment = () => {
const [url,setUrl]=useState('')
useEffect(() => {
    setUrl('https://rzp.io/i/awk1YWFEw')
}, )

 

const makePayment = async () => {
  const razorpayUrl = 'https://rzp.io/i/928RLQB';

  try {
    let result = await WebBrowser.openBrowserAsync(url);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

// Call makePayment() somewhere in your app when you want to initiate the payment process


  return (
    <View>
      <Text>Amount: 100</Text>
      <Button title="Pay" onPress={makePayment} />
    </View>
  );
};

export default Payment;