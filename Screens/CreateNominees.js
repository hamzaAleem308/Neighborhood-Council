import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
import baseURL from './Api';
import { useFocusEffect } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import DividerLine from '../Background/LineDivider';

export default function CreateNominees ({route, navigation}) {
  const { width } = useWindowDimensions(); // screen width
    const [membersName, setMembersName] = useState([]);
    const [membersId, setMembersId] = useState({});
    const [panel, setPanel] = useState('');
    const [candidateId, setCandidateId] = useState('')
    const { councilId, electionId, electionName } = route.params;
    
//Nominating Candidates one by one
    const nominateCandidate = async() => {
      try{
        const response = await fetch(`${baseURL}Election/NominateCandidateForPanel`)
      }
      catch{

      }
    }

//Retriving Members Name associated with the council besides Admin and already panel members
    const getMembersName = async() => {
        try{
        const response = await fetch(`${baseURL}Council/GetCouncilMembers?councilId=${councilId}`)
        if (response.ok) {
          const data = await response.json();
          // Format data for the dropdown
          const formattedMembers = data.map((member) => ({
            label: member.MembersName, // Display name
            value: member.MembersId,   // Member id
          }));
          setMembersName(formattedMembers);
        } else {
          Alert.alert('No members found for this council');
        }  
        }
        catch (error){
            console.log('Failed to Load Data' + error);
        }
    }

    const renderItem = ({ item }) => (
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item}</Text>
        </View>
        </TouchableOpacity>
      );

      useEffect(()=>{
        getMembersName();
      },[councilId])

      // useFocusEffect(
      //   useCallback(() => {
      //   getMembersName();
      //   }, [councilId]) 
      // );

  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
      <View style={styles.cont}>
      <Text style={styles.titleText}>Create Nominations for the {electionName}</Text>
      <TextInput style={styles.input} placeholder="Enter Panel Name" keyboardType="phone-pad" onChangeText={setPanel} placeholderTextColor="#000" />
      {/* <FlatList
          data={membersName}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()} 
          ListEmptyComponent={<Text style={{color: 'black'}}>No members found</Text>}
        /> */}
        <View style={styles.setText}>
        <Text style={styles.candidateText}>Choose Candidate</Text>
       <Dropdown
        data={membersName}
        style={styles.dropDown}
        maxHeight={200}
        labelField="label"   
        valueField="value"   
        placeholder="Select a candidate"
        value={candidateId}
        onChange={(item) => {
          setCandidateId(item.value); // Store selected candidate ID
        }}
        renderItem={(item) => (
          <ScrollView>
            <Text style={{ color: 'black', fontSize: 17, padding: 15 }}>{item.label}</Text>
          </ScrollView>
        )}
      />
      </View>
        <TouchableOpacity style={styles.signInButton} onPress={{}}>
          <Text style={styles.signInButtonText}>Create Nomination</Text>
        </TouchableOpacity>
        <DividerLine style={styles.line}/>  
        </View>
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
    padding: 20,
    backgroundColor: '#fff',
  },
  cont:{
    marginTop: 100,
    justifyContent:'center',
    alignItems:'center',
    //flex: 1
  },
  line:{

  },
  setText:{
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  candidateText:{
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    padding: 10,
    fontSize: 15,
  },
  dropDown :{
    width: '40%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    marginBottom: 10,
    placeholderTextColor : 'black',
    fontSize: 5
  },
  signInButton: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#f5d8a0',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  titleText: {
    bottom : 50,
    color: 'black',
    margin: 10,
    fontSize: 30,
    textAlign: 'center',
  },
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    justifyContent:'center',
    alignItems:'center',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0, 
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  input: {
    width: '90%',
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#F8F9FA',
    marginBottom: 10,
    color : 'black',
  },
});
