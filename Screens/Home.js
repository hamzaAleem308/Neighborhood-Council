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
//           source={require('../assets/Footer.png')}
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
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Alert, Image, SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
import { FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CouncilCard from '../Cards/CouncilCard';
import { useFocusEffect } from '@react-navigation/native';
import WavyBackground2 from '../Background/WavyBackground2';

export default function HomeScreen({ route, navigation }) {
  const { width } = useWindowDimensions();
  const [councilData, setCouncilData] = useState([]);
  const { memberID } = route.params;
  const [memberId, setMemberId] = useState(null);
  const [open, setOpen] = useState(false);

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

  // useEffect(() => {
  //   GetCouncils();
  // }, []);

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
        setCouncilData(json);
      } else if( response.status == 204) {
        Alert.alert('No Councils Found')
      }
      else{
        Alert.alert('Error', 'Failed to load Data');
      }
    } catch (error) {
      console.error('An error occurred while loading Data')
      //Alert.alert('Error', '');
    }
  };

  useFocusEffect(
    useCallback(() => {
      GetCouncils();
    }, []) 
  );

  const handlePress = () => {
    Alert.alert(
      'Are you sure?',
      'Do you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userToken');
              navigation.replace('Login');
            } catch (error) {
              Alert.alert('Error', 'Failed to log out.');
            }
          },
        },
      ]
    );
  };

  const renderCouncilCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <CouncilCard council={item} navigation={navigation} member={memberId} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground2 />

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Neighborhood</Text>
        <Text style={styles.headerText}>Council</Text>
      </View>

      <View style={styles.contentContainer}>
        <FlatList
          data={councilData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCouncilCard}
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{ textAlign: 'center', color: 'black', fontSize: 20 }}>
                No Councils Added, try joining them with the plus icon
              </Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
        />
      </View>
      {/* <FAB.Group
            open={open}
            style={styles.fab}
            icon={open ? 'close' : 'plus'} // Switch between plus and close icon
            actions={[
              {
                icon: 'Pencil',
                label: 'Create Council!',
                onPress: () => navigation.navigate('JoinCouncil', { memberID: memberId }),
              },]}/> */}

      <FAB
        icon="plus"
        style={styles.fab}
        color="#000"
        onPress={() => navigation.navigate('JoinCouncil', { memberID: memberId })}
      />
      <FAB
        icon="logout-variant"
        style={styles.fab1}
        color="#000"
        onPress={handlePress}
      />
      <FAB
        icon="account"
        style={styles.fab2}
        color="#000"
        onPress={() => navigation.navigate('ProfileScreen')}
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
    fontSize: 30,
    color: '#000',
    marginBottom: 5,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 0,
    paddingBottom: 150,
  },
  listContent: {
    marginTop: 50,
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
