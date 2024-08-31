import React, { useState } from 'react';
import { TouchableOpacity, TextInput, Image, SafeAreaView, StyleSheet, Text, useWindowDimensions, View, Alert } from 'react-native';
import WavyBackground from '../Background/WavyBackground';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import  baseURL  from './Api';

export default function SignUp () {
  const { width } = useWindowDimensions(); // screen width
  const[fname, setFname] = useState('');
  const[gender, setGender]= useState(null);
  const[phoneNo, setPhoneNo] = useState('');
  const[dob, setDob] = useState(new Date());
  const[province, setProvince] = useState('');
  const[city, setCity] = useState('');
  const[address, setAddress] = useState(''); 
  const[password , setPassword] = useState(''); 
  const[confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false); 
  const navigation = useNavigation();
  const cityList = [
    { label: 'Islamabad', value: 'Islamabad' },
    { label: 'Multan', value: 'Multan' },
    { label: 'Lahore', value: 'Lahore' },
    { label: 'Karachi', value: 'Karachi' },
    { label: 'Faisalabad', value: 'Faisalabad' },
  ];
  
  const provinceList = [
    { label: 'Punjab', value: 'Punjab'},
    { label: 'KPK', value: 'KPK'},
    { label: 'ICT', value: 'ICT'},
    {  label: 'Sindh', value: 'Islamabad'},
    {  label: 'Balochistan', value: 'Balochistan'},
    {  label: 'Gilgit Baltistan', value: 'Gilgit Baltistan'}, 
      ];
  const [data, setData] = useState();
      const saveMember = async () => {
        if (
          fname.trim() &&
          phoneNo.trim() &&
          province.trim() &&
          city.trim() &&
          address.trim() &&
          password.trim() &&
          confirmPassword.trim()
        ) {
          if (phoneNo.length !== 13) {
            Alert.alert('Invalid Phone Number', 'Phone number must be 13 characters long.');
          if (password !== confirmPassword) {
            Alert.alert('Passwords Do Not Match');
          } else {
            try {
              const response = await fetch(`${baseURL}Account/SignUp`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  PhoneNo: phoneNo,
                  Full_Name: fname,
                  Gender: gender,
                  DoB: dob,
                  Province: province,
                  City: city,
                  Address: address, // Added missing address field
                  Password: password,
                  User_Type: "Resident",
                  Date_joined: new Date().toISOString(), // Changed Date.now to ISO string
                  Council_id: "0",
                }),
              });
        
              if (response.ok) {
                console.log('Login Successfull')
                Alert.alert(
                  'Registered Successfully!',
                  'Now Login to Continue.',
                  [{ text: 'OK', onPress: () => navigation.navigate('Login') }] // Navigate after the alert is dismissed
                );
              } else {
                Alert.alert('Error', 'User already exists! Try Signing In.' );
                console.log('Response Status:', response.status); // Log status code
                console.log('Response Body:', await response.text()); // Log response body for debugging
              console.log(phoneNo, fname, gender, dob, city, province, address, password, confirmPassword )
              }
            } catch (error) {
              Alert.alert('Error', 'An error occurred');
              console.log('Error:', error); // Log error for debugging
            }
          }
        }
        } else {
          Alert.alert('Please Enter your Credentials!');
        }
      };
      
  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
      <ScrollView>

      <View style={styles.textContainer}>
        <Text style={styles.header}>Sign Up to Join Neighborhood</Text>
        <Text style={styles.header}>Council</Text>
        
        <TextInput style={styles.input} placeholder="Enter Full Name" keyboardType="default" onChangeText={setFname} placeholderTextColor="#000" />
        <Text style={styles.radioText }> Gender   </Text>
        <View style={{marginBottom: 10,justifyContent:'center', flexDirection: 'row' }} >
      <TouchableOpacity onPress={() => setGender('M')}>
        <Text style={{color: 'black'}}>Male   {gender === 'M' ? '●' : '○'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setGender('F')} style={{ marginLeft: 20 }}>
        <Text style={{color: 'black'}}>     Female   {gender === 'F' ? '●' : '○'} </Text>
      </TouchableOpacity>
    </View>
        <TextInput style={styles.input} placeholder="Phone No" keyboardType="phone-pad" onChangeText={setPhoneNo} placeholderTextColor="#000" />
        <TouchableOpacity style={styles.dobButton} onPress={() => setOpen(true)} >
          <Text style={styles.signUpButtonText} >Select Date of Birth</Text>
        </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={dob}
        mode="date"
        onConfirm={(dob) => {
          setOpen(false);
          setDob(dob);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Text style={{color:'black'}}>Date of Birth: {dob.toDateString()}</Text>
       <View style={{flexDirection:'row'}}>
        <Dropdown
          data={cityList}
          style={styles.dropDown}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder='City'
          value={city}
          onChange={item => {
          setCity(item.value);
          }}
          renderItem={(item) => (
            <Text style={{ color: 'black' }}>{item.label}</Text>
          )}
          selectedTextStyle={{ color: 'black' }} // Ensures the selected text is black
          placeholderStyle={{ color: 'black' }} // Ensures the placeholder text is black
         />
        <Dropdown
            data={provinceList}
            style={styles.dropDown}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder='Province'
            value={province}
            onChange={item => {
            setProvince(item.value);
            }}
            renderItem={(item) => (
              <ScrollView>
              <Text style={{ color: 'black' }}>{item.label}</Text>
              </ScrollView>
            )}
            selectedTextStyle={{ color: 'black' }} // Ensures the selected text is black
            placeholderStyle={{ color: 'black' }} // Ensures the placeholder text is black
          />
          </View>
        <TextInput style={styles.input} placeholder="Address" keyboardType="default" onChangeText={setAddress} placeholderTextColor="#000" />
        <TextInput style={styles.input} placeholder="Password" keyboardType="default" onChangeText={setPassword} placeholderTextColor="#000" />
        <TextInput style={styles.input} placeholder="Confirm Password" keyboardType="default" onChangeText={setConfirmPassword} placeholderTextColor="#000" />
        <TouchableOpacity style={styles.signUpButton} onPress={saveMember} >
          <Text style={styles.signUpButtonText} >Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.signInText}>
           Already have an account? <Text style={styles.signInLink} onPress={()=> navigation.navigate("Login")}>Sign In!</Text>
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      <View style={styles.footerContainer}>
       
      </View>
      <Image
          source={require('../Assets/Footer.png')}
          style={[styles.footer, { width: width }]} // image width to screen width
          resizeMode="contain" // Maintain aspect ratio
        />
  
    </SafeAreaView>
  
  );
};


const styles = StyleSheet.create({
    textContainer:{
     flex : 1,
     alignItems : 'center',
     position : 'relative',
     justifyContent : 'center'
    },
    input: {
      width: '80%',
      padding: 15,
      borderRadius: 25,
      backgroundColor: '#F8F9FA',
      marginBottom: 10,
      color : 'black',
      },
    header : {
        fontSize : 30,
        color : '#493D18',
        justifyContent : 'center',
        alignItems : 'center',
        fontWeight : '500',
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
  signUpButton: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F0C38E',
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  RadioButton : {
    justifyContent : 'center'
  },
  signInText: {
    color: '#A0A0A0',
  },
  signInLink: {
    color: '#F0C38E',
    fontWeight: 'bold',
  },
  radioText: {
    color : '#000',
    fontSize : 15,
    left : '20'
},
dropDown :{
  width: '40%',
  padding: 15,
  borderRadius: 25,
  backgroundColor: '#F8F9FA',
  marginBottom: 10,
  placeholderTextColor : 'black',
},
dobButton : {    width: '80%',
  padding: 15,
  borderRadius: 25,
  backgroundColor: '#F8F9FA',
  alignItems: 'center',
}
});
