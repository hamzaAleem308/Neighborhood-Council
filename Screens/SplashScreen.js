import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
import { shadow, style} from 'react-native-paper';

export default function SplashScreen()  {
  const { width } = useWindowDimensions(); // screen width
  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
      <View style = {styles.textContainer} >
      <Text style={styles.header}>
         Neighborhood
        </Text>
        <Text  style={styles.header}>
         Council
        </Text>
        <Text  style={styles.tagline}>
         Join Hands, Solve Together, Thrive as One Community.
        </Text>
        </View>
      <View style={styles.footerContainer}>
        <Image
          source={require('../Assets/Footer.png')}
          style={[styles.footer, { width: width }]} //image width to screen width
          resizeMode="contain" // Maintain aspect ratio
        />
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  header : {
   fontSize : 43,
   color : '#493D18',
   justifyContent : 'center',
   alignItems : 'center',
  textShadowRadius : 20
  },

  tagline: {
    fontSize : 30,
    color : 'black',
    justifyContent : 'space-evenly',
    alignItems : 'center',
    marginTop : 90,
    marginLeft : 10,
    marginRight : 10, 
    textAlign : 'center',
  },
  textContainer : {
    flex : 1,
    alignItems : 'center',
   position : 'relative',
   justifyContent : 'center'
  },
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
