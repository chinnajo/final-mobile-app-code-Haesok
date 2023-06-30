import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';

const CustomEmailTitle = ({color, fontsize}) => {
  const [headerEmail, setEmailTitle] = useState('');

  const getClientEmail = async () => {
    try {
      const storedData = await AsyncStorage.getItem('email');
      if (storedData) {
        setEmailTitle(storedData);
      }
    } catch (error) {
      console.log('Error retrieving data from AsyncStorage:', error);
    }
  };
  useEffect(() => {
    getClientEmail();
  }, []);

  return (
    <Text
      style={{
        color: color,
        fontSize: fontsize,
        fontWeight: 'bold',
        marginVertical:10,
       
      }}>{` ${headerEmail} `}</Text>
  );
};
// const styles = StyleSheet.create({
//   text: {
//     fontSize: 20,
//   },
// });
export default CustomEmailTitle;
