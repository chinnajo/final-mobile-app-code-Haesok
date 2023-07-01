import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';

const CustomHeaderTitle = ({color, fontsize}) => {
  const [headerTitle, setHeaderTitle] = useState('');

  const getClientName = async () => {
    try {
      const storedData = await AsyncStorage.getItem('client');
      if (storedData) {
        setHeaderTitle(storedData);
      }
    } catch (error) {
      console.log('Error retrieving data from AsyncStorage:', error);
    }
  };
  useEffect(() => {
    getClientName();
  }, []);

  return (
    <Text
      style={{
        color: color,
        fontSize: fontsize,
        fontWeight: 'bold',
      }}>{`Hello ${headerTitle} `}</Text>
  );
};
// const styles = StyleSheet.create({
//   text: {
//     fontSize: 20,
//   },
// });
export default CustomHeaderTitle;
