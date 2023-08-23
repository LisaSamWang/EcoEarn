
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SignUpScreen, SignInScreen } from './AuthScreens';
import { JobsBoardScreen } from './JobsBoard';
import { UserProfileScreen } from './UserProfile';
import { PostJobScreen } from './PostJob';
import { RedeemPointsScreen } from './RedeemPoints';
import { RedemptionConfirmationScreen } from './RedemptionConfirmation';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  BottomTabNavigator: undefined;
  PostJob: undefined;
  RedemptionConfirmation: undefined;

  
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="JobsBoard">
      <Tab.Screen name="JobsBoard" component={JobsBoardScreen} options={{ title: 'Jobs Board' }} />
      <Tab.Screen name="PostJob" component={PostJobScreen} options={{ title: 'Post Job' }} />
      <Tab.Screen name="RedeemPoints" component={RedeemPointsScreen} options={{ title: 'Redeem Points' }} />
      <Tab.Screen name="UserProfile" component={UserProfileScreen} options={{ title: 'User Profile' }} />
    </Tab.Navigator>
  );
}

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }}/>
        <Stack.Screen 
        name="RedemptionConfirmation" 
        component={RedemptionConfirmationScreen} 
        options={{ headerLeft: () => null }}  // This line removes the back button
    />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

