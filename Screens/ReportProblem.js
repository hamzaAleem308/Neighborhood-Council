import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
import { FAB } from 'react-native-paper';

export default function ReportProblem () {
  const { width } = useWindowDimensions(); // screen width
  const [pending, setPending] = useState(0);
  const [open, setOpen] = useState(0);
  const [total, setTotal] = useState(0);
  const [closed, setClosed] = useState(0);
  
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
        onPress={{}}
      />
      <View style={styles.footerContainer}>
        <Image
          source={require('../assets/Footer.png')}
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
});
