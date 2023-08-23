
async function verifyAddress(address: string): Promise<boolean> {
  return true;
  // const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';  // Replace with your actual API key
  // const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  // try {
  //   const response = await fetch(requestUrl);
  //   const data = await response.json();
  //   return data.status === "OK";  // If the status is "OK", the address is valid
  // } catch (error) {
  //   console.error("Error verifying address:", error);
  //   return false;
  // }
}

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function PostJobScreen() {
  
const [itemsCount, setItemsCount] = useState('');
const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

useEffect(() => {
  GoogleSignin.getCurrentUser().then(user => {
    if (user) {
      setCurrentUserEmail(user.user.email);
    }
  });
}, []);

  const [userDetails, setUserDetails] = useState<{ username?: string, address?: string }>({});

  useEffect(() => {
    GoogleSignin.getCurrentUser().then(user => {
      if (user) {
        const userDocRef = db.collection('users').doc(user.user.email);
        userDocRef.get().then(userDocSnap => {
          if (userDocSnap.exists) {
            setUserDetails(userDocSnap.data() as { username?: string, address?: string });
          }
        });
      }
    });
  }, []);

  const navigation = useNavigation<StackNavigationProp<any>>();

  
    const checkProfileComplete = async (email: string) => {
      const userDocRef = db.collection('users').doc(email);
      const userDocSnap = await userDocRef.get();
      const userData = userDocSnap.data();
      return (userData?.username && userData?.address);
    };

    const postJob = async () => {
      if (currentUserEmail && !await checkProfileComplete(currentUserEmail)) {
        Alert.alert("Please complete your profile before posting a job.");
        return;
      }
    
    if (!userDetails.address) return;

    const isAddressValid = await verifyAddress(userDetails.address);
    const itemsCountInt = Number(itemsCount);

    if (!isAddressValid) {
      Alert.alert('Please enter a valid address.');
      return;
    }

    if (itemsCountInt <= 0) {
      Alert.alert('Please specify a positive number of items to pick up.');
      return;
    }

    await db.collection('jobs').add({
      jobPoster: userDetails.username,
      jobPosterEmail: currentUserEmail,
      address: userDetails.address,
      numItems: itemsCountInt,
      jobClaimer: null,
      jobClaimerEmail: null,
      completed: false
    });

    setItemsCount(''); // Reset the input
    navigation.navigate('JobsBoard');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput 
        placeholder="Username"
        value={userDetails.username}
        editable={false}
      />
      <TextInput 
        placeholder="Full Address" 
        value={userDetails.address}
        onChangeText={(text) => setUserDetails({ ...userDetails, address: text })}
      />
      <TextInput 
        placeholder="Items to pick up" keyboardType="numeric" 
        value={itemsCount}
        onChangeText={setItemsCount}
      />
      <Button title="Post Job" onPress={postJob} />
    </View>
  );
}
