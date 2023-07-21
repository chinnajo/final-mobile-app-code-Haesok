import React, { useState } from 'react';
import { View, TextInput, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';

const MultiSelect = ({ options, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [textHeight, setTextHeight] = useState(0);
  const handleOptionSelect = (option) => {
    const isSelected = selectedOptions.includes(option);
    let updatedOptions;

    if (isSelected) {
      updatedOptions = selectedOptions.filter((selectedOption) => selectedOption !== option);
    } else {
      updatedOptions = [...selectedOptions, option];
    }

    setSelectedOptions(updatedOptions);
  };

  const handleDonePress = () => {
    // setModalVisible(false);
    onSelect(selectedOptions);
  };


  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
      

        <TextInput
         value={options}
          // value={selectedOptions.join(', ')}
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
              style={[
                styles.optionContainer,
                selectedOptions.includes(option) && styles.selectedOptionContainer,
              ]}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={handleDonePress} style={styles.doneButton}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 10,
    borderColor: '#1363DF',
    alignSelf: 'center',
    backgroundColor: '#dde6f7',
    padding: 10,
    width:'100%',
    maxWidth: 400,
    marginVertical: 10,
    color:'#000',fontSize:12
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
    borderBottomColor: 'gray',
    width: '100%',
    alignItems: 'center',
  },
  selectedOptionContainer: {
    backgroundColor: 'lightblue',
  },
  doneButton: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  doneButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MultiSelect;
