import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Alert, Image, SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
import { Button, Card, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CouncilCard from '../Cards/CouncilCard';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen({ route, navigation }) {
  const { width } = useWindowDimensions();

  const [memberId, setMemberId] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [gender, setGender] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [province, setProvince] = useState(null);
  const [city, setCity] = useState(null);
  const [address, setAddress] = useState(null);
  const [password, setPassword] = useState(null);
  const [dateJoined, setDateJoined] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      if (userData) {
        setMemberId(userData.memberId);
        setPhoneNo(userData.phoneNo);
        setFullName(userData.fullName);
        setGender(userData.gender);
        setDateOfBirth(userData.dateOfBirth);
        setProvince(userData.province);
        setCity(userData.city);
        setAddress(userData.address);
        setPassword(userData.password);
        setDateJoined(userData.dateJoined);
      }
    };

    fetchUserData();
  }, []);

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

//   useFocusEffect(
//     useCallback(() => {
//       GetCouncils();
//     }, []) 
//   );

 

  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
      <View style={styles.container1}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>{fullName}</Text>
          <Text style={styles.cardContent}>Phone: {phoneNo}</Text>
          <Text style={styles.cardContent}>Gender: {gender}</Text>
          <Text style={styles.cardContent}>Date of Birth: {dateOfBirth}</Text>
          <Text style={styles.cardContent}>Province: {province}</Text>
          <Text style={styles.cardContent}>City: {city}</Text>
          <Text style={styles.cardContent}>Address: {address}</Text>
          <Text style={styles.cardContent}>Date Joined: {dateJoined}</Text>
        </Card.Content>
      </Card>
      {/* <Button mode="contained" onPress={() => navigation.navigate('EditContact', { contact })} style={styles.button}>
        Edit Contact
      </Button>
      <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.button}>
        Back to Contacts
      </Button> */}
    </View>
      <Image
        source={require('../assets/Footer.png')}
        style={[styles.footer, { width: width }]}
        resizeMode="stretch"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Light background color for contrast
        padding: 100,
      },
    //   container1: {
    //     flex: 1,
    //     backgroundColor: '#fff', // Light background color for contrast
    //     padding: 16,
    //   },
  card: {
    backgroundColor: '#fff', // White background for the card
    borderRadius: 16,
    padding: 5,
    shadowColor: '#000', // Shadow for a modern, raised card look
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Elevation for Android shadow
    top: 50
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007bff', // Eye-catching color for the title
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 16,
    color: '#555', // Gray color for secondary text
    marginBottom: 4,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  headerText: {
    fontFamily: 'KronaOne-Regular',
    fontSize: 35,
    color: '#000',
    marginBottom: 5,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 0,
    paddingBottom: 150,
  },
  listContent: {
    paddingBottom: 20,
  },
  cardContainer: {
    borderRadius: 20,
    padding: 10,
   
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    backgroundColor: '#F0C38E',
  },
  fab1: {
    position: 'absolute',
    left: 20,
    bottom: 90,
    backgroundColor: '#F0C38E',
  },
  fab2: {
    position: 'absolute',
    left: 90,
    bottom: 90,
    backgroundColor: '#F0C38E',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    zIndex: -1,
  },
});
