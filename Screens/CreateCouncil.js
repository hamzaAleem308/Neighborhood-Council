import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
import { Button } from 'react-native-paper';
import WavyBackground2 from '../Background/WavyBackground2';

export default function CreateCouncil({ route, navigation }) {
  const { width } = useWindowDimensions(); // screen width
  const { Id } = route.params;
  const memberId = Id
  const [name, setName]= useState('');
  const [desc,  setDesc] = useState('');

  const generateJoinCode = (memberId) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = memberId.toString(); // Start with the councilId as part of the code
    for (let i = 0; i < 6; i++) { // Adjust the number of random characters as needed
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };
  
  let code = generateJoinCode(memberId);

  async function CreateCouncil() {
    if (!name || !desc) {
        Alert.alert('Please add a Title and Description.');
        return;
    }
    
    const post = {
        Name: name,
        Description: desc,
        Date: new Date().toISOString(),
        JoinCode : code
    };

    try {
        const response = await fetch(`${baseURL}Council/PostCouncils?memberId=${Id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });

        const json = await response.json();
          
        if (response.ok) {
            console.log(JSON.stringify(json));
            Alert.alert(`${name} added successfully!`, `Now you will be redirected to Home.`, 
              [{ text: 'OK', onPress: () => navigation.navigate('HomeScreen', { memberID: Id })}]);
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
      <WavyBackground2 />
      <View style={styles.contentContainer}>
      <Text style={styles.header}>Create a Council</Text>
        <View style={styles.logoContainer}>
        <View style={styles.logo}>
            <Image source={require('../assets/group.png')} style={styles.image}></Image>
          </View>
        </View>
        
        <TextInput style={styles.input} selectionColor={'#f5d8a0'} placeholder="Name " keyboardType="default" onChangeText={setName} placeholderTextColor="#000" />
        <TextInput style={styles.description} 
        placeholder="Description"  
        multiline={true}
        numberOfLines={5} 
        selectionColor={'#f5d8a0'}
        textAlignVertical="top" 
        keyboardType="default"
        onChangeText={setDesc} 
        placeholderTextColor="#000" />
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
  header:{
    color : 'black', 
    marginBottom: 10, 
    fontSize: 30,
    bottom: 40,
    fontWeight: '400'
  },
  image : {
    height : 100,
    width : 100
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 25,
    backgroundColor: '#f5d8a0',
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
    width: '85%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    marginBottom: 10,
    color: 'black',
  },
  description: {
    width: '85%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    marginBottom: 10,
    color: 'black',
    height: 150,
    paddingBottom : 110,
    textAlignVertical: 'top',
    },
  signInButton: {
    width: '85%',
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
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  footerImage: {
    width: '100%',
    resizeMode: 'stretch',
  },
});

