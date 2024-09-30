import React, { useEffect, useState } from 'react';
import {Text, TouchableOpacity ,Button, Image, SafeAreaView, StyleSheet, TextInput, useWindowDimensions, View, Alert } from 'react-native';
import WavyBackground from '../Background/WavyBackground';

export default function JoinCouncil ({route, navigation}) {
  const { width } = useWindowDimensions(); // screen width
  const [councilLink, setCouncilLink] = useState('');
 const { memberID } = route.params;
 

  const JoinCouncilUsingJoinCode = async () => {
    if(!councilLink){
      Alert.alert('Please Enter Code to Join Council.')
      return;
    }
    try {
      const response = await fetch(`${baseURL}Council/JoinCouncilUsingCode?memberId=${memberID}&joinCode=${councilLink}`, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const json = await response.json();
        console.log(JSON.stringify(json));
        Alert.alert('Council added successfully!', 'Now you will be redirected to Home.', 
          [{ text: 'OK', onPress: () => navigation.navigate('HomeScreen', { member: memberID })}]);
      } 
      else if( response.status == 204) {
        Alert.alert('No Council Found with this Join Code')
      } 
      else if( response.status == 409) {
        Alert.alert('You are already a part of this council!')
      }
      else{
        Alert.alert('Error', 'Failed to load Data');
      }
    } catch (error) {
      Alert.alert('Error', 'No Councils Associated with this Code');
    }
  };

  const handlePress = async()=>{
    navigation.navigate('CreateCouncil',{ Id : memberID})
  }
  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
      
      <Text style={styles.header}>Let's Get Started by Creating or Joining a Council.</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Create Council</Text>
        </TouchableOpacity>
        <Text style={{color: 'black', textAlign : 'center', fontSize: 20 , margin:8}}>OR  </Text>
      <TextInput style={styles.input} placeholder="Enter Code Here!" onChangeText={setCouncilLink} placeholderTextColor="#0007" />
      <TouchableOpacity style={styles.button} onPress={JoinCouncilUsingJoinCode}>
          <Text style={styles.buttonText}>Join Council</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
        <Image
          source={require('../assets/Footer.png')}
          style={[{ width: width }]} // image width to screen width
          resizeMode="stretch" // Maintain aspect ratio
        />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Set the background color to white
    justifyContent: 'center',
    alignItems : 'center',
    
  },
  header:{
    color: 'black', 
    margin: 30, 
    fontSize: 30, 
    textAlign:'center', 
    bottom : 40,
    textTransform : 'capitalize'
  }
  ,
  footerContainer: {
    position: 'absolute',
    bottom: 0, 
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F0C38E',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    marginBottom: 10,
    color : 'black',
  },
});
