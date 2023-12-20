import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import store from './reducers/store';
import BoyScreen from './Screen/BoyScreen';
import GirlScreen from './Screen/GirlScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import SettingsScreen from './Screen/SettingScreen';
import UpdateInfoScreen from './Screen/UpdateInfoScreen';
import InfoScreen from './Screen/InfoScreen';
import ChatScreen from './Screen/ChatScreen';
import EditInfoScreen from './Screen/EditInfoScreen';
import AddFoodScreen from './Screen/AddFoodScreen';
import FoodWheelScreen from './Screen/FoodWheelScreen';
import { IconButton } from 'react-native-paper';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function GirlTabs() {
  return (
    <Tab.Navigator shifting={true}>
      <Tab.Screen
        name="Girl"
        component={GirlScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconButton icon="chevron-left" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconButton icon="chevron-right" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function BoyTabs() {
  return (
    <Tab.Navigator shifting={true}>
      <Tab.Screen
        name="Boy"
        component={BoyScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconButton icon="chevron-left" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconButton icon="chevron-right" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="FoodWheel" component={FoodWheelScreen} />
          <Stack.Screen name="EditInfo" component={EditInfoScreen} />
          <Stack.Screen name="AddFood" component={AddFoodScreen} />
          <Stack.Screen name="Info" component={InfoScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="GirlTabs" component={GirlTabs} options={{ headerShown: false }} />
          <Stack.Screen name="UpdateInfo" component={UpdateInfoScreen} />
          <Stack.Screen name="BoyTabs" component={BoyTabs} options={{ headerShown: false }} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
