import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Pressable,
  TextInput,
  StyleSheet,
  Alert,
  BackHandler,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCircleDown} from '@fortawesome/free-solid-svg-icons/faCircleDown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import downloadFile from './DownloadFile';

import api from '../axios';
library.add(faCircleDown);

const DocumentScreen = () => {
  const navigation = useNavigation();
  const [jobdatas, setjobdatas] = useState([]);
  const [showToast, setShowToast] = useState(true);

  async function filedownload(data) {
    const name = data.value;
    console.log(name, 'name');
    const token = await AsyncStorage.getItem('authToken');
    const response = await api.get(`/jobData/mobileapp/download/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // const downloadfile = await axios({
    //   url,
    //   method: 'GET',
    //   responseType: 'blob',
    // });
    const Downloaddata = response.data;
    downloadFile(Downloaddata.url, Downloaddata.name);
    // console.log(Downloaddata.url,Downloaddata.name, 'dsds');
  }
  const handleBackButton = () => {
    navigation.navigate('JobDetails');
    setShowToast(false);

    // Clean up the flag when the component unmounts

    // Custom logic for handling the back button press
    // For example, you can navigate to another screen or show an alert

    return () => {
      setShowToast(true);
    };
  };

  useEffect(() => {
    jobdata();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    // Clean up the back handler when the component unmounts
    return () => backHandler.remove();
  }, []);

  async function jobdata() {
    const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('authToken');
    const response = await api.get(`/jobData/mobileapp/file/${Number(id)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    setjobdatas(data);
  }
  console.log(jobdatas);

  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginVertical: 10,
          paddingVertical: 10,
          fontSize: 12,
        }}>
        <View style={{width: '84%', alignSelf: 'center', maxWidth: 400}}>
        <Text
          style={{
            textAlign: 'center',
            marginVertical: 20,
            fontWeight: 'bold',
            fontSize: 16,
            color:"#000"
          }}>
          Document Details
        </Text>
        {jobdatas.map((data, index) => (
          <View key={index} style={{marginVertical: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                marginLeft: 40,
                color:"#000"
              }}>
              {data.name.toString()}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={() => filedownload(data)}>
                <FontAwesomeIcon
                  size={25}
                  icon={faCircleDown}
                  style={{color: '#125bd9'}}
                />
              </TouchableOpacity>
              {data.type === 'file' && (
                <>
                  {/* <TouchableOpacity onPress={filedownload(data.value)}>
                <FontAwesomeIcon
                  size={25}
                  icon={faCircleDown}
                  style={{color: '#125bd9'}}
                />
              </TouchableOpacity> */}

                  <TextInput
                    style={styles.input}
                    placeholder=""
                    value={data.value}
                    editable={false}
                  />
                </>
              )}
            </View>
          </View>
        ))}
        <TouchableOpacity
          onPress={() => navigation.navigate('Tab')}
          style={{
            width: 110,
            height: 35,
            backgroundColor: '#1363DF',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            padding: 8,
            marginVertical: 20,
          }}>
          <Text style={{color: '#fff'}}>Home</Text>
        </TouchableOpacity>
       </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderColor: '#1363DF',
    alignSelf: 'center',
    backgroundColor: '#dde6f7',
    padding: 10,
    margin: 10,
    width: "90%",
    maxWidth:400,
    height: 40,
    marginVertical: 10,
    color: '#000',
  },
});

export default DocumentScreen;
