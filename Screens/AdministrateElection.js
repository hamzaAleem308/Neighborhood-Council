import React from 'react';
import { Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
import DividerLine from '../Background/LineDivider';

export default function AdministrateElection ({ navigation, route }) {
  const { width } = useWindowDimensions(); // screen width
  const { councilId } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
      <Text style={styles.titleText}>Setup the Panel Election</Text>
     <TouchableOpacity style={styles.signInButton} onPress={()=>{navigation.navigate('Create Election', {councilID: councilId})}}>
          <Text style={styles.signInButtonText}>Create New Election</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton} onPress={()=>{navigation.navigate('Nominate Candidate' , {councilID: councilId})}}>
            <Text style={styles.signInButtonText}>Nominate Candidates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton} onPress={()=>{navigation.navigate('View Election')}}>
            <Text style={styles.signInButtonText}>View Election</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton} onPress={()=>{navigation.navigate('Election History')}}>
            <Text style={styles.signInButtonText}>Election History</Text>
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
  titleText: {
    bottom : 100,
    color: 'black',
    margin: 10,
    fontSize: 30,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
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
    top: 20,
    width: '90%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#f5d8a0',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },

});