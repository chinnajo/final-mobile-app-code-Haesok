import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RadioSelection = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelect = (labelIndex, option) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = [...prevSelectedOptions];
      updatedOptions[labelIndex] = option;
      return updatedOptions;
    });
  };

  const labels = ['ETA tracking', 'IGM tracking', 'Delivery status', 'Damage Status'];

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {labels.map((label, index) => (
        <View key={index}>
          <Text style={{fontWeight:'bold'}}>{label}</Text>
          <View style={{ flexDirection: 'row' }}>
            {['Due', 'Ongoing', 'Done', 'n/a'].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => handleOptionSelect(index, option)}
                style={{ flexDirection: 'row', alignItems: 'center',marginHorizontal:10 }}
              >
                <Text>{option}</Text>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    marginVertical:20,
                    borderColor:
                      selectedOptions[index] === option ? '#1363DF' : 'gray',
                    borderRadius: 10,
                    marginLeft: 5,
                    backgroundColor:
                      selectedOptions[index] === option ? '#1363DF' : 'transparent',
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default RadioSelection;
