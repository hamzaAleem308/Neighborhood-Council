import React, { useEffect, useState } from 'react';
import { Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, useWindowDimensions, View, Alert } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
import DividerLine from '../Background/LineDivider';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminScreen ({ route }) {
  const { width } = useWindowDimensions(); // screen width
  const navigation = useNavigation();
  const [councilData , setCouncilData] = useState([]);

  const { Council } = route.params;

  useEffect(() => {
    // You can use councilId, councilName, and councilDescription here
    console.log('Council ID:', {Council}); 
  }, []);


  useEffect(() => {
    const getCouncilData = async () => {
      try {
        const response = await fetch(`${baseURL}Council/GetCouncil?councilId=${Council}`);
        if (response.ok) {
          const json = await response.json();
          // Save data in AsyncStorage
          await AsyncStorage.setItem('councilData', JSON.stringify(json));
          setCouncilData(json);
        } else {
          Alert.alert('Error', 'Failed to load data');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while loading data');
      }
    };
    getCouncilData();
  }, [Council]);


  useEffect(() => {
    const fetchCouncilDataFromStorage = async () => {
      try {
        const storedData = await AsyncStorage.getItem('councilData');
        if (storedData) {
          setCouncilData(JSON.parse(storedData));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch data from storage');
      }
    };

    fetchCouncilDataFromStorage();
  }, [])

  useEffect(() => {
    console.log('Updated Council Data:', councilData);
  }, [councilData]);

  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
      <Text style={{color: 'black', }}>{councilData.Name}</Text>
      <Text style={{color : 'black', fontSize: 20, marginBottom : 50}}>Members: {councilData.id}</Text>
      <View style={{flexDirection : 'row'}}>
      <TouchableOpacity onPress={()=>{navigation.navigate('InviteResident', {councilId : Council})}}>
      <View style={styles.logoContainer}>
          <View style={styles.logo}>
            {/* Icon placeholder */}
            <Image source={require('../assets/JoinLink.png')} style={styles.image} ></Image>
          </View>
        </View> 
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{console.log('pressed')}}>
      <View style={styles.logoContainer}>
          <View style={styles.logo}>
            {/* Icon placeholder */}
            <Image source={require('../assets/announcement.png')} style={styles.image}></Image>
          </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{console.log('pressed')}}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            {/* Icon placeholder */}
            <Image source={require('../assets/election.png')} style={styles.image}></Image>
          </View>
        </View>
        </TouchableOpacity>
        </View>
      <DividerLine/>
      <Text style={styles.desc}> {councilData.Desciption}</Text>
      <DividerLine/>
      {/* <Text style={{width: useWindowDimensions, color:'black',fontSize: 50 , resizeMode:'contained'}}>-</Text> */}
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
  justifyContent : 'space-between',
  marginHorizontal : 35
  },
  image : {
    height : 60,
    width : 60
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 75,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: useWindowDimensions,
    zIndex: -1,
  },
  desc:{
    fontSize: 20,
    textAlign: 'center',
    alignItems : 'center'
  },
  signInButton: {
    width: '90%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F0C38E',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },

});