import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { auth, firestore } from './firebaseConfig';
import { collection, doc, updateDoc, onSnapshot } from 'firebase/firestore';

export function JobsBoardScreen({ navigation }: { navigation: any }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Post a Job"
          onPress={() => navigation.navigate('PostJob')}
        />
      ),
    });
  }, [navigation]);

  type Job = { id: string; postedBy?: string; address?: string; itemsCount?: number; claimedBy?: string; };
const [jobs, setJobs] = useState<Job[]>([]);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    // Fetch all jobs from Firestore
    const jobsCollectionRef = collection(firestore, 'jobs');
    const unsubscribe = onSnapshot(jobsCollectionRef, snapshot => {
      const fetchedJobs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setJobs(fetchedJobs);
    });

    return () => unsubscribe();
  }, []);

  const claimJob = async (jobId: string) => {
    if (!userId) return;
    const jobDocRef = doc(firestore, 'jobs', jobId);
await updateDoc(jobDocRef, { claimedBy: userId });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={jobs}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }}>
            <Text>User: {item.postedBy}</Text>
            <Text>Address: {item.address}</Text>
            <Text>Items to pick up: {item.itemsCount}</Text>
            {item.claimedBy ? 
              <Text>Claimed by: {item.claimedBy}</Text> : 
              <Button title="Claim Job" onPress={() => claimJob(item.id)} />
            }
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

