import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AuditScreen from './AuditScreen';
import CompletedScreen from './CompletedScreen';
import CurrentScreen from './CurrentScreen';
import HomeScreen from './HomeScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faFilePen} from '@fortawesome/free-solid-svg-icons/faFilePen';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faHouse} from '@fortawesome/free-solid-svg-icons/faHouse';
import {faArrowsSpin} from '@fortawesome/free-solid-svg-icons/faArrowsSpin';
library.add(faFilePen, faCheck, faArrowsSpin, faHouse);

const JobsTab = createBottomTabNavigator();

export default function TabScreen() {
  return (
    <JobsTab.Navigator
      screenOptions={{
      
        headerTitleAlign: 'left',
        headerTitleStyle: {fontSize: 16},
        headerStyle: {
          height: 50,
        
          //backgroundColor:'#efefef'
        
        },
      }}>
      <JobsTab.Screen
        name="Haesok"
        component={HomeScreen}
        options={{
          headerShown:false,
          tabBarLabel: 'Haesok',
          tabBarIcon: () => (
            <FontAwesomeIcon
              size={20}
              icon={faHouse}
              style={{color: '#115cdf'}}
            />
          ),
        }}
      />
      <JobsTab.Screen
        name="Current Jobs"
        component={CurrentScreen}
        options={{
        
          headerLeft: () => (
            
            <FontAwesomeIcon
              size={20}
              icon={faArrowsSpin}
              style={{color: '#125bd9', marginLeft: 10}}
            />
          ),
          tabBarIcon: () => (
            <FontAwesomeIcon
              size={20}
              icon={faArrowsSpin}
              style={{color: '#125bd9'}}
            />
          ),
        }}
      />
      <JobsTab.Screen
        name="Audit"
        component={AuditScreen}
        options={{
          headerLeft: () => (
            <FontAwesomeIcon
              size={20}
              icon={faFilePen}
              style={{color: '#115cdf', marginLeft: 10}}
            />
          ),
          tabBarIcon: () => (
            <FontAwesomeIcon
              size={20}
              icon={faFilePen}
              style={{color: '#115cdf'}}
            />
          ),
        }}
      />
      <JobsTab.Screen
        name="Completed"
        component={CompletedScreen}
        options={{
          headerLeft: () => (
            <FontAwesomeIcon
              size={20}
              icon={faCheck}
              style={{color: '#2168e4', marginLeft: 10}}
            />
          ),
          tabBarIcon: () => (
            <FontAwesomeIcon
              size={20}
              icon={faCheck}
              style={{color: '#2168e4'}}
            />
          ),
        }}
      />
    </JobsTab.Navigator>
  );
}
