import React from 'react';
import { Image, SafeAreaView, StyleSheet, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../Background/WavyBackground';

export default function ResidentScreen () {
  const { width } = useWindowDimensions(); // screen width

  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
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
  footerContainer: {
    position: 'absolute',
    bottom: 0, 
    width: '100%',
    alignItems: 'center',
  },
  footer: {
    height: 100,
  },
});
