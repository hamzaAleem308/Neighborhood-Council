import React from 'react';
import { Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
import DividerLine from '../Background/LineDivider';

export default function ScheduleMeeting () {
  const { width } = useWindowDimensions(); // screen width
  
  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
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
          resizeMode="contain" 
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