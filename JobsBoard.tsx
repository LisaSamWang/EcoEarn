
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { firebase } from '@react-native-firebase/firestore';

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

  type Job = { id: string; jobPoster?: string; jobPosterEmail?: string; address?: string; numItems?: number; jobClaimer?: string; jobClaimerEmail?: string; completed?: boolean };
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");
  const [currentUsername, setCurrentUsername] = useState<string | undefined>(undefined);
  // Get current user's email
  useEffect(() => {
    GoogleSignin.getCurrentUser().then(user => {
      if (user && user.user.email) {
        setCurrentUserEmail(user.user.email);
      }
    });
  }, []);

  useEffect(() => {
    // Fetch all jobs from Firestore
    const jobsCollectionRef = db.collection('jobs');
    const unsubscribe = jobsCollectionRef.onSnapshot(snapshot => {
      const fetchedJobs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setJobs(fetchedJobs);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUserEmail) {
      // Fetch the username from Firestore using currentUserEmail
      db.collection('users').doc(currentUserEmail).get()
        .then(doc => {
          if (doc.exists) {
            const userData = doc.data();
            if (userData?.username) {
              setCurrentUsername(userData.username);
            }
          }
        });
    }
  }, [currentUserEmail]);


  const checkProfileComplete = async (email: string) => {
    const userDocRef = db.collection('users').doc(email);
    const userDocSnap = await userDocRef.get();
    const userData = userDocSnap.data();

    return (userData?.username && userData?.address);
  };

  const claimJob = async (jobId: string) => {
    if (!await checkProfileComplete(currentUserEmail)) {
      Alert.alert("Please complete your profile before claiming a job.");
      return;
    }

    if (!currentUserEmail) return;
    const jobDocRef = db.collection('jobs').doc(jobId);
    await jobDocRef.update({ jobClaimer: currentUsername, jobClaimerEmail: currentUserEmail });
  };

  // Additional logic for completing a job and awarding points
  const completeJob = async (jobId: string, jobPoster: string, numItems: number) => {
    if (!currentUserEmail || !numItems) return;

    // Update the job's status to "completed"
    const jobDocRef = db.collection('jobs').doc(jobId);
    await jobDocRef.update({ completed: true });

    // Update points for both the job claimer and the job poster
    const claimerDocRef = db.collection('users').doc(currentUserEmail);
    const posterDocRef = db.collection('users').doc(jobPoster);

    await claimerDocRef.update({ points: firebase.firestore.FieldValue.increment(numItems * 2) });
    await posterDocRef.update({ points: firebase.firestore.FieldValue.increment(numItems) });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={jobs}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, padding: 10, borderColor: 'forestgreen', borderWidth: 1 }}>
            <Text style={{ color: 'black' }}>
              <Text style={{ fontWeight: 'bold' }}>
                User:</Text> {item.jobPoster}
            </Text>
            <Text style={{ color: 'black' }}>
              <Text style={{ fontWeight: 'bold' }}>Address</Text>: {item.address}
            </Text>
            <Text style={{ color: 'black' }}>
              <Text style={{ fontWeight: 'bold' }}>Items to pick up</Text>: {item.numItems}
            </Text>

            {item.completed ?
              <Text style={{ fontStyle: 'italic', color: 'black' }}>Job Completed</Text> :
              item.jobClaimer ?
                item.jobClaimerEmail === currentUserEmail ?
                  <Button title="Completed" onPress={() => {
                    if (item.id && item.jobPosterEmail && item.numItems !== undefined) {
                      completeJob(item.id, item.jobPosterEmail, item.numItems);
                    }
                  }} /> :
                  <Text style={{ color: 'black' }}>Claimed by: {item.jobClaimer}</Text> :
                <Button title="Claim Job" onPress={() => claimJob(item.id)} />
            }
          </View>
        )
        }
        keyExtractor={item => item.id}
      />
    </View >
  );
}


