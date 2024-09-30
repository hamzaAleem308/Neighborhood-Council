import React, { useEffect, useState } from 'react';
import { Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, useWindowDimensions, View, Alert } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
import DividerLine from '../Background/LineDivider';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminScreen ({ route }) {
  const { width } = useWindowDimensions(); // screen width
  const navigation = useNavigation();
  const [councilData , setCouncilData] = useState({});
  const [membersCount, setMembersCount] = useState(0);

  const { Council } = route.params;
  const getCouncilData = async () => {
    try {
      const response = await fetch(`${baseURL}Council/GetCouncil?councilId=${Council}`);
      if (response.ok) {
        const json = await response.json();
        console.log(json)
        setCouncilData(json);
      } else {
        Alert.alert('Error', 'Failed to load data');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while loading data');
    }
  };


  const [memberId, setMemberId] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [gender, setGender] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [province, setProvince] = useState(null);
  const [city, setCity] = useState(null);
  const [address, setAddress] = useState(null);
  const [password, setPassword] = useState(null);
  const [dateJoined, setDateJoined] = useState(null);

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

  const getCouncilMemberCount = async () => {
    try {
      const response = await fetch(`${baseURL}Council/CountCouncilMembers?councilId=${Council}`);
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        setMembersCount(json.MemberCount);  // Extract MemberCount from the response
      } else {
        Alert.alert('Error', 'Failed to load data');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while loading data');
    }
  };

  
  useEffect(() => {
    getCouncilData();
    getCouncilMemberCount();
  }, []);

  useEffect(() => {
    if (councilData) {
      console.log('Council Data updated:', councilData);
      console.log('Council Members:', membersCount);
    }
  }, [councilData]);
 

  // useEffect(() => {
  //   console.log('Updated Council Data:', councilData);
  // }, [councilData]);

  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
      {/* <Text style={styles.welcomeText}>Welcome {fullName}</Text>
      <Text style={styles.nameText}>{fullName}</Text> */}
      <Text style={styles.name}>{councilData?.Name || 'Loading...'}</Text>
      
      <Text style={styles.memberCount}>Members: {membersCount}</Text>
      <View style={{flexDirection : 'row'}}>
      <TouchableOpacity onPress={()=>{navigation.navigate('InviteResident', {councilId : Council})}}>
      <View style={styles.logoContainer}>
          <View style={styles.logo}>
            {/* Icon placeholder */}
            <Image source={require('../assets/JoinLink.png')} style={styles.image} ></Image>
            <Text style={styles.logoText}>Link</Text>
          </View>
        </View> 
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{console.log('pressed')}}>
      <View style={styles.logoContainer}>
          <View style={styles.logo}>
            {/* Icon placeholder */}
            <Image source={require('../assets/announcement.png')} style={styles.image}></Image>
            <Text style={styles.logoText}>Announcement</Text>
          </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('AdministrateElection', {councilId : Council})}}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            {/* Icon placeholder */}
            <Image source={require('../assets/election.png')} style={styles.image}></Image>
            <Text style={styles.logoText}>Election</Text>
          </View>
        </View>
        </TouchableOpacity>
        </View>
      <DividerLine/>
      <Text style={styles.desc}>Description: {councilData?.Description || 'Loading...'}</Text>
      <DividerLine/>
      <TouchableOpacity style={styles.signInButton} onPress={{}}>
          <Text style={styles.signInButtonText}>Edit Community Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Manage Members</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Meetings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Complaints</Text>
        </TouchableOpacity>
        <Image
          source={require('../assets/Footer.png')}
          style={[styles.footer, { width: width }]}
          resizeMode="stretch" 
        />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    alignItems:'center',
    justifyContent:'center'
  },
  logoContainer: {
    marginBottom: 40,
    justifyContent: 'center',  
    alignItems: 'center', 
  marginHorizontal : 35
  },
  image : {
    height : 60,
    width : 60
  },
  memberCount:{
    color : 'black', 
    fontSize: 17, 
    marginBottom : 50,
     },
  name:{
    color: 'black',
    fontSize: 25,
    fontWeight :'700',
  },
  welcomeText: {
    fontFamily: 'KronaOne-Regular',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  nameText: {
    fontSize: 20,
    top : 5,
    fontWeight: '600',
    color: 'black',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 75,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    marginTop: 8, 
    fontSize: 14, 
    color: 'black', 
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: useWindowDimensions,
    zIndex: -1,
  },
  desc:{
    fontSize: 17,
    color: 'black',
    marginLeft: 10,
    right: 5,
    textAlign: 'center',
    alignItems : 'center'
  },
  signInButton: {
    width: '90%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F0C38E',
    alignItems: 'center',
    marginBottom: 15,
  },
  signInButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },

});