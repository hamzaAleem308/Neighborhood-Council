import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../../Background/WavyBackground';
import WavyBackground2 from '../../Background/WavyBackground2';
import { Button } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import baseURL  from '../Api';


export default function AddProject({ route, navigation }) {
  const { width } = useWindowDimensions(); // screen width
  const { councilId, memberID, problemId} = route.params;
  const [title, setTitle]= useState('');
  const [desc,  setDesc] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false)
  const priorityList = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ]
  const [priority, setPriority] = useState('');

  async function CreateCouncil() {
    if (!title || !desc || !budget || !priority) {
        Alert.alert('Please fill all the fields.');
        return;
    }
    
    const post = {
        title: title,
        description: desc,
        budget: budget,
        Priority: priority,
        problem_id: problemId? problemId : 0
    };
    setLoading(true)
    console.log(post)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
        const response = await fetch(`${baseURL}Project/AddProject?memberId=${memberID}&councilId=${councilId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post), 
        });
        if (response.ok) {
        //console.log(JSON.stringify(json));
            Alert.alert('Project Started successfully!', '', 
              [{ text: 'OK', onPress: () => navigation.navigate('Project', { memberID: memberID, councilId: councilId })}]);
        } else {
            Alert.alert('Failed to create post.'+response.status);
            console.log('Failed to create post.'+response.status)
        }
    } catch (error) {
        Alert.alert('An error occurred while creating the post.');
        console.log(error)
    }
    setLoading(false)
}


  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground2 />
      
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Start Project</Text>
        <View style={styles.logoContainer}>
        <View style={styles.logo}>
            <Image source={require('../../assets/project.png')} style={styles.image}></Image>
          </View>
        </View>
        <TextInput style={styles.input} placeholder="Title " keyboardType="default" onChangeText={setTitle} placeholderTextColor="#000" />
        <TextInput style={styles.description} placeholder="Description" multiline={true}
        numberOfLines={5} 
        selectionColor={'#f5d8a0'}
        textAlignVertical="top" 
        keyboardType="default"onChangeText={setDesc} placeholderTextColor="#000" />
        <View style={{flexDirection: 'row'}}>
        <TextInput style={styles.input2} placeholder="Set Budget" keyboardType="numeric" onChangeText={setBudget} placeholderTextColor="#000" />
        <Dropdown
          data={priorityList}
          style={styles.dropDown}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder='Set Priority'
          value={priority}
          onChange={item => {
          setPriority(item.value);
          }}
          renderItem={(item) => (
            <Text style={{ color: 'black' }}>{item.label}</Text>
          )}
          selectedTextStyle={{ color: 'black' }} // Ensures the selected text is black
          placeholderStyle={{ color: 'black' }} // Ensures the placeholder text is black
         />
         </View>
        <TouchableOpacity style={styles.signInButton} onPress={CreateCouncil}>
         {loading?(
            <ActivityIndicator size={'small'} color={'black'} />
          ):(
            <Text style={styles.signInButtonText}>Create</Text>
          ) }
        </TouchableOpacity>
      </View>
      <Image
        source={require('../../assets/Footer.png')}
        style={[styles.footer, { width: width }]}
        resizeMode="stretch"
      />
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
    marginBottom: 30,
  },
  image : {
    height : 100,
    width : 100
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 25,
    backgroundColor: '#F0C38E',
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
  dropDown :{
    width: '42%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    marginBottom: 10,
    placeholderTextColor : 'black',
    fontSize: 5
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
  input2: {
    width: '42%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    marginBottom: 10,
    color: 'black',
    marginRight: 5
  },
  description: {
    width: '85%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    marginBottom: 10,
    color: 'black',
    height: 150,
    paddingBottom : 20,
    textAlignVertical: 'top',
    },
  signInButton: {
    width: '85%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F0C38E',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    zIndex: -1,
  },
});

