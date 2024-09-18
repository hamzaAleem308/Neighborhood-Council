import React, { useEffect, useState } from 'react';
import { FlatList, Alert, Image, SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
import { FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CouncilCard from '../Cards/CouncilCard';

export default function Announcemnet({ }) {
  const { width } = useWindowDimensions();
  const [councilData, setCouncilData] = useState([]);
  const { memberID } = route.params;
  const [memberId, setMemberId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      if (userData && userData.memberId) {
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



  const renderCouncilCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <CouncilCard council={item} navigation={navigation} member={memberId} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Announcements</Text>
      </View>

      <View style={styles.contentContainer}>
        <FlatList
          data={councilData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCouncilCard}
          contentContainerStyle={styles.listContent}
        />
      </View>

      <FAB
        icon="plus"
        style={styles.fab}
        color="#000"
        onPress={() => navigation.navigate('AddAnnouncement', { memberID: memberId })}
      />
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
    backgroundColor: '#FFFFFF',
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
  footer: {
    position: 'absolute',
    bottom: 0,
    zIndex: -1,
  },
});
