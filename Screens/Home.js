// import React, { useEffect, useState } from 'react';
// import { FlatList, Alert, Image, SafeAreaView, StyleSheet, Text, useWindowDimensions, View,} from 'react-native';
// import WavyBackground from '../Background/WavyBackground';
// import { Button, FAB } from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { StackRouter, useNavigation } from '@react-navigation/native';
// import CouncilCard from '../Cards/CouncilCard';

// export default function HomeScreen ({ navigation }) {
//   const { width } = useWindowDimensions(); // screen width
//   const [councilData, setCouncilData] = useState([]);

//   useEffect(()=>{
//     const GetCouncils = async () => {
//       try {
//         const response = await fetch(`${baseURL}Council/getCouncils`);
//         if (response.ok) {
//           const json = await response.json();
//           setCouncilData(json);
//         } else {
//           const errorText = await response.text();
//           console.error('Failed to load Data:', errorText);
//           Alert.alert('Error', 'Failed to Data');
//         }
//       } catch (error) {
//         console.error('Error loading Data:', error);
//         Alert.alert('Error', 'An error occurred while loading Data');
//       }
//     };
//      GetCouncils;
//   } , []);


//   const handlePress = async () => {
//     try {
//       await AsyncStorage.removeItem('userToken');
//       console.log('Token removed successfully');
//       navigation.replace('Login'); // Only navigate if the token is successfully removed
//     } catch (error) {
//       console.error('Error removing token:', error);
//       Alert.alert('Error', 'Failed to log out. Please try again.');
//     }
//   };
  
//   const renderCouncilCard = ({ item }) => (
//     <View style={styles.cardContainer}>
//       <CouncilCard council={item} navigation={navigation} />
//     </View>
//   );
  
//   return (
//     <SafeAreaView style={styles.container}>
//       <WavyBackground />
//     <Text style={styles.text} >Neighborhood</Text>
//     <Text style={styles.text} >Council</Text>
//     <View style={styles.container}>
//     <FlatList
//         data={councilData}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderCouncilCard}
//         contentContainerStyle={styles.listContent}
//       />
//       </View>
//       <FAB icon={'plus'} style={styles.fab} color='#fff' backgroundColor='#F0C38E'  />
//       <View style={styles.footerContainer}>
//         <Image
//           source={require('../Assets/Footer.png')}
//           style={[styles.footer, { width: width }]} // image width to screen width
//           resizeMode="contain" // Maintain aspect ratio
//         />
//       </View>
//     </SafeAreaView>
//   );
// };



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff', // Adjust the background color if needed
//   },
//   cardContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     margin: 8,
//   },
//   listContent: {
//     paddingBottom: 60, // Adjust if you want padding for the footer
//     paddingTop: 160, // Adjust based on wavy background height
//   },
//   text:{
//     fontFamily : 'KronaOne-Regular', 
//     fontSize : 30, 
//     textAlign : 'left', 
//     left: 5, 
//     top: 30, 
//     color: 'black'
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF', // Set the background color to white
//   },
//   footerContainer: {
//     position: 'absolute',
//     bottom: 0, 
//     width: useWindowDimensions,
//     alignItems: 'center',
//     zIndex : -1
//   },
//   footer: {
//     height: 100,
//     zIndex : -1
//   },
//   fab:{
//     position: 'absolute',
//     margin: 'auto',
//     right: 20,
//     bottom: 100,
//     borderRadius : 50,
//   },
//   button : {
  
//     margin: 'auto',
//     left: 20,
//   }
// });
import React, { useEffect, useState } from 'react';
import { FlatList, Alert, Image, SafeAreaView, StyleSheet, Text, useWindowDimensions, View, Button } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
import { FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CouncilCard from '../Cards/CouncilCard';
import JoinCouncil from './JoinCouncilScreen';
  
export default function HomeScreen({ route, navigation }) {
  const { width } = useWindowDimensions(); // screen width
  const [councilData, setCouncilData] = useState([]);
  const { memberID } = route.params;
  const [memberId, setMemberId] = useState(null);
  const [name , setName] = useState('');
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      if (userData && userData.memberId && userData.fullName) {
        setMemberId(userData.memberId);
        setName(userData.fullName)
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
  

  useEffect(() => {
    const GetCouncils = async () => {
      try {
        const response = await fetch(`${baseURL}Council/GetCouncils?memberId=${memberID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const json = await response.json();
          console.log('Councils Loaded')
          setCouncilData(json);
        } else if(response.status === 400){
          const errorText = await response.text();
          console.log('No Councils found'+errorText);
          Alert.alert('No Councils found');
        }
        else{
          const errorText = await response.text();
          console.error('Failed to load Data:', errorText);
          Alert.alert('Error', 'Failed to load Data'+ response.status);  
        }
      } catch (error) {
        console.error('Error loading Data:', error);
        Alert.alert('Error', 'An error occurred while loading Data');
      }
    };
    GetCouncils(); // Call the function
  }, []);


  const handlePress = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      console.log('Token removed successfully');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error removing token:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const renderCouncilCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <CouncilCard council={item} navigation={navigation} />
    </View>
  );
 


  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData && userData.memberId) {
        setMemberId(userData.memberId);
      }
    };

    fetchUserData();
  }, []);
  
  
  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
      <Text style={styles.text}>Neighborhood</Text>
      <Text style={styles.text}>Council</Text>
      <Text style={styles.text}>Id : {memberId} </Text>
      <View style={styles.contentContainer}>
        <FlatList
          data={councilData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCouncilCard}
          contentContainerStyle={styles.listContent}
        />
      </View>
      <Button title='Logout' onPress={handlePress}></Button>
      <FAB
        icon="plus"
        style={styles.fab}
        color="#fff"
        onPress={()=>(navigation.navigate('JoinCouncil', {memberID : memberId}))}
      />
      <View style={styles.footerContainer}>
        <Image
          source={require('../Assets/Footer.png')}
          style={[styles.footer, { width: width }]}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    bottom: 100,
    top : 10,    
    zIndex : -1
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
  },
  listContent: {
    paddingBottom: 60, 
    paddingTop: 160, 
  },
  text: {
    fontFamily: 'KronaOne-Regular',
    fontSize: 30,
    textAlign: 'left',
    left: 5,
    top: 30,
    color: 'black',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    zIndex: -1,
  },
  footer: {
    height: 100,
    zIndex: -1,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    borderRadius: 50,
    backgroundColor: '#F0C38E',
  },
});
