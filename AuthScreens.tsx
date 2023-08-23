
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  View,
  Button,
  Alert,
} from 'react-native';
import { onGoogleButtonPress } from './modules/login';

type RootStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
  BottomTabNavigator: { screen: 'JobsBoard' | 'UserProfile' };
};

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp' | 'SignIn'>;

export function SignUpScreen({ navigation }: { navigation: AuthScreenNavigationProp }) {

  return (
    <View>
      <Button
        title="Google Sign-Up"
        onPress={async () => {
            try {
                const destinationScreen = await onGoogleButtonPress();
                console.log('Signed up with Google!');

                
                if (destinationScreen === "UserProfile") {
                    navigation.navigate('BottomTabNavigator', { screen: 'UserProfile' });
                } else if (destinationScreen === "JobsBoard") {
                    navigation.navigate('BottomTabNavigator', { screen: 'JobsBoard' });
                } else {
                    // Handle unexpected values or add other navigation logic if needed
                    console.warn("Unexpected destination:", destinationScreen);
                }
            } catch (error) {
                console.log('Error in signing up. Try again!');
            }
        }}
      />
      <Button title="Already have an account? Sign In" onPress={() => navigation.navigate('SignIn')} />
    </View>
  );
}

export function SignInScreen({ navigation }: { navigation: AuthScreenNavigationProp }) {
  return (
    <View>
      <Button
        title="Google Sign-In"
        onPress={async () => {
            try {
                const destinationScreen = await onGoogleButtonPress();
                console.log('Signed in with Google!');

                
                if (destinationScreen === "UserProfile") {
                    navigation.navigate('BottomTabNavigator', { screen: 'UserProfile' });
                } else if (destinationScreen === "JobsBoard") {
                    navigation.navigate('BottomTabNavigator', { screen: 'JobsBoard' });
                } else {
                    // Handle unexpected values or add other navigation logic if needed
                    console.warn("Unexpected destination:", destinationScreen);
                }
            } catch (error) {
                console.log('Error in signing in. Try again!');
            }
        }}
      />
      <Button title="Don't have an account? Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}