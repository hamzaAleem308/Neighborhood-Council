import React, { useEffect, useState } from 'react';
import { Text, Alert, SafeAreaView, TouchableOpacity, View, TextInput, StyleSheet, ImageBackground, Image, Dimensions, useWindowDimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
import  baseURL  from './Api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({}){
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] =useState();
  const navigation= useNavigation();

  const handlePress = async () => {
    if(phoneNo.trim()&&password.trim()){
    try {
      let response = await fetch(`${baseURL}Account/Login?phoneNo=${phoneNo}&password=${password}`);
  
      let json = await response.json();
      setData(json);
      console.log('Response status:', response.status);
      const token = 'LoggedIn'; //User Token to Check If logged in.
      await AsyncStorage.setItem('userToken', token);
      console.log('Token saved' + token)
      if (response.ok) {
        Alert.alert(
          'Welcome to the Portal',  
          `${data}`,             
          [
            { text: 'OK', onPress: () => navigation.navigate('HomeScreen') }
          ]
        );
      }
      else {
        Alert.alert('Error', 'No Member Registered with ' + phoneNo);
        
      }
    } catch (error) {
      Alert.alert('Error' , JSON.stringify(error));
      Alert.alert('Error', 'Failed to save the token');
    }
  }else{
    Alert.alert('Please Enter your Credentials!')
  }
  };

  return (
    <View style={styles.container}>
      <WavyBackground/>
      <View style={styles.logoContainer}>
          <View style={styles.logo}>
            {/* Icon placeholder */}
            <Image source={require('../Assets/UserProfile.png')} style={styles.image}></Image>
          </View>
        </View>
        <View>
        <Text style={styles.title}>Sign In</Text>
        </View>
        
        <TextInput style={styles.input} placeholder="Phone No" keyboardType="phone-pad" onChangeText={setPhoneNo} placeholderTextColor="#000" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} placeholderTextColor="#000"/>
        {/* <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.signInButton} onPress={handlePress}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.signUpText}>
            Don’t have an account? <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}>Sign Up!</Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.footer}>
      <Image source={require('../Assets/Footer.png')}></Image>
      {/* Footer content */}
    </View>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  image : {
    height : 150,
    width : 150
  },

  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color : 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    marginBottom: 10,
    color : 'black',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginLeft: '45%',
    color: '#A0A0A0',
    marginBottom: 20,
  },
  signInButton: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F0C38E',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#A0A0A0',
  },
  signUpLink: {
    color: '#F0C38E',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: useWindowDimensions,
    zIndex: -1,
  },
});