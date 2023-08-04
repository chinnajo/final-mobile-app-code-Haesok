
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, TouchableOpacity, ScrollView,TextInput} from 'react-native';
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
    paddingHorizontal: 2,
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
    paddingHorizontal: 2,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius:5,
    marginHorizontal:2
  },
});

const MyDataTable = ({headers, data}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleRowPress = rowData => {
    AsyncStorage.setItem('id', String(rowData[4]));
    navigation.navigate('JobDetails');
  };

  const filteredData = data.filter(rowData => {
    const searchString = searchQuery.toLowerCase();
    const rowDataString = rowData.join(' ').toLowerCase();
    return rowDataString.includes(searchString);
  });

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Table Header */}
      <View style={styles.tableContainer}>
        <Table>
          <Row data={headers} style={styles.head} textStyle={styles.headText} />
        </Table>
      </View>

      <View>
        {/* Table Rows */}
        {filteredData.map((rowData, index) => (
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
