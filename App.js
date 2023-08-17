import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CustomHeaderTitle from './components/HeaderTitle';
import HeaderRightIcon from './components/HeaderRightIcon';
import LoginFinger from './components/LoginFinger';
import JobsTabScreen from './components/JobsTabScreen';
import JobDetailsScreen from './components/JobDetailsScreen';
import DocumentScreen from './components/DocumentScreen';

library.add(faArrowLeft);
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({navigation, route}) => ({
          headerTitle: () => <CustomHeaderTitle fontsize={20} color={'#fff'} />,
          headerLeft: () => (
            <Image
              source={require('./assets/logo.png')}
              style={{
                width: 40,
                height: 40,
                marginRight: 10,
              }}
            />
          ),
          headerRight: () => {
            if (route.name === 'JobDetails' || route.name === 'Document') {
              return (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{marginHorizontal: 20}}
                    onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon
                      color="#fff"
                      icon={faArrowLeft}
                      size={25}
                    />
                  </TouchableOpacity>
                  <HeaderRightIcon />
                </View>
              );
            }
            return <HeaderRightIcon />;
          },
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: '#1363DF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        })}>
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginFinger} />
        </Stack.Group>

        <Stack.Screen
          name="Tab"
          component={JobsTabScreen}
          options={{headerBackVisible: false}}
        />

        <Stack.Screen
          name="JobDetails"
          component={JobDetailsScreen}
          options={{headerBackVisible: false}}
        />

        <Stack.Screen
          name="Document"
          component={DocumentScreen}
          options={{headerBackVisible: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
