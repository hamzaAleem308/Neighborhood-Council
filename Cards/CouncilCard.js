import React, { useEffect, useState } from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Dimensions, Alert, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DividerLine from '../Background/LineDivider';

export default function CouncilCard({ route, council, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const[memberId, setMemberId] = useState(null);
  //const { member } = route.params;
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      if (userData && userData.memberId && userData.fullName) {
        setMemberId(userData.memberId);
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
  

  const checkUserType = async () => {
    try {
      const response = await fetch(`${baseURL}Council/GetUserType?memberId=${memberId}&councilId=${council.id}`);
      const role = await response.json();
      console.log(memberId)
      if (response.ok) {
        switch (role) {
          case 'Admin':
            navigation.navigate('AdminScreen', {Council : council.id});
            break;
          case 'Member':
            navigation.navigate('ResidentScreen' , {Council : council.id, councilName : council.Name, councilDescription: council.Description});
            break;
          case 'Chairperson':
          navigation.navigate('ChairmanScreen' , {Council : council.id, councilName : council.Name, councilDescription: council.Description});
          break;
          default:
            Alert.alert('Error', 'Unknown role.');
        }
      } else { 
        Alert.alert('Error', 'Failed to retrieve user type.');
      }
    } catch (error) {
      console.error('Error checking user type:', error);
      Alert.alert('Error', 'An error occurred while checking user type.');
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   checkUserType();
  // }, [navigation]);

  return (
    <View style={styles.view}>

    <Card style={styles.card} onPress={checkUserType}>
      <Card.Content>
        <Title style={{ color : 'black', fontWeight : '700'}}>{council.Name}</Title>
        {/* <Paragraph style={{ color : 'black'}}>{council.Description}</Paragraph> */}
      </Card.Content>
    </Card>
    <DividerLine/>
    </View>
  );
}

//onPress={() => navigation.navigate('Table', { council: council.id })}

const styles = StyleSheet.create({
  view:{
    justifyContent: 'center',
    alignItems : 'center'
  },
  card: {
    flex: 1,
    marginRight: 2,
    height: '80%',
    borderRadius : 20,
    width: Dimensions.get('window').width - 25, 
    backgroundColor : '#f5d8a0',
    
  },
});