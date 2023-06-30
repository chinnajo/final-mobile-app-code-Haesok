// import * as React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import JobDetailsScreen from './JobDetailsScreen';
// import DocumentScreen from './DocumentScreen';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {library} from '@fortawesome/fontawesome-svg-core';
// import {faBookUser} from '@fortawesome/free-solid-svg-icons/faBookUser';
// import {faMemoCircleInfo} from '@fortawesome/free-solid-svg-icons/faMemoCircleInfo';
// library.add(faBookUser, faMemoCircleInfo);

// const JobDetailsTab = createBottomTabNavigator();

// export default function JobDetailsTabScreen() {
//   return (
//     <JobDetailsTab.Navigator
//       screenOptions={{
//         headerShown: true,
//         headerTitleAlign: 'center',
//       }}>
//           <JobDetailsTab.Screen
//         name="Document"
//         component={DocumentScreen}
//         options={{
//           tabBarIcon: () => (
//             <FontAwesomeIcon icon={faBookUser} style={{color: '#1363DF'}} />
//           ),
//         }}
//       />
//       {/* <JobDetailsTab.Screen
//         name="JobDetails"
//         component={JobDetailsScreen}
//         options={{
//           tabBarIcon: () => (
//             <FontAwesomeIcon
//               icon={faMemoCircleInfo}
//               style={{color: '#1363DF'}}
//             />
//           ),
//         }}
//       /> */}
    
//     </JobDetailsTab.Navigator>
//   );
// }
