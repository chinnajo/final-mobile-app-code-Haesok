import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons/faCircleUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeaderTitle from './HeaderTitle';
import CustomEmailTitle from './EmailTitle';
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons/faEyeSlash';

import api from '../axios';

library.add(faCircleUser, faEye, faEyeSlash);

const HeaderRightIcon = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();

  const handleUpdatePassword = () => {
    setModalVisible(false);
    setPasswordModalVisible(true);
  };

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleNewPasswordVisibility = () => {
    setNewPasswordVisibility(!newPasswordVisibility);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('client');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('password');
    navigation.navigate('Login');
  };

  const handleSubmit = async () => {
    const email = await AsyncStorage.getItem('email');
    const body = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    if (body.oldPassword !== '' && body.newPassword !== '') {
      const token = await AsyncStorage.getItem('authToken');
      const updatepassword = await api.put('/login/updatePassword', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Alert.alert('Password updated Successfully!');
      ToastAndroid.show('Password updated Successfully!', ToastAndroid.SHORT);
      setPasswordModalVisible(false);
    } else {
      ToastAndroid.show('These fields cannot be empty!', ToastAndroid.SHORT);
    }

    // Implement your password update logic here
    // You can access the new password and confirm password using the state variables newPassword and confirmPassword
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <FontAwesomeIcon
          size={30}
          icon={faCircleUser}
          style={{color: '#fff'}}
        />
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* <CustomHeaderTitle fontsize={15} color={'grey'}></CustomHeaderTitle> */}
            <CustomEmailTitle fontsize={15}></CustomEmailTitle>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleUpdatePassword}>
              <Text style={styles.modalButtonText}>Update Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
              <Text style={styles.modalButtonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1363DF',
                borderRadius: 5,
                height: 40,
                width: 200,
              }}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={passwordModalVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={{margin: 10, padding: 10, fontWeight: 600, color: '#000'}}>
              Update Password
            </Text>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Old password"
                placeholderTextColor="#000"
                secureTextEntry={passwordVisibility}
                value={oldPassword}
                onChangeText={text => setOldPassword(text)}
              />
              <View style={{position: 'absolute', right: 10, top: 10}}>
                <TouchableOpacity onPress={handlePasswordVisibility}>
                  <FontAwesomeIcon
                    icon={passwordVisibility ? faEyeSlash : faEye}
                    size={20}
                    style={{color: '#1363DF'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor="#000"
                secureTextEntry={newPasswordVisibility}
                value={newPassword}
                onChangeText={text => setNewPassword(text)}
              />
              <View style={{position: 'absolute', right: 10, top: 10}}>
                <TouchableOpacity onPress={handleNewPasswordVisibility}>
                  <FontAwesomeIcon
                    icon={newPasswordVisibility ? faEyeSlash : faEye}
                    size={20}
                    style={{color: '#1363DF'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#1363DF',
                  borderRadius: 10,
                  height: 30,
                  width: 80,
                }}
                onPress={handleSubmit}>
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#1363DF',
                  borderRadius: 10,
                  height: 30,
                  width: 80,
                }}
                onPress={() => setPasswordModalVisible(false)}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    height: 250,
    width: 300,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalButton: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1363DF',
    borderRadius: 5,
    height: 40,
    width: 200,
  },
  modalButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  input: {
    padding: 7,
    width: 250,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#dde6f7',
    color: '#000',
    position: 'relative',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-around',
    paddingTop: 10,
  },
});

export default HeaderRightIcon;
