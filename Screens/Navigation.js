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
import { Alert, Platform, Text, View, TouchableOpacity  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';

import LoadingScreen from './LoadingScreen'; 
import Login from './Auth/Login'; 
import SignUp from './Auth/SignUp'; 
import HomeScreen from './Home'; 
import JoinCouncil from './Council/JoinCouncilScreen'; 
import CreateCouncil from './Council/CreateCouncil'; 
import AdminScreen from './Admin/AdminScreen';
import ResidentScreen from './ResidentScreen';
import CommitteeMemberScreen from './CommitteeMemberScreen';
import AddAnnouncement from './Announcement/AddAnnouncement';
import Announcement from './Announcement/Announcement';
import MeetingScreen from './Meeting/Meeting';
import InviteMember from './Admin/InviteResident';
import ScheduleMeeting from './Meeting/ScheduleMeeting';
import AdministrateElection from './Admin/AdministrateElection';
import ProfileScreen from './ProfileScreen';
import CreateElection from './Election/CreateElection';
import NominateCandidate from './Election/NominateCandidate';
import ElectionHistory from './Election/ElectionHistory';
import CreateNominees from './Election/CreateNominees';
import ReportProblem from './ReportProblem/ReportProblem';
import ViewElection from './Election/ViewElection';
import ChairmanScreen from './ChairmanScreen';
import SelectCategory from './ReportProblem/SelectCategory';
import VotingScreen from './Election/VotingScreen';
import SubmitReport from './ReportProblem/SubmitReport';
import AddProject from './Project/AddProject';
import Project from './Project/Project';
import ManageMembers from './Admin/ManageMembers';
import CouncilorScreen from './CouncilorScreen';
import ViewNominations from './Election/ViewNominations';
import NominatePanel from './Election/NominatePanel';
import ViewIssues from './ReportProblem/ViewIssues';
import ManageProjects from './Project/ManageProjects';
import ProjectDetails from './Project/ProjectsDetails';
import ProjectLogs from './Project/ProjectLogs';
import EditCouncilInfo from './Admin/EditCouncilInfo';
import ViewReportedProblems from './ReportProblem/ViewReportedProblem';
import ViewProblemProgress from './ReportProblem/ViewProblemProgress';

const Drawer = createDrawerNavigator();


// Custom Drawer Content
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{props.fullName}</Text> 
        <Text style={{ fontSize: 14, color: 'gray' }}>{props.phoneNo}</Text>
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity
        style={{ margin: 20 }}
        onPress={() => {
          Alert.alert(
            'Are you sure?',
            'Do you want to log out?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Ok',
                onPress: async () => {
                  try {
                    await AsyncStorage.removeItem('userToken');
                    props.navigation.replace('Login');  // Use props.navigation here
                  } catch (error) {
                    Alert.alert('Error', 'Failed to log out.');
                  }
                },
              },
            ]
          );
        }}
      >
        <Text style={{ color: 'red', fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}


// Drawer Navigator
function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}
const Stack = createStackNavigator();

export default function App() {

  const [memberId, setMemberId] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [dateJoined, setDateJoined] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      if (userData) {
        setMemberId(userData.memberId);
        setPhoneNo(userData.phoneNo);
        setFullName(userData.fullName);
        setGender(userData.gender);
        setDateOfBirth(userData.dateOfBirth);
        setProvince(userData.province);
        setCity(userData.city);
        setAddress(userData.address);
        setPassword(userData.password);
        setDateJoined(userData.dateJoined);
      }
    };

    fetchUserData();
  }, []);
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer >
      <Stack.Navigator initialRouteName="LoadingScreen">
      <Stack.Screen name="Login" component={Login} options={{headerShown : false}}/>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        // initialParams={{ fullName, phoneNo }} // Pass params here
        options={{ headerShown: false }} 
        />
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{headerTransparent: true, headerTitleAlign: 'center', headerShown : false}}/>
      <Stack.Screen name="JoinCouncil" component={JoinCouncil} options={{headerTransparent: true, headerTitleAlign: 'center',}}/>
      <Stack.Screen name="CreateCouncil" component={CreateCouncil} options={{headerTransparent: true, headerTitleAlign: 'center', headerTitle: ''}}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''}}/>
      <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''}}/>
      <Stack.Screen name="ResidentScreen" component={ResidentScreen} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''}}/>
      <Stack.Screen name="ChairmanScreen" component={ChairmanScreen} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>    
      <Stack.Screen name="CommitteeMemberScreen" component={CommitteeMemberScreen} options={{ headerTransparent: true, headerTitleAlign: 'center',  headerTitle: '' }}/>
      <Stack.Screen name="Invite Resident" component={InviteMember} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: '' }}/>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: '' }}/>
      <Stack.Screen name="Create Election" component={CreateElection} options={{headerTransparent: true, headerTitleAlign: 'center',   }}/>
      <Stack.Screen name="Administrate Election" component={AdministrateElection} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: '' }}/>
      <Stack.Screen name="Nominate Candidate" component={NominateCandidate} options={{headerTransparent: true, headerTitleAlign: 'center',  }}/>
      <Stack.Screen name="Election History" component={ElectionHistory} options={{headerTransparent: true, headerTitleAlign: 'center',  }}/>
      <Stack.Screen name="CreateNominees" component={CreateNominees} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>    
      <Stack.Screen name="ReportProblem" component={ReportProblem} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>    
      <Stack.Screen name="View Election" component={ViewElection} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>    
      <Stack.Screen name="Announcement" component={Announcement} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>    
      <Stack.Screen name="AddAnnouncement" component={AddAnnouncement} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>    
      <Stack.Screen name="SelectCategory" component={SelectCategory} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>    
      <Stack.Screen name="Meeting" component={MeetingScreen} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>    
      <Stack.Screen name="ScheduleMeeting" component={ScheduleMeeting} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>    
      <Stack.Screen name="VotingScreen" component={VotingScreen} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>    
      <Stack.Screen name="SubmitReport" component={SubmitReport} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>    
      <Stack.Screen name="AddProject" component={AddProject} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>    
      <Stack.Screen name="Project" component={Project} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>    
      <Stack.Screen name="ManageMembers" component={ManageMembers} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>    
      <Stack.Screen name="CouncilorScreen" component={CouncilorScreen} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>   
      <Stack.Screen name="NominatePanel" component={NominatePanel} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>   
      <Stack.Screen name="ViewNomination" component={ViewNominations} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>   
      <Stack.Screen name="ViewIssues" component={ViewIssues} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>   
      <Stack.Screen name="ManageProjects" component={ManageProjects} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>   
      <Stack.Screen name="ProjectDetails" component={ProjectDetails} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>   
      <Stack.Screen name="ProjectLogs" component={ProjectLogs} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>   
      <Stack.Screen name="EditCouncilInfo" component={EditCouncilInfo} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>   
      <Stack.Screen name="ViewReportedProblems" component={ViewReportedProblems} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>   
      <Stack.Screen name="ViewProblemProgress" component={ViewProblemProgress} options={{headerTransparent: true, headerTitleAlign: 'center',  headerTitle: ''  }}/>   
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
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
