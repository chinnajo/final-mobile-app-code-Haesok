import * as React from 'react';
import {useState, useEffect} from 'react';
import RadioSelection from './RadioSelection';
import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../axios';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  BackHandler,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faFile} from '@fortawesome/free-solid-svg-icons/faFile';
library.add(faFile);
const JobDetailsScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [textHeight, setTextHeight] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [jobdatas, setjobdatas] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showToast, setShowToast] = useState(true);

  const handleOptionSelectRadio = (labelIndex, option) => {
    setSelectedOptions(prevSelectedOptions => {
      const updatedOptions = [...prevSelectedOptions];
      updatedOptions[labelIndex] = option;
      return updatedOptions;
    });
  };
  const handleBackButton = () => {
    navigation.navigate('Tab');
    setShowToast(false);

    // Clean up the flag when the component unmounts

    // Custom logic for handling the back button press
    // For example, you can navigate to another screen or show an alert

    return () => {
      setShowToast(true);
    };
  };

  // const  = ['ETA tracking'];
  // 'IGM tracking',
  // 'Delivery status',
  // 'Damage Status',
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
    // console.log(id, 'id');
    const token = await AsyncStorage.getItem('authToken');
    const response = await api.get(`/jobData/mobileapp/${Number(id)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    setjobdatas(data);
  }
  // console.log(jobdatas)

  const handleChangeText = newText => {
    setText(newText);
  };

  const handleContentSizeChange = event => {
    const {height} = event.nativeEvent.contentSize;
    setTextHeight(height);
  };

  const textAreaStyle = {
    ...styles.textArea,
    height: Math.max(35, textHeight),
    fontSize:12
  };

  const handleOptionSelect = options => {
    // const arr = [options]
    // console.log(arr, options)
    // setSelectedOption(aror);
  };

  const options = ['Option 1', 'Option 2', 'Option 3'];
  const condition = false;

  return (
    <View style={{flex: 1,fontSize:12}}>
      <ScrollView contentContainerStyle={{flexGrow: 1, padding: 16,fontSize:12}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            marginBottom: 20,
            color: '#000',
            fontWeight: 'bold',
            width: 400,
          }}>
          JOB DETAILS
        </Text>
        {/* <TouchableOpacity
            style={{alignSelf: 'flex-end', marginLeft: 60, marginBottom: 20}}
            onPress={() => navigation.navigate('Document')}>
            <FontAwesomeIcon
              size={30}
              icon={faFile}
              style={{color: '#205dc5'}}
            />
            <Text style={{fontSize: 8}}>Documents</Text>
          </TouchableOpacity> */}

        {jobdatas.map((data, index) => (
          <View key={index}>
            {data.type === 'text' && (
              <>
                <Text
                  style={{
                    textAlign: 'left',
                    fontWeight: 'bold',
                    marginLeft: 40,
                    fontSize: 12,
                  }}>
                  {data.code.toString()}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder=""
                  value={data.value.toString()}
                  editable={false}
                />
              </>
            )}

            {data.type === 'number' && <Text>{data.code.toString()}</Text> && (
              <>
                <Text
                  style={{
                    textAlign: 'left',
                    fontWeight: 'bold',
                    marginLeft: 40,
                    fontSize: 12,
                  }}>
                  {data.code.toString()}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder=""
                  value={data.value.toString()}
                  editable={false}
                />
              </>
            )}
            {data.type === 'textarea' && (
              <TextInput
                multiline
                value={text}
                onChangeText={handleChangeText}
                onContentSizeChange={handleContentSizeChange}
                style={textAreaStyle}
              />
            )}

            {data.type === 'date' && (
              <View>
                <>
                  <Text
                    style={{
                      textAlign: 'left',
                      fontWeight: 'bold',
                      marginLeft: 40,
                      fontSize: 12,
                    }}>
                    {data.code.toString()}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder=""
                    value={data.value.toString()}
                    editable={false}
                  />
                </>
              </View>
            )}

            {data.type === 'radio' && (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  marginVertical:10
                }}>
                {/* {data.map((label, index) => ( */}
                {/* <View key={index}> */}
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    textAlign: 'left',
                    width: 300,
                    marginBottom:10
                  }}>
                  {data.code.toString()}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  {(data.name?data.name : []).map(option => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => handleOptionSelectRadio(index, option)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: 10,
                      }}>
                      <Text>{option}</Text>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderWidth: 1,
                      

                          borderColor:
                            data.value === option ? '#1363DF' : 'gray',
                          borderRadius: 10,
                          marginLeft: 5,
                          backgroundColor:
                            data.value === option ? '#1363DF' : 'transparent',
                        }}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                {/* </View> */}
                {/* ))} */}
              </View>
            )}
            {data.type === 'singleSelect' && (
              <View
                style={{ width: '80%', alignSelf: 'center'}}>
                <Text
                  style={{textAlign: 'left', fontWeight: 'bold', fontSize: 12}}>
                  {data.code.toString()}
                </Text>

                <SingleSelect
                  options={data.value}
                  onSelect={handleOptionSelect}
                />
              </View>
            )}

            {data.type === 'multiSelect' && (
              <View
                style={{ width: '80%', alignSelf: 'center'}}>
                <Text
                  style={{textAlign: 'left', fontWeight: 'bold', fontSize: 12}}>
                  {data.code.toString()}
                </Text>

                <MultiSelect
                  options={data.value}
                  onSelect={handleOptionSelect}
                  style={textAreaStyle}
                  multiline
                  onChangeText={handleChangeText}
                  onContentSizeChange={handleContentSizeChange}
                />
              </View>
            )}
            {/* </View> */}
            {/* ))} */}
          </View>
        ))}
        <TouchableOpacity
          onPress={() => navigation.navigate('Document')}
          style={styles.button}>
          <Text style={{color: '#fff'}}>Documents</Text>
        </TouchableOpacity>
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
    width: 300,
    height: 40,
    marginVertical: 10,
    color: '#000',
    fontSize: 12,
  },
  textArea: {
    borderRadius: 10,
    borderColor: '#1363DF',
    alignSelf: 'center',
    backgroundColor: '#dde6f7',
    padding: 10,
    margin: 10,
    width: 300,
    height: 40,
    marginVertical: 10,
    fontSize: 12,
  },
  button: {
    width: 110,
    height: 35,
    backgroundColor: '#1363DF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 8,
    margin: 8,
    marginVertical: 10,
  },
});

export default JobDetailsScreen;
