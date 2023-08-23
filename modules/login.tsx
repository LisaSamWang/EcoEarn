
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { db } from '../firebaseConfig';

GoogleSignin.configure({
  webClientId: '42057584434-gb1uivcbiqr16ev5f95grbdd2rabstuv.apps.googleusercontent.com'
});

export async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Get the user's ID token and email
    const { idToken, user } = await GoogleSignin.signIn();
  
    // Check if user's email exists in Firestore
    const userRef = db.collection('users').doc(user.email);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
        // If user doesn't exist, sign-up (store user's details in Firestore with default values)
        await userRef.set({
            email: user.email,
            username: user.givenName, // Assuming givenName as username for now
            address: "", // Address will be set later by user
            points: 0
        });
        // Navigate to UserProfile screen for new users to complete their profile
        return "UserProfile";
    }

    const userData = userDoc.data();
    if (!userData?.username || !userData?.address) {
        // If username or address is not set, navigate to UserProfile screen
        return "UserProfile";
    }

    // For existing users with complete profiles, navigate to JobsBoard screen
    return "JobsBoard";
}









// import auth from '@react-native-firebase/auth'
// import { GoogleSignin } from '@react-native-google-signin/google-signin'
// GoogleSignin.configure({
//   webClientId: '42057584434-gb1uivcbiqr16ev5f95grbdd2rabstuv.apps.googleusercontent.com'
// })

// export async function onGoogleButtonPress () {
//     // Check if your device supports Google Play
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
//     // Get the users ID token
//     const { idToken } = await GoogleSignin.signIn()
  
//     // Create a Google credential with the token
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken)
  
//     // Sign-in the user with the credential
//     return auth().signInWithCredential(googleCredential)
//   }