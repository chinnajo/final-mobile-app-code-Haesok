import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop:-10,
    //  borderWidth:1,
    //  borderColor: '#849eae',
  },
  tableContainer: {
    borderBottomWidth: 1,

    // marginTop: 10,
    borderColor: '#849eae',
    borderRadius: 5,
    // paddingVertical:10,
    // paddingHorizontal:5,
    height: 60,
  },
  head: {
    height: 58,
    backgroundColor: '#fff',
    // borderWidth: 2,
    // borderColor: '#9DB2BF',

    backgroundColor: '#e8f0fd',
    borderRadius: 4,
    marginBottom: 10,
    // paddingBottom:5
    // padding:5
  },
  headText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
  },
  rowText: {
    textAlign: 'center',
    fontSize: 13,
    color: 'black',
    // borderWidth:1,
    // borderColor:'#9DB2BF',
    paddingVertical: 10,
    paddingHorizontal: 2,
    marginHorizontal: 2,
  },
  rowPressable: {
    paddingTop: 10,
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
          <Row
            data={headers}
            style={styles.head}
            textStyle={styles.headText}
          />
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
