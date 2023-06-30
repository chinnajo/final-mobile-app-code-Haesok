import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProgressBar = ({percentage, label}) => {
  return (
    <View>
      <View>
      <Text style={styles.label}>{`${label} : ${percentage}%`}</Text>
    
      
      </View>
      <View style={styles.container}>
        <View style={[styles.progressBar, {width: `${percentage}%`}]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: 15,
    backgroundColor: '#cccccc',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical:5
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'green',
    
  },
  label: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3f51b5',
    textAlign:'center'
  },
});

export default ProgressBar;
