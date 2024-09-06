// import React, { useState, useEffect } from 'react';
// import { Platform } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import SplashScreen from 'react-native-splash-screen'; 
// import LoadingScreen from './LoadingScreen'; 
// import Login from './Login';
// import SignUp from './SignUp'; 
// import HomeScreen from './Home';
// import JoinCouncil from './JoinCouncilScreen';
// import CreateCouncil from './CreateCouncil';

// const Stack = createStackNavigator();

// export default function SetupNavigation() {
//   const [isLoggedIn, setIsLoggedIn] = useState(null);

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const token = await AsyncStorage.getItem('userToken');
//         setIsLoggedIn(token !== null);
//       } catch (error) {
//         console.error('Failed to fetch token from storage:', error);
//       }
//     };

//     checkLoginStatus();
//   }, []);

//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       SplashScreen.hide();
//     }
//   }, []);


//   if (isLoggedIn === null) {
//     return <LoadingScreen />;
//   }

//   const AuthStack = () => (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="SignUp" component={SignUp} />
//     </Stack.Navigator>
//   );

//   const AppStack = () => (
//     <Stack.Navigator >
//       <Stack.Screen name="HomeScreen" component={HomeScreen} screenOptions={{ headerShown: false }}/>
//       <Stack.Screen name="JoinCouncil" component={JoinCouncil} />
//       <Stack.Screen name="CreateCouncil" component={CreateCouncil}/>
//     </Stack.Navigator>
//   );

//   return (
//     <NavigationContainer>
//       {isLoggedIn ? <AppStack /> : <AuthStack />}
   
//     </NavigationContainer>
//   );
// }
import React, { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import LoadingScreen from './LoadingScreen'; // Replace with your actual loading screen component
import Login from './Login'; // Replace with your actual Login component
import SignUp from './SignUp'; // Replace with your actual SignUp component
import HomeScreen from './Home'; // Replace with your actual HomeScreen component
import JoinCouncil from './JoinCouncilScreen'; // Replace with your actual JoinCouncil component
import CreateCouncil from './CreateCouncil'; // Replace with your actual CreateCouncil component

const Stack = createStackNavigator();

export default function App() {
 
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{headerShown : false}}/>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="JoinCouncil" component={JoinCouncil} options={{headerTransparent: true, headerTitleAlign: 'center',}}/>
      <Stack.Screen name="CreateCouncil" component={CreateCouncil} options={{headerTransparent: true, headerTitleAlign: 'center',}}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
      </Stack.Navigator>
      {/* <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateCouncil" component={CreateCouncil}  options={{headerTransparent: true, headerTitleAlign: 'center',}} />
        <Stack.Screen name="JoinCouncil" component={JoinCouncil} options={{headerTransparent: true, headerTitleAlign: 'center',}} />
        </Stack.Navigator> */}
    </NavigationContainer>
  );
}
