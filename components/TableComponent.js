import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tableContainer: {
    borderBottomWidth: 0.5,

    borderColor: '#000',
  },
  head: {
    height: 60,
    
    backgroundColor: '#d0e1fb',
  },
  headText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
    paddingHorizontal:2
  },
  rowText: {
    textAlign: 'center',
    fontSize: 13,
    color: 'black',
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 3,
    marginHorizontal: 3,
    marginTop: 10,
  },
  rowPressable: {
    paddingVertical: 2,
    paddingHorizontal:2
  },
});

const MyDataTable = ({headers, data}) => {
  const navigation = useNavigation();
  const handleRowPress = rowData => {
    AsyncStorage.setItem('id', String(rowData[4]));
    navigation.navigate('JobDetails');
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <Table>
          <Row data={headers} style={styles.head} textStyle={styles.headText} />
        </Table>
      </View>

      <View>
        {data.map((rowData, index) => (
          <TouchableOpacity
            key={index}
            style={styles.rowPressable}
            onPress={() => handleRowPress(rowData)}>
            <View style={styles.tableContainer}>
              <Table>
                <Row data={rowData.slice(0, 4)} textStyle={styles.rowText} />
              </Table>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MyDataTable;
