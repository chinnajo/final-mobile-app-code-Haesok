import LoginScreen from './components/LoginScreen';
import JobsTabScreen from './components/JobsTabScreen';
import JobDetailsScreen from './components/JobDetailsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CustomHeaderTitle from './components/HeaderTitle';
import HeaderRightIcon from './components/HeaderRightIcon';
import DocumentScreen from './components/DocumentScreen';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: () => (
            <CustomHeaderTitle fontsize={20} color={'#fff'}></CustomHeaderTitle>
          ),
          headerRight: () => <HeaderRightIcon></HeaderRightIcon>,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: '#1363DF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

          headerTitleAlign: 'center',
        }}>
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Group>

        <Stack.Screen
          name="Tab"
          component={JobsTabScreen}
          options={{headerBackVisible: false}}
        />

        <Stack.Screen name="JobDetails" component={JobDetailsScreen} />

        <Stack.Screen name="Document" component={DocumentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
