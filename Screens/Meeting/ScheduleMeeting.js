import React, { useState } from 'react';
import { Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../../Background/WavyBackground';
import DatePicker from 'react-native-date-picker';

export default function ScheduleMeeting ({ route, navigation }) {
  const { width } = useWindowDimensions(); // screen width
  const {memberId} = route.params;
  const [title, setTitle] = useState('')
  const [agenda, setAgenda] = useState('')
  const [location, setLocation] = useState('')
  const [meetingDate, setMeetingDate] = useState(new Date());
  
  const [startDatePickerOpen, setStartDatePickerOpen] = useState(false);
  const [mdData, setMdData] = useState('Select Meeting Date and Time')
  
  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
      <Text style={styles.header}>Council</Text>
        <TextInput style={styles.input} placeholder="Enter Title" keyboardType="default" onChangeText={setTitle} placeholderTextColor="#000" />
        <TextInput style={styles.input} placeholder="Enter Agenda" keyboardType="default" onChangeText={setAgenda} placeholderTextColor="#000" />
        <TextInput style={styles.input} placeholder="Meeting Location" keyboardType="default" onChangeText={setLocation} placeholderTextColor="#000" />
        <TouchableOpacity style={styles.dobButton} onPress={() => setStartDatePickerOpen(true)}>
            <Text style={styles.signUpButtonText}>{meetingDate}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={startDatePickerOpen}
            date={sd}
            mode="datetime"
            onConfirm={(date) => {
              setStartDatePickerOpen(false);
              setMeetingDate(date);
              setMdData(date.toLocaleString());
            }}
            onCancel={() => setStartDatePickerOpen(false)}
          />
        <TouchableOpacity style={styles.signInButton} onPress={{}}>
            <Text style={styles.signInButtonText}>Schedule Meeting</Text>
        </TouchableOpacity>
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
  input: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    marginBottom: 10,
    color : 'black',
    },
  header : {
      fontSize : 30,
      color : '#493D18',
      justifyContent : 'center',
      alignItems : 'center',
      fontWeight : '500',
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
  signUpButton: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F0C38E',
    alignItems: 'center',
    marginBottom: 30,
  },
  signUpButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  dobButton: {    
    width: '65%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    marginBottom: 20,
  },
});