import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
const screenWidth = Dimensions.get('window').width;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResidentScreen ({ route, navigation }) {
  const { width } = useWindowDimensions(); // screen width
  const {Council, councilName, councilDescription} = route.params;
  
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
  const [announcementsData, setAnnouncementsData] = useState([])
  const [menuVisible, setMenuVisible] = useState(false);
  const [isElectionActive, setIsElectionActive] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const [menuVisible2, setMenuVisible2] = useState(false);

  const openMenu2 = () => setMenuVisible2(true);
  const closeMenu2 = () => setMenuVisible2(false);
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

  
  const getAnnouncementsForResidents = async () => {
    try {
      const response = await fetch(
        `${baseURL}Announcement/getAnnouncementsForCouncil?councilId=${Council}`
      );
      if (response.ok) {
        const data = await response.json(); 
  
        if (data && data.length > 0) {
          
          const annData = data.map((ann) => ({
            AnnouncementId: ann.AnnouncementId,
            Title: ann.Title,
            Description: ann.Description,
            Date: ann.Date,
            MemberName: ann.AddedBy, 
            RoleName: ann.RoleName, 
          }));
          setAnnouncementsData(annData);
          console.log("Announcements Loaded", annData);
        } else {
          console.log("No Announcements Found");
          setAnnouncementsData([]); 
        }
      } else {
        console.log("Failed to fetch announcements, Status:", response.status);
      }
    } catch (error) {
      console.error("Error Fetching Announcements: ", error);
    }
  };
  
  const fetchElection = async () => {
    try {
      const response = await fetch(`${baseURL}election/getelectionforvotes?councilId=${Council}`);
      const data = await response.json();
      if (response.ok) {
        setIsElectionActive(data.Status === 'Active');
        console.log("Election Status: " + data.Status)
      } else {
        console.log("Election Status: " + data.Status)
        setIsElectionActive(false)
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load candidates.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchElection()
    getAnnouncementsForResidents()
  }, [memberId, Council]);

  return (
    <SafeAreaView style={styles.container}>
    <WavyBackground />

    {/* Header */}
    <View style={styles.headerContainer}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <Text style={styles.nameText}>{fullName}</Text>

      {/* Icons */}
      <View style={styles.iconContainer}>
      
        <TouchableOpacity onPress={openMenu2}>
          <Image source={require('../assets/notification.png')} style={styles.icon} />
        </TouchableOpacity>
        <Modal
        visible={menuVisible2}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu2}
      >
        {/*Modal for Bell Icon to show Announcements */}
        <TouchableOpacity style={styles.modalOverlay}>
        <View style={styles.menuContainer}>
          {/* Modal Header with Close Button */}
          <View style={styles.headerContainer2}>
            <Text style={styles.headerText}>Announcements</Text>
            <TouchableOpacity onPress={closeMenu2} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          {/* Modal Content */}
          <View style={styles.modalContent}>
            {/* FlatList for Announcements */}
            <FlatList
              data={announcementsData}
              keyExtractor={(item) => item.AnnouncementId.toString()}
              renderItem={({ item }) => (
                <View style={styles.announcementCard}>
                  <Text style={styles.title}>{item.Title}</Text>
                  <Text style={styles.description}>{item.Description}</Text>
                  <Text style={styles.metaData}>
                    ⁓ {item.MemberName} ({item.RoleName}) | Date: {new Date(item.Date).toDateString()}
                  </Text>
                </View>
              )}
              ListEmptyComponent={<Text style={{color : 'black'}}>No Announcements Found!</Text>}
            />
          </View>
        </View>
      </TouchableOpacity>
      </Modal>

        <TouchableOpacity onPress={openMenu}>
        <Image source={require('../assets/info.png')} style={styles.icon} />
      </TouchableOpacity>

      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableOpacity style={styles.modalOverlay} >
          <View style={styles.menuContainer}>
            {/* Modal Header with Close Button */}
            <View style={styles.headerContainer2}>
              <Text style={styles.headerText}>Information</Text>
              <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>

            {/* Modal Content */}
            <View style={styles.modalContent}>
            <Text style={{color:'black', fontWeight:'600'}}>Council Name</Text>  
            <Text style={{color:'black'}}>{councilName}</Text>
            <Text style={{color:'black', fontWeight:'600', marginTop: 20}}>Description</Text>  
            <Text style={{color:'black', textAlign : 'left'}}>{councilDescription}</Text>
            <Text style={{color:'black', fontWeight:'600', marginTop: 20}}>About the App:</Text>  
            <Text style={{color:'black', textAlign : 'left'}}>
              The app facilitates community involvement by allowing residents to report issues, form committees, and participate in democratic processes, promoting collaborative problem-solving and local governance.
            </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
        <TouchableOpacity>
          <Image source={require('../assets/message.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>

    {/* Buttons */}
        <View style={styles.buttonsContainer}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => {navigation.navigate('ReportProblem', { councilId: Council })}}
      >
        <Image source={require('../assets/ReportProblem.png')} style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Report Issue</Text>
      </TouchableOpacity>

      {isElectionActive ? (     
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {navigation.navigate('VotingScreen', { councilId: Council })}}
        >
          <Image source={require('../assets/votepng.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Vote Now!</Text>
        </TouchableOpacity>
      ) : (
        <View 
          style={styles.button2} 
          onPress={() => {}}
        >
          <Image source={require('../assets/votepng.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Vote Now!</Text>
        </View>
      )}

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => {navigation.navigate('ProjectsScreen', { councilId: Council })}}
      >
        <Image source={require('../assets/projects.png')} style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Projects</Text>
      </TouchableOpacity>
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
  backgroundColor: '#fff',
},
headerContainer: {
  alignItems: 'center',
  marginTop: 50,
},
welcomeText: {
  fontFamily: 'KronaOne-Regular',
  fontSize: 24,
  fontWeight: 'bold',
  color: 'black',
},
nameText: {
  fontSize: 20,
  top : 5,
  fontWeight: '600',
  color: 'black',
},
iconContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 30,
  width: screenWidth * 0.8,
},
icon: {
  width: 50,
  height: 50,
  borderRadius: 75,
  backgroundColor: '#fff',
},
buttonsContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
button: {
  width: screenWidth * 0.7, 
  backgroundColor: '#eab676',
  borderRadius: 15,
  paddingVertical: 15,
  paddingHorizontal: 20,
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 13,
},
button2: {
  width: screenWidth * 0.7, 
  backgroundColor: 'gray',
  borderRadius: 15,
  paddingVertical: 15,
  paddingHorizontal: 20,
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 13,
},
buttonIcon: {
  width: 50,
  height: 50,
  marginRight: 20,
},
buttonText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: 'black',
},
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
  menuContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  headerContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0C38E', 
    padding: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  modalContent: {
    padding: 10,
    alignItems: 'center',
    paddingBottom : 30
  },
  announcementCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  metaData: {
    fontSize: 12,
    color: '#888',
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
