import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  View,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import { auth, firestore } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { onGoogleButtonPress } from './modules/login';

import {addDoc, doc, setDoc} from "firebase/firestore"
type RootStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
  Home: undefined;
};

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp' | 'SignIn'>;

export function SignUpScreen({ navigation }: { navigation: AuthScreenNavigationProp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [mainAddress, setMainAddress] = useState('');

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Use doc if you don't want automatic uid
      await setDoc(doc(firestore, "users", email), {
        username: username,
        mainAddress: mainAddress,
      });
      navigation.navigate('SignIn');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" autoCapitalize='none' onChangeText={text => setEmail(text)} />
      <TextInput placeholder="Password" onChangeText={text => setPassword(text)} secureTextEntry />
      <TextInput placeholder='User name' autoCapitalize='none' onChangeText={text => setUsername(text)}/>
      <TextInput placeholder='Main Address' onChangeText={text => setMainAddress(text)} />
      <Button title="Sign Up" onPress={signUp} />
      <Button title="Already have an account? Sign In" onPress={() => navigation.navigate('SignIn')} />
    
    </View>
  );
}

export function SignInScreen({ navigation, route }: { navigation: AuthScreenNavigationProp }) {
  if (route.params?.user) {
    navigation.navigate('BottomTabNavigator', route.params);
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
      navigation.navigate('BottomTabNavigator');
        },
      );
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View>
    <Button
      title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress()
            .then((user) => {
              console.log(user);
              console.log('Signed in with Google!');
              navigation.navigate('BottomTabNavigator', {name: user.additionalUserInfo});
            })
            .catch(() => console.log('Error in signing in. Try again!'))
        }
    />
      <TextInput placeholder="Email" onChangeText={text => setEmail(text)} />
      <TextInput placeholder="Password" onChangeText={text => setPassword(text)} secureTextEntry />
      <Button title="Sign In" onPress={signIn} />
      <Button title="Don't have an account? Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}
