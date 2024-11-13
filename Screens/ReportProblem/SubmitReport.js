import React, { useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../../Background/WavyBackground';

export default function SubmitReport () {
  const { width } = useWindowDimensions(); // screen width
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const reportProblem = async () => {
    try {
      const response = await fetch('https://yourserver.com/api/ReportProblem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          visualEvidence,
          problemType,
          memberId
        })
      });

      if (response.ok) {
        Alert.alert('Success', 'Problem reported successfully');
      } else {
        Alert.alert('Error', 'Failed to report problem');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
      <Text style={styles.header}>Create a Council</Text>
        <TextInput style={styles.input} selectionColor={'#f5d8a0'} placeholder="Problem Title" keyboardType="default" onChangeText={setTitle} placeholderTextColor="#000" />
        <TextInput style={styles.description} 
        placeholder="Problem Description"  
        multiline={true}
        numberOfLines={5} 
        selectionColor={'#f5d8a0'}
        textAlignVertical="top" 
        keyboardType="default"
        onChangeText={setDesc} 
        placeholderTextColor="#000" />
       <TouchableOpacity style={styles.signInButton} onPress={{}}>
      {loading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : (
        <Text style={styles.signInButtonText}>Create</Text>
      )}
    </TouchableOpacity>
      <View style={styles.footerContainer}>
        <Image
          source={require('../../assets/Footer.png')}
          style={[styles.footer, { width: width }]} // image width to screen width
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
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0, 
    width: '100%',
    alignItems: 'center',
  },
});
