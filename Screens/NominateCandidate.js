import React, { useCallback, useEffect, useState } from 'react';
import { Text, Alert, SafeAreaView, TouchableOpacity, View, TextInput, StyleSheet, ImageBackground, Image, Dimensions, useWindowDimensions, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
import  baseURL  from './Api';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ElectionCard from '../Cards/ElectionCard';

export default function NominateCandidate({route}){
  const navigation= useNavigation();
  const { width } = useWindowDimensions();
  const [electionData, setElectionData] = useState({});
  const {councilID} = route.params;

  const getElections = async () => {
    try {
      const response = await fetch(`${baseURL}election/getElection?councilId=${councilID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const json = await response.json();
        console.log('Election Data: ' + json)
        setElectionData(json);
      }
      else{
        Alert.alert('Error', 'Failed to load Data');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while loading Data');
    }
  };

  useFocusEffect(
    useCallback(() => {
     getElections();
    }, [councilID]) 
  );


  const renderElectionCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <ElectionCard election={item} navigation={navigation} council={councilID} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Neighborhood</Text>
        <Text style={styles.headerText}>Council</Text>
      </View>

      <View style={styles.contentContainer}>
        <FlatList
          data={electionData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderElectionCard}
          contentContainerStyle={styles.listContent}
        />
      </View>
        <Image
          source={require('../assets/Footer.png')}
          style={[styles.footer, { width: width }]} // image width to screen width
          resizeMode="stretch" // Maintain aspect ratio
        />
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
  },
  headerText: {
    fontFamily: 'KronaOne-Regular',
    fontSize: 15,
    color: '#000',
    marginBottom: 5,
  },
  cardContainer: {
    borderRadius: 20,
    padding: 10,
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
  container2: {
    width: '100%',
    alignItems: 'center',
    position: 'relative', 
  },
  input: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    marginBottom: 10,
    color : 'black',
  },
  inputPassword: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    marginBottom: 10,
    color: 'black',
    paddingRight: 50, // Add right padding for the icon space
  },
  icon: {
    position: 'absolute',
    right: '12%', // Position the icon to the right inside the input
    justifyContent: 'center',
    height: '90%',
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
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: useWindowDimensions,
    zIndex: -1,
  },
});