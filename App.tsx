const initialRoute = auth.currentUser ? "BottomTabNavigator" : "SignIn";
// const initialRoute = auth.currentUser ? "SignIn" : "BottomTabNavigator";


// import React, { useState, PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { auth } from './firebaseConfig';
import { createStackNavigator } from '@react-navigation/stack';
import { SignUpScreen, SignInScreen } from './AuthScreens';

import { JobsBoardScreen } from './JobsBoard';
import { PostJobScreen } from './PostJob';
import { UserProfileScreen } from './UserProfile';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  BottomTabNavigator: undefined;
  PostJob: undefined;
};


const Stack = createStackNavigator<RootStackParamList>();

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
//make the bottom navigator
function BottomTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="JobsBoard">
      <Tab.Screen name="JobsBoard" component={JobsBoardScreen} options={{ title: 'Jobs Board' }} />
      <Tab.Screen name="UserProfile" component={UserProfileScreen} options={{ title: 'User Profile' }} />
    </Tab.Navigator>
  );
}
//main routing
export default function App(): JSX.Element {
  return (
    <NavigationContainer>

<Stack.Navigator initialRouteName={initialRoute}>
  <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In'}} />
  <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
  <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
  <Stack.Screen name="PostJob" component={PostJobScreen} options={{ title: 'Post a Job' }} />

</Stack.Navigator>

    </NavigationContainer>
  );
}










































// import React, { useState, PropsWithChildren } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';
// import { SignUpScreen, SignInScreen } from './AuthScreens';
// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type RootStackParamList = {
//   SignUp: undefined;
//   SignIn: undefined;
//   Home: undefined;
// };

// const Stack = createStackNavigator<RootStackParamList>();

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({ children, title }: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function HomeScreen(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default function App(): JSX.Element {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="SignUp">
//         <Stack.Screen name="SignUp" component={SignUpScreen} />
//         <Stack.Screen name="SignIn" component={SignInScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }



















