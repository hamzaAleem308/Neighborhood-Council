import React from 'react';
import { Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../Background/WavyBackground';

export default function AdminScreen () {
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
      <View style={styles.footerContainer}>
        <Image
          source={require('../assets/Footer.png')}
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
    alignItems:'center',
    justifyContent:'center'
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0, 
    width: '100%',
    alignItems: 'center',
  },
  footer: {
    height: 100,
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