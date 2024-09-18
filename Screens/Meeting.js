import React from 'react';
import { Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
import DividerLine from '../Background/LineDivider';

export default function MeetingScreen (Council) {
  const { width } = useWindowDimensions(); // screen width
  
  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
      <Text style={styles.titleText}>Meetings</Text>
        <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Upcoming Meetings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Past Meetings</Text>
        </TouchableOpacity>
        <FAB
        icon="plus"
        style={styles.fab}
        color="#000"
        onPress={() => navigation.navigate('ScheduleMeeting', { memberID: memberId })}
      />
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
  titleText: {
    bottom : 70,
    color: 'black',
    margin: 10,
    fontSize: 30,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: useWindowDimensions,
    zIndex: -1,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    backgroundColor: '#F0C38E',
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