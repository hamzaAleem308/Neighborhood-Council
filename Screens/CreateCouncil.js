import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
import { Button } from 'react-native-paper';

export default function CreateCouncil({ route, navigation }) {
  const { width } = useWindowDimensions(); // screen width
  const { Id } = route.params;
  const [name, setName]= useState('');
  const [desc,  setDesc] = useState('');

  async function CreateCouncil() {
    if (!name || !desc) {
        Alert.alert('Please add a Title and Description.');
        return;
    }
    
    const post = {
        Name: name,
        Description: desc,
        Date: new Date().toISOString(),
    };

    try {
        const response = await fetch(`${baseURL}Council/PostCouncils?memberId=${Id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post), // Stringify the object
        });

        const json = await response.json();
          
        if (response.ok) {
            console.log(JSON.stringify(json));
            Alert.alert('Council added successfully!', 'Now you will be redirected to Home.', 
              [{ text: 'OK', onPress: () => navigation.navigate('HomeScreen', { memberID: Id })}]);
            navigation.replace('HomeScreen');
        } else {
            Alert.alert('Failed to create post.'+response.status);
            console.log('Failed to create post.'+response.status)
        }
    } catch (error) {
        Alert.alert('An error occurred while creating the post.');
    }
}


  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
      
      <View style={styles.contentContainer}>
      <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Image source={require('../assets/group.png')} style={styles.image}></Image>
          </View>
        </View>
        <Text style={{}}>Photo ↺</Text>
        <Text style={styles.titleText}>Create Council</Text>
        {/* <Text style={styles.memberIdText}>Member ID: {Id}</Text> */}
        <TextInput style={styles.input} placeholder="Title " keyboardType="default" onChangeText={setName} placeholderTextColor="#000" />
        <TextInput style={styles.description} placeholder="Description" keyboardType="default"onChangeText={setDesc} placeholderTextColor="#000" />
        <Button icon={'camera'} style={{marginBottom: 10, width: '40%', color : 'black'}} mode='contained-tonal'  >Camera</Button>
        <TouchableOpacity style={styles.signInButton} onPress={CreateCouncil}>
          <Text style={styles.signInButtonText}>Create</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <Image source={require('../assets/Footer.png')} style={styles.footerImage}></Image>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Set the background color to white
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  image : {
    height : 150,
    width : 150
  },

  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    bottom : 70,
    color: 'black',
    margin: 10,
    fontSize: 30,
    textAlign: 'center',
  },
  memberIdText: {
    color: 'black',
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    marginBottom: 10,
    color: 'black',
  },
  description: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    marginBottom: 10,
    color: 'black',
    height: 150,
    paddingBottom : 110
    },
  signInButton: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F0C38E',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  footerImage: {
    width: '100%',
    resizeMode: 'contain',
  },
});

