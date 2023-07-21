import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faFilePen} from '@fortawesome/free-solid-svg-icons/faFilePen';
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import {faFingerprint} from '@fortawesome/free-solid-svg-icons/faFingerprint'; // Import fingerprint icon
import {useNavigation} from '@react-navigation/native';
import TouchID from 'react-native-touch-id'; // Import TouchID module
import api from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
library.add(faEye, faEyeSlash, faFilePen, faFingerprint);

const LoginFinger = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [fingerprintSupported, setFingerprintSupported] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    checkFingerprintSupport();
  }, []);

  const checkFingerprintSupport = async () => {
    try {
      const isSupported = await TouchID.isSupported();
      setFingerprintSupported(isSupported);

      if (isSupported) {
        handleFingerprintAuth(); // Attempt fingerprint login if supported
      }
    } catch (error) {
      console.log('Fingerprint not supported', error);
    }
  };

  const handleFingerprintAuth = async () => {
    try {
      const authenticated = await TouchID.authenticate(
        'Authenticate with fingerprint',
      );
      if (authenticated) {
        // Fingerprint authentication successful, log in the user
        handleLogin();
      }
    } catch (error) {
      console.log('Fingerprint authentication failed', error);
    }
  };

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const clear = () => {
    // setEmail('');
    setPassword('');
  };

  const handleInputChange = text => {
    setInputValue(text);
  };

  const handleSubmit = async () => {
    const body = {
      email: inputValue,
    };
    if (body.email !== '') {
      const response = await api.put('/login/mobileapp/resetPassword', body);
      ToastAndroid.show(
        'Password has been sent to your Email!',
        ToastAndroid.SHORT,
      );
      toggleModal();
    } else {
      ToastAndroid.show('This field cannot be empty !', ToastAndroid.SHORT);
    }
  };

  const handleLogin = async () => {
    const body = {
      email: email,
      password: password,
    };
    await api
      .post('/login/mobileapp/client', body)
      .then(response => {
        const data = response.data;
        AsyncStorage.setItem('authToken', data.token);
        AsyncStorage.setItem('email', data.email);
        const client = data.client;
        return AsyncStorage.getItem('authToken')
          .then(token =>
            api.get(`/clients/mobileapp/${client}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          )
          .then(clientresponse => {
            const clientname = clientresponse.data.name;
            AsyncStorage.setItem('client', clientname);
            console.log('login successful');
            navigation.navigate('Tab');
          })
          .catch(error => {
            ToastAndroid.show('Server error', ToastAndroid.SHORT);
            console.log(error);
          });
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          ToastAndroid.show('Incorrect  ID  or  Password', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Network error', ToastAndroid.SHORT);
        }
        console.log(error);
      });

    clear();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.centeredView}>
          <Image
            source={require('../assets/logo.png')}
            style={{
              width: 100,
              height: 100,
              marginBottom: 50,
              alignSelf: 'center',
            }}
          />

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="#000"
              onChangeText={text => setEmail(text)}
              value={email}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="#000"
              secureTextEntry={passwordVisibility}
              onChangeText={text => setPassword(text)}
              value={password}
            />
            <View style={{position: 'absolute', right: 10}}>
              <TouchableOpacity onPress={handlePasswordVisibility}>
                <FontAwesomeIcon
                  icon={passwordVisibility ? faEyeSlash : faEye}
                  style={{color: '#1363DF'}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>

          {fingerprintSupported && (
            <TouchableOpacity
              style={styles.fingerprintButton}
              onPress={handleFingerprintAuth}>
              <FontAwesomeIcon
                icon={faFingerprint}
                style={styles.fingerprintIcon}
                size={20}
              />
              <Text style={styles.fingerprintText}>
                Log in with Fingerprint
              </Text>
            </TouchableOpacity>
          )}

          <View
            style={{
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
              
            }}>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={{color: '#000'}}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Modal
              visible={isModalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={toggleModal}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                }}>
                <View
                  style={{
                    height: 250,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      margin: 10,
                      padding: 10,
                      fontWeight: 600,
                      color: '#000',
                    }}>
                    Forgot Password
                  </Text>
                  <TextInput
                    style={{
                      borderRadius: 10,
                      borderColor: '#1363DF',

                      backgroundColor: '#dde6f7',
                      padding: 10,
                      margin: 10,
                      width: 300,
                      marginBottom: 10,
                    }}
                    onChangeText={handleInputChange}
                    placeholder="Enter Your Email Here"
                    placeholderTextColor="#000"
                    value={inputValue}
                  />
                  <Text style={{fontSize: 10, marginBottom: 20, color: '#000'}}>
                    * Please make sure you have entered a valid email address
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={{
                        width: 110,
                        height: 35,
                        backgroundColor: '#1363DF',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        padding: 8,
                        margin: 8,
                        marginBottom: 20,
                      }}>
                      <Text style={{color: '#fff'}}>Submit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={toggleModal}
                      style={{
                        width: 110,
                        height: 35,
                        backgroundColor: '#1363DF',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        padding: 8,
                        margin: 8,
                        marginBottom: 20,
                      }}>
                      <Text style={{color: '#fff'}}>Close</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={{color: '#000'}}>
                    A new password will be sent to your email !
                  </Text>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  centeredView: {
    backgroundColor: '#fff', // Background color for the centered view
    width: '85%', // Set a specific width for the centered View (you can adjust this value)
    height: '90%', // Set a specific height for the centered View (you can adjust this value)
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginVertical: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#dde6f7',
    borderRadius: 15,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    position: 'relative',
    minWidth: 300,
    maxWidth: 500,
  },
  inputText: {
    height: 50,
    color: '#000',
  },
  fingerprintIcon: {
    alignSelf: 'center',
    marginHorizontal:10
  },
  fingerprintText: {
    alignSelf: 'center',
    color:'#000'
  },
  fingerprintButton: {
    alignSelf: 'center',
    marginVertical:30,
    flexDirection:'row'
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#1363DF',
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
    minWidth: 300,
    maxWidth: 500,
  },
  loginText: {
    color: 'white',
  },
});

export default LoginFinger;
