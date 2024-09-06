import React, { useState } from 'react';
import {Text, TouchableOpacity ,Button, Image, SafeAreaView, StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../Background/WavyBackground';

export default function JoinCouncil ({route, navigation}) {
  const { width } = useWindowDimensions(); // screen width
  const [councilLink, setCouncilLink] = useState('');
 const { memberID } = route.params;
  const handlePress = async()=>{
    navigation.navigate('CreateCouncil',{ Id : memberID})
  }
  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
      
      <Text style={{color: 'black', margin: 30, fontSize: 30, textAlign:'center', }}>Let's Get Started by Creating or Joining a Council.</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Create Council</Text>
        </TouchableOpacity>
        <Text style={{color: 'black', textAlign : 'center', fontSize: 20 , margin:8}}>OR  </Text>
      <TextInput style={styles.input} placeholder="Paste Link Here" onChangeText={setCouncilLink} placeholderTextColor="#0007" />
      <TouchableOpacity style={styles.button} onPress={()=>console.log('pressed')}>
          <Text style={styles.buttonText}>Join Council</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
        <Image
          source={require('../Assets/Footer.png')}
          style={[styles.footer, { width: width }]} // image width to screen width
          resizeMode="contain" // Maintain aspect ratio
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
    color: '#fff',
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
