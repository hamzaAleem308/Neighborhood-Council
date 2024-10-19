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


////////////////////////////////////////////////////////////////// Conventional Home
import React, { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import LoadingScreen from './LoadingScreen'; 
import Login from './Login'; 
import SignUp from './SignUp'; 
import HomeScreen from './Home'; 
import JoinCouncil from './JoinCouncilScreen'; 
import CreateCouncil from './CreateCouncil'; 
import AdminScreen from './AdminScreen';
import ResidentScreen from './ResidentScreen';
import CommitteeMemberScreen from './CommitteeMemberScreen';
import AddAnnouncement from './AddAnnouncement';
import Announcemnet from './Announcement';
import MeetingScreen from './Meeting';
import InviteMember from './InviteResident';
import ScheduleMeeting from './ScheduleMeeting';
import AdministrateElection from './AdministrateElection';
import ProfileScreen from './ProfileScreen';
import CreateElection from './CreateElection';
import NominateCandidate from './NominateCandidate';
import ElectionHistory from './ElectionHistory';
import CreateNominees from './CreateNominees';
import ReportProblem from './ReportProblem';



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
      <Stack.Screen name="CreateCouncil" component={CreateCouncil} options={{headerTransparent: true, headerTitleAlign: 'center', headerTitle: ''}}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
      <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''}}/>
      <Stack.Screen name="ResidentScreen" component={ResidentScreen} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''}}/>
      <Stack.Screen name="CommitteeMemberScreen" component={CommitteeMemberScreen} options={{ headerTransparent: true, headerTitleAlign: 'center',  headerTitle: '' }}/>
      <Stack.Screen name="Invite Resident" component={InviteMember} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: '' }}/>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: '' }}/>
      <Stack.Screen name="Create Election" component={CreateElection} options={{headerTransparent: true, headerTitleAlign: 'center',   }}/>
      <Stack.Screen name="Administrate Election" component={AdministrateElection} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: '' }}/>
      <Stack.Screen name="Nominate Candidate" component={NominateCandidate} options={{headerTransparent: true, headerTitleAlign: 'center',  }}/>
      <Stack.Screen name="Election History" component={ElectionHistory} options={{headerTransparent: true, headerTitleAlign: 'center',  }}/>
      <Stack.Screen name="CreateNominees" component={CreateNominees} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>    
      <Stack.Screen name="ReportProblem" component={ReportProblem} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>    
      
      </Stack.Navigator>
      {/* <Stack.Navigator>
      <Stack.Screen name="InviteResident" component={InviteMember} options={{headerTransparent: true, headerTitleAlign: 'center', }}/>
      </Stack.Navigator> */}
      {/* <Stack.Navigator>
        <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerTransparent: true, headerTitleAlign: 'center'}}/>
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateCouncil" component={CreateCouncil}  options={{headerTransparent: true, headerTitleAlign: 'center',}} />
        <Stack.Screen name="JoinCouncil" component={JoinCouncil} options={{headerTransparent: true, headerTitleAlign: 'center',}} /> */} 
        {/* </Stack.Navigator> */}
    </NavigationContainer>
  );
}



// import React, { useEffect, useState } from 'react';
// import { Alert, Platform } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import SplashScreen from 'react-native-splash-screen';

// import LoadingScreen from './LoadingScreen'; 
// import Login from './Login'; 
// import SignUp from './SignUp'; 
// import HomeScreen from './Home'; 
// import JoinCouncil from './JoinCouncilScreen'; 
// import CreateCouncil from './CreateCouncil'; 
// import AdminScreen from './AdminScreen';
// import ResidentScreen from './ResidentScreen';
// import CommitteeMemberScreen from './CommitteeMemberScreen';
// import AddAnnouncement from './AddAnnouncement';
// import Announcemnet from './Announcement';
// import MeetingScreen from './Meeting';
// import InviteMember from './InviteResident';
// import ScheduleMeeting from './ScheduleMeeting';
// import AdministrateElection from './AdministrateElection';
// import ProfileScreen from './ProfileScreen';
// import CreateElection from './CreateElection';
// import NominateCandidate from './NominateCandidate';



// const Stack = createStackNavigator();

// export default function App() {
 
//   const [isLoggedIn, setIsLoggedIn] = useState(null);

//     useEffect(() => {
//       const checkLoginStatus = async () => {
//         try {
//           const token = await AsyncStorage.getItem('userToken');
//           setIsLoggedIn(token !== null);
//         } catch (error) {
//           console.error('Failed to fetch token from storage:', error);
//         }
//       };
  
//       checkLoginStatus();
//     }, []);
  
//     useEffect(() => {
//       if (Platform.OS === 'android') {
//         SplashScreen.hide();
//       }
//     }, []);
  
  
//     if (isLoggedIn === null) {
//       return <LoadingScreen />;
//     }
  
//     const AuthStack = () => (
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Login" component={Login} options={{headerShown : false}}/>
//         <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
//       </Stack.Navigator>
//     );
  
//     const AppStack = () => (
//       <Stack.Navigator >
//       <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="JoinCouncil" component={JoinCouncil} options={{headerTransparent: true, headerTitleAlign: 'center',}}/>
//         <Stack.Screen name="CreateCouncil" component={CreateCouncil} options={{headerTransparent: true, headerTitleAlign: 'center',}}/>
//         <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''}}/>
//       <Stack.Screen name="ResidentScreen" component={ResidentScreen} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''}}/>
//       <Stack.Screen name="CommitteeMemberScreen" component={CommitteeMemberScreen} options={{ headerTransparent: true, headerTitleAlign: 'center',  headerTitle: '' }}/>
//       <Stack.Screen name="InviteResident" component={InviteMember} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: '' }}/>
//       <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: '' }}/>
//       <Stack.Screen name="CreateElection" component={CreateElection} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: '' }}/>
//       <Stack.Screen name="AdministrateElection" component={AdministrateElection} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: '' }}/>
//       <Stack.Screen name="NominateCandidate" component={NominateCandidate} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: '' }}/>
    
//       </Stack.Navigator>
//     );

//   return (
//     <NavigationContainer >
//      {isLoggedIn ? <AppStack /> : <AuthStack />}
//       {/* <Stack.Navigator>
//       <Stack.Screen name="InviteResident" component={InviteMember} options={{headerTransparent: true, headerTitleAlign: 'center', }}/>
//       </Stack.Navigator> */}
//       {/* <Stack.Navigator>
//         <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerTransparent: true, headerTitleAlign: 'center'}}/>
//         {/* <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="CreateCouncil" component={CreateCouncil}  options={{headerTransparent: true, headerTitleAlign: 'center',}} />
//         <Stack.Screen name="JoinCouncil" component={JoinCouncil} options={{headerTransparent: true, headerTitleAlign: 'center',}} /> */} 
//         {/* </Stack.Navigator> */}
//     </NavigationContainer>
//   );
// }
