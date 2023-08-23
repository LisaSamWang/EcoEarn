
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { auth, firestore } from './firebaseConfig';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";


export function UserProfileScreen({ navigation }: any) {
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const userId = auth.currentUser?.uid;

  const loggedIn = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // const name = user.name 
    } else {
      // User is signed out
      // ...
    }
  });

  useEffect(() => {
    if (userId) {
      // Fetch user details from Firestore
      const fetchUserDetails = async () => {
        const userDocRef = doc(firestore, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data() as { name?: string, address?: string };
          setName(data.name || '');
          setAddress(data.address || '');
        }
      };

      fetchUserDetails();
    }
  }, [userId]);

  const saveUserProfile = async () => {
    if (!userId) return;
    await setDoc(doc(firestore, 'users', userId), {
      name,
      address
    });
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>User Profile</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} />
      <Button title="Save Profile" onPress={saveUserProfile} />
    </View>
  );
}
