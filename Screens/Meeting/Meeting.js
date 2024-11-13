import React, { useEffect, useState } from 'react';
import { Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../../Background/WavyBackground';
import DividerLine from '../../Background/LineDivider';
import { FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MeetingScreen ({Council, navigation}) {
  const { width } = useWindowDimensions(); // screen width
  const [memberId, setMemberId] = useState(0)
  const getData = async () => {
    const userDataString = await AsyncStorage.getItem('userData'); 
        if (userDataString !== null) {
          const userData = JSON.parse(userDataString); // Parse userData from string
          if (userData && userData.memberId) {
            setMemberId(userData.memberId)
          }
        }
        }
        useEffect(() => {
          getData()
        },[])
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
          source={require('../../assets/Footer.png')}
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