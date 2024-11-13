import React, { useState } from 'react';
import { Alert, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../../Background/WavyBackground';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ReportProblem () {
  const { width } = useWindowDimensions(); // screen width
  const [pending, setPending] = useState(0);
  const [open, setOpen] = useState(0);
  const [total, setTotal] = useState(0);
  const [closed, setClosed] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false)
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const [preference, setPreference] = useState(null)
  const navigation = useNavigation()

const handlePress = () =>{
  if(preference == null){
    Alert.alert('Select Preference!')
    return;
  }
  navigation.navigate('SelectCategory', {preference: preference})
}
  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
      {/* Complaints Diary Title */}
      <Text style={[styles.header, {top: 100} ]}>Report your Problem!</Text>
      <View style={{marginTop:200}}>
      <Text style={styles.header}>COMPLAINTS DIARY</Text>
      {/* Total Complaints */}
      <View style={styles.statsContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.label}>TOTAL COMPLAINTS</Text>
          <Text style={styles.number}>{total}</Text>
        </View>
      </View>

      {/* Open, Closed, Pending Complaints */}
      <View style={styles.statusRow}>
        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>OPEN</Text>
          <Text style={styles.statusNumber}>{open}</Text>
        </View>
        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>CLOSED</Text>
          <Text style={styles.statusNumber}>{closed}</Text>
        </View>
        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>PENDING</Text>
          <Text style={styles.statusNumber}>{pending}</Text>
        </View>
      </View>
      </View>
      <FAB
        icon="plus"
        style={styles.fab}
        color="#000"
        onPress={openMenu}
      />
         <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closeMenu}>
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
            <View style={{marginBottom: 10, justifyContent:'center', flexDirection: 'column' }} >
          <TouchableOpacity onPress={() => setPreference('Personal')}>
            <Text style={{color: 'black'}}>{preference === 'Personal' ? '●' : '○'}  Personal Grievance   </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPreference('Social')} style={{ marginLeft: 20 }}>
            <Text style={{color: 'black', textAlign : 'center', fontWeight: '550'}}>{preference === 'Social' ? '●' : '○'}  Complaint as Social Responsbilty</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.signInButton} onPress={handlePress} >
        <Text style={styles.signInButtonText}>Ok</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={closeMenu} style={styles.signInButton}>
                <Text style={styles.signInButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    backgroundColor: '#F0C38E',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0, 
    width: '100%',
    alignItems: 'center',
    zIndex : -1
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'black',
  },
  statsContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  totalContainer: {
    backgroundColor: '#fce4b0',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
  },
  statusBox: {
    backgroundColor: '#fce4b0',
    padding: 20,
    borderRadius: 10,
    width: '27%',
    alignItems: 'flex-end',
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  statusNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
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
      padding: 20,
      alignItems: 'center',
    },
    signInButton: {
      width: '80%',
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
