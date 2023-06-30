import React, { useState } from 'react';
import { View, TextInput, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SingleSelect = ({ options, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option) => {
    // setSelectedOption(option);
    setModalVisible(false);
    // onSelect(option);
 
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(false)}>
        <TextInput
          value={options}
          placeholder=""
          editable={false}
          style={styles.textInput}
        />
      </TouchableOpacity>
      {/* <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleOptionSelect(option)}
              style={styles.optionContainer}
            >
              <Text>{}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderRadius: 10,
    borderColor: '#1363DF',
    alignSelf: 'center',
    backgroundColor: '#dde6f7',
    padding: 10,
    // margin: 10,
    width: 300,
    marginVertical: 10,
    color:'#000',
    fontSize:12
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  optionContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    width: '100%',
    alignItems: 'center',
  },
});

export default SingleSelect;
