import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  BackHandler,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../axios';
import TestDonutChart from './TestDonutChart';

import ProgressBar from './PercentageBar';

const HomeScreen = () => {
  const [pieChartData, setPieChartData] = useState([]);
  const [donutChartData, setDonutChartData] = useState([]);
  const [showToast, setShowToast] = useState(true);
  const [isPortrait, setIsPortrait] = useState(true);

  const handleBackButton = () => {
    if (showToast) {
      ToastAndroid.show(
        'Back button is disabled ,Try logout',
        ToastAndroid.SHORT,
      );
    }
    // Show a toast message or perform any desired action
    return true; // Return true to indicate that the back button press is handled
  };

  useEffect(() => {
    pieData();
    donutData();
    const updateOrientation = () => {
      const {width, height} = Dimensions.get('window');
      setIsPortrait(height > width);
    };

    Dimensions.addEventListener('change', updateOrientation);

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);
  function getRandomColor() {
    // Generate random RGB values
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Return the color string
    return `rgb(${blue},${green},${red}),
    )`;
  }

  const pieData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await api.get('/jobs/mobileapp/client', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resdata = response.data;
      console.log(resdata, 'dsf');

      const status = await api.get('/status/mobileapp', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const statusdatas = status.data;
      const datas = response.data;
      const data = datas.map(job => {
        const foundStatus = statusdatas.find(
          stat => stat.id === Number(job.Status),
        );
        job.Status = foundStatus && foundStatus.name;
        return job;
      });
      const jobstatus = data.map(th => th.Status);
      const value = [];
      jobstatus.forEach(x => {
        value[x] = (value[x] || 0) + 1;
      });
      const array = [];
      array.push({
        ...value,
      });
      // const total = data
      // for (const [e1, e2] of array.entries()) {
      //   // eslint-disable-next-line array-callback-return
      //   const array1 = Object.keys(e2).map((key,value) => {
      //     return key
      //   })
      //   console.log(array1, 'fddf')
      // }
      // const a = (Current.length/ total) * 100
      // const colors = Array.from({ length: 10 }, () => getRandomColor());
      const colors = [
        'rgb(0, 143, 251)',
        'rgb(0, 227, 150)',
        'rgb(254, 176, 25)',
        'rgb(255, 69, 96)',
        'rgb(119, 93, 208)',
        '#ff6699',
        '#66ff66',
        '#ffb366',
      ];
      const formattedData = Object.entries(array[0]).map(([key, value]) => ({
        label: key,
        value: value,
        color: '',
      }));
      // console.log(colors);
      for (let i = 0; i < formattedData.length; i++) {
        const total = data.length;
        const a = (formattedData[i].value / total) * 100;
        const aa = Math.floor(a);
        formattedData[i].color = colors[i];
        formattedData[i].value = aa;
        // console.log(total, a, 'sdfsfd');
      }
      setPieChartData(formattedData);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  // console.log(pieChartData);

  const donutData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await api.get('/jobs/mobileapp/client/jobcount', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      // console.log(data, 'data')
      setDonutChartData(data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // const datapie = [
  //   {label: 'Label 1', value: 40, color: '#ff6699'},
  //   {label: 'Label 2', value: 30, color: '#66ff66'},
  //   {label: 'Label 3', value: 20, color: '#ffb366'},
  //   {label: 'Label 4', value: 10, color: '#66c2ff'},
  // ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        position: 'relative',
      }}>
      <View style={{position: 'absolute', flex: 1}}>
        <Text
          style={{
            textAlign: 'center',
            width: 400,
            letterSpacing: 50,
            fontSize: 24,
            bottom: '100%',
            opacity: 0.3,
            color: '#4388ef',
          }}>
          {isPortrait ? '  HAESOK' : ' '}
        </Text>
      </View>
      <View>
        <ScrollView>
          <View>
            <View style={{marginVertical: 30}}>
              {donutChartData.map((data, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: '#fff',

                    marginTop: 5,
                  }}>
                  <ProgressBar percentage={data.value} label={data.label} />
                </View>
              ))}
            </View>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                marginVertical: 10,
              }}>
              Total Job Details
            </Text>
          </View>
          <View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                backgroundColor: '#fff',
              }}>
              <TestDonutChart data={pieChartData} />
            </View>

            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                marginVertical: 10,
              }}>
              Job Status Details
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
