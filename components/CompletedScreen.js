import React, {useState, useRef, useEffect} from 'react';
import MyDataTable from './TableComponent';

import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import api from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompletedScreen = () => {
  const [tableData, setTableData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await api.get('/jobs/mobileapp/client/completed', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const status = await api.get('/status/mobileapp', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const statusdatas = status.data;
      const datas = response.data;
      const completedarr = [];
      const data = datas.map(job => {
        const foundStatus = statusdatas.find(
          stat => stat.id === Number(job.Status),
        );
        job.Status = foundStatus && foundStatus.name;
        return job;
      });

      for (const [e1, e2] of data.entries()) {
        const array = Object.keys(e2).map(key => {
          return e2[key];
        });
        completedarr.push([...array]);
      }
      setTableData(completedarr);
    } catch (err) {
      console.log('Error fetching data:', err);
    }
  };
  const headers = ['Job Id', 'Status', 'ETA Dt.', 'Supplier Name'];
  const data = tableData;
  return (
    <View style={{flex: 1, backgroundColor: '#fff', position: 'relative'}}>
          {/* <View style={{position: 'absolute', flex: 1}}>
          <Text
            style={{
              textAlign: 'center',
              width: 400,
              letterSpacing: 50,
              fontSize: 24,
             top:245,
              opacity: 0.3,
              color: '#4388ef',
              zIndex:1 ,
              // transform:[{rotate:'45deg'}]
            }}>
            HAESOK
          </Text>
        </View> */}
      <View
        style={{
          flex: 1,
          borderBottomColor: '#000',
          borderBottomWidth: 1,
          padding: 2,
          zIndex:-1
        }}>
       
        <ScrollView>
    
          <MyDataTable data={data} headers={headers}></MyDataTable>
        </ScrollView>
      </View>
      {/* <TouchableOpacity
          style={{
            width: 100,
            height: 35,
            backgroundColor: '#1363DF',
            borderRadius: 3,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            padding: 8,
            margin: 10,
          }}
          onPress={() => navigation.navigate('Login')}>
          <Text style={{fontSize: 15, color: '#fff'}}>Login Page</Text>
        </TouchableOpacity> */}
    </View>
  );
};

export default CompletedScreen;
