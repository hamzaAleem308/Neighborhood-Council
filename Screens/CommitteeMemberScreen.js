import React from 'react';
import { Image, SafeAreaView, StyleSheet, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
import Template from './BackgroundTemplate';

export default function CommitteeMemberScreen () {
  const { width } = useWindowDimensions(); // screen width

  return (
    <SafeAreaView>
     <Template/>
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
});
