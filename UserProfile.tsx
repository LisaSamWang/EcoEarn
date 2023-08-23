import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function UserProfileScreen({ navigation }: any) {
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [email, setEmail] = useState<string>(''); // Added for displaying user's email
  const [points, setPoints] = useState<number>(0); // Added for displaying user's points

  const fetchUserDetails = async (userEmail: string) => {
    const userDocRef = db.collection('users').doc(userEmail);
    const userDocSnap = await userDocRef.get();
    if (userDocSnap.exists) {
      const data = userDocSnap.data();
      setName(data?.username || '');
      setAddress(data?.address || '');
      setEmail(data?.email || '');
      setPoints(data?.points || 0);
    }
  };

  const saveUserProfile = async () => {
    if (name.length <= 1 || address.length <= 1) {
      Alert.alert("Name and Address should be longer than 1 character.");
      return;
    }
    const currentUser = await GoogleSignin.getCurrentUser();
    if (currentUser) {
      const userDocRef = db.collection('users').doc(currentUser.user.email);
      await userDocRef.update({
        username: name,
        address: address
      });
      Alert.alert("Profile updated successfully!");
    } else {
      Alert.alert("Failed to update profile. Please try again.");
    }
  };

  
const signOut = async () => {
    try {
        await GoogleSignin.signOut();
        navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' }],
        });
    } catch (error) {
        console.error("Error signing out:", error);
        Alert.alert("Error", "There was an issue signing out. Please try again.");
    }
};


  useEffect(() => {
    let unsubscribe: any;

    GoogleSignin.getCurrentUser().then(user => {
      if (user) {
        const userDocRef = db.collection('users').doc(user.user.email);
        
        // Setting up a real-time listener for the user's document in Firestore
        unsubscribe = userDocRef.onSnapshot((doc) => {
          const data = doc.data();
          if (data) {
            setName(data.username || '');
            setAddress(data.address || '');
            setEmail(data.email || '');
            setPoints(data.points || 0);
          }
        });
      }
    });

    // Cleanup the listener when the component is unmounted
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>Name: </Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>Address: </Text>
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      </View>
      <Text>Email: {email}</Text>
      <Text>Points: {points}</Text>
      <Button title="Save Profile" onPress={saveUserProfile} />
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}
