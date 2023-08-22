async function verifyAddress(address: string): Promise<boolean> {
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';  // Replace with your actual API key
  const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  try {
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data.status === "OK";  // If the status is "OK", the address is valid
  } catch (error) {
    console.error("Error verifying address:", error);
    return false;
  }
}


import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { auth, firestore } from './firebaseConfig';
import { collection, doc, getDoc, addDoc } from 'firebase/firestore';

export function PostJobScreen() {
  const [itemsCount, setItemsCount] = useState('');
  const [userDetails, setUserDetails] = useState<{ name?: string, address?: string }>({});
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      // Fetch user details from Firestore
      const fetchUserDetails = async () => {
        const userDocRef = doc(firestore, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserDetails(userDocSnap.data() as { name?: string, address?: string });
        }
      };

      fetchUserDetails();
    }
  }, [userId]);

  

const navigation = useNavigation<StackNavigationProp<any>>();

const postJob = async () => {
  if (!userId || !userDetails.address) return;

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

  await addDoc(collection(firestore, 'jobs'), {
    postedBy: userId,
    address: userDetails.address,
    itemsCount: itemsCountInt
  });

  
  setItemsCount(''); // Reset the input
  navigation.navigate('JobsBoard');
};

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* <Text>Post a Job</Text> */}
<TextInput 
  placeholder="Username"
  value={userDetails.name}
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









// async function verifyAddress(address: string): Promise<boolean> {
//   const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';  // Replace with your actual API key
//   const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
//   try {
//     const response = await fetch(requestUrl);
//     const data = await response.json();
//     return data.status === "OK";  // If the status is "OK", the address is valid
//   } catch (error) {
//     console.error("Error verifying address:", error);
//     return false;
//   }
// }


// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, Alert } from 'react-native';
// import { auth, firestore } from './firebaseConfig';
// import { collection, doc, getDoc, addDoc } from 'firebase/firestore';

// export function PostJobScreen() {
//   const [itemsCount, setItemsCount] = useState('');
//   const [userDetails, setUserDetails] = useState<{ name?: string, address?: string }>({});
//   const userId = auth.currentUser?.uid;

//   useEffect(() => {
//     if (userId) {
//       // Fetch user details from Firestore
//       const fetchUserDetails = async () => {
//         const userDocRef = doc(firestore, 'users', userId);
//         const userDocSnap = await getDoc(userDocRef);
//         if (userDocSnap.exists()) {
//           setUserDetails(userDocSnap.data() as { name?: string, address?: string });
//         }
//       };

//       fetchUserDetails();
//     }
//   }, [userId]);

  
// const postJob = async () => {
//   if (!userId || !userDetails.address) return;

//   const isAddressValid = await verifyAddress(userDetails.address);
//   const itemsCountInt = Number(itemsCount);

//   if (!isAddressValid) {
//     Alert.alert('Please enter a valid address.');
//     return;
//   }

//   if (itemsCountInt <= 0) {
//     Alert.alert('Please specify a positive number of items to pick up.');
//     return;
//   }

//   await addDoc(collection(firestore, 'jobs'), {
//     postedBy: userId,
//     address: userDetails.address,
//     itemsCount: itemsCountInt
//   });

//   setItemsCount(''); // Reset the input
// };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       {/* <Text>Post a Job</Text> */}
// <TextInput 
//   placeholder="Username"
//   value={userDetails.name}
//   editable={false}
// />
// <TextInput 
//   placeholder="Full Address" 
//   value={userDetails.address}
//   onChangeText={(text) => setUserDetails({ ...userDetails, address: text })}
// />

//       <TextInput 
//         placeholder="Items to pick up" keyboardType="numeric" 
//         value={itemsCount}
//         onChangeText={setItemsCount}
//       />
//       <Button title="Post Job" onPress={postJob} />
//     </View>
//   );
// }


