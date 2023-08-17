import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Modal,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCircleDown} from '@fortawesome/free-solid-svg-icons/faCircleDown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import downloadFile from './DownloadFile';
import Pdf from 'react-native-pdf'; // Import the Pdf component
import api from '../axios';

library.add(faCircleDown);

const DocumentScreen = () => {
  const navigation = useNavigation();
  const [jobdatas, setJobdatas] = useState([]);
  const [pdfUrl, setPdfUrl] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleImageModal = () => {
    setIsImageModalVisible(!isImageModalVisible);
  };

  function isImageFile(fileName) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif']; // Add more extensions if needed
    const extension = fileName.substr(fileName.lastIndexOf('.')).toLowerCase();
    return imageExtensions.includes(extension);
  }

  async function fileDownload(data) {
    const emptypdfurl = '';
    setPdfUrl(emptypdfurl);
    const name = data.value;
    const token = await AsyncStorage.getItem('authToken');
    const response = await api.get(`/jobData/mobileapp/download/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const downloadData = response.data;
    setPdfUrl(downloadData.url);
    downloadFile(downloadData.url, downloadData.name);
    if (data.type === 'file' && isImageFile(data.value)) {
      setImageUrl(downloadData.url);
      toggleImageModal();
    } else if (data.value !== '') {
      toggleModal();
    }
  }

  useEffect(() => {
    jobData();
  }, []);

  async function jobData() {
    const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('authToken');
    const response = await api.get(`/jobData/mobileapp/file/${Number(id)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    setJobdatas(data);
  }

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
              color: '#000',
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
                  color: '#000',
                }}>
                {data.name.toString()}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={() => fileDownload(data)}>
                  <FontAwesomeIcon
                    size={25}
                    icon={faCircleDown}
                    style={{color: '#125bd9'}}
                  />
                </TouchableOpacity>
                {data.type === 'file' && (
                  <TextInput
                    style={styles.input}
                    placeholder=""
                    value={data.value}
                    editable={false}
                  />
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
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalVisible}
          onRequestClose={toggleModal}>
          <View style={{flex: 1}}>
            <Pdf
              trustAllCerts={false}
              source={{
                uri: pdfUrl,
                cache: true,
              }}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={error => {
                console.log(error);
              }}
              style={styles.pdf}
            />
            <TouchableOpacity onPress={toggleModal}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={isImageModalVisible}
          onRequestClose={toggleImageModal}>
          <View style={{flex: 1}}>
            <Image source={{uri: imageUrl}} style={styles.image} />
            <TouchableOpacity onPress={toggleImageModal}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
    width: '90%',
    maxWidth: 400,
    height: 40,
    marginVertical: 10,
    color: '#000',
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
});

export default DocumentScreen;
