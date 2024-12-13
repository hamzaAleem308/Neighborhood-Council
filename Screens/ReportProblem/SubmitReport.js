import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../../Background/WavyBackground';
import { Dropdown } from 'react-native-element-dropdown';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import baseURL from '../Api'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SubmitReport({ route, navigation }) {
  const { width } = useWindowDimensions(); // screen width
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const { preference, councilId } = route.params;
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [visualEvidence, setVisualEvidence] = useState(null); // For image
  const [selectedImage, setSelectedImage] = useState({})
  const [memberId, setMemberId] = useState(0)

  const categoryList = [
    { label: 'Construction', value: 'Construction' },
    { label: 'Sanitation', value: 'Sanitation' },
    { label: 'House Conflict', value: 'House Conflict' },
    { label: 'Neighboring Matters', value: 'Neighboring Matters' },
    { label: 'Other', value: 'Other' },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        if (userData && userData.memberId) {
          setMemberId(userData.memberId);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.7,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.error('Image Picker Error:', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setVisualEvidence(response.assets[0].uri);
          setSelectedImage(response.assets[0])
          console.log(visualEvidence) 
        }
      }
    );
  };

  const reportProblem = async () => {
    if (!title || !desc || !category || !visualEvidence) {
      Alert.alert('Error', 'All fields, including an image, are required.');
      return;
    }

    const formData = new FormData();
  formData.append('title', title);
  formData.append('description', desc);
  formData.append('problemType', preference);
  formData.append('category', category);
  formData.append('memberId', memberId);
  formData.append('councilId', councilId);

  if (visualEvidence) {
    formData.append('file', {
      uri: selectedImage.uri,
      type: selectedImage.type, // Adjust based on file type
      name: selectedImage.fileName,
    });
  }
  setLoading(true)
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const response = await fetch(`${baseURL}ReportProblem/ReportProblem`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const result = await response.json();
    if (response.ok) {
      Alert.alert('Success', result.Message);
      navigation.replace('ReportProblem', {councilId : councilId})
    } else {
      Alert.alert('Error', result.Message);
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'An unexpected error occurred.');
  }
  setLoading(false)
};
  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
      <View style={styles.contentContainer}>
        <Text style={styles.header}>Report your Problem</Text>
        <TextInput
          style={styles.input}
          selectionColor={'#f5d8a0'}
          placeholder="Problem Title"
          keyboardType="default"
          onChangeText={setTitle}
          placeholderTextColor="#000"
        />
        <TextInput
          style={styles.description}
          placeholder="Problem Description"
          multiline={true}
          numberOfLines={5}
          selectionColor={'#f5d8a0'}
          textAlignVertical="top"
          keyboardType="default"
          onChangeText={setDesc}
          placeholderTextColor="#000"
        />
        <Dropdown
          data={categoryList}
          style={styles.dropDown}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder="Select Category"
          value={category}
          onChange={(item) => {
            setCategory(item.value);
          }}
          renderItem={(item) => <Text style={{ color: 'black' }}>{item.label}</Text>}
          selectedTextStyle={{ color: 'black' }} 
          placeholderStyle={{ color: 'black' }} 
        />
        {/* Image Upload Button */}
        <TouchableOpacity style={styles.signInButton} onPress={selectImage}>
          <Text style={styles.signInButtonText}>
            {visualEvidence ? 'Change Evidence' : 'Upload Evidence'}
          </Text>
        </TouchableOpacity>
        {visualEvidence && (
          <Image source={{ uri: visualEvidence }} style={styles.imagePreview} />
        )}
        <TouchableOpacity style={styles.signInButton} onPress={reportProblem}>
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={styles.signInButtonText}>Report!</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <Image
          source={require('../../assets/Footer.png')}
          style={[styles.footer, { width: width }]} // image width to screen width
          resizeMode="stretch" // Maintain aspect ratio
        />
      </View>
    </SafeAreaView>
  );
}

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
  header:{
    color : 'black', 
    marginBottom: 10, 
    fontSize: 30,
    bottom: 50,
    fontWeight: '400'
  },
  signInButton: {
    width: '85%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#f5d8a0',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  signInButtonText: {
    color: '#000',
    fontWeight: 'bold',
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
    paddingBottom : 20,
    textAlignVertical: 'top',
    },
  dropDown :{
    width: '85%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    marginBottom: 10,
    placeholderTextColor : 'black',
    fontSize: 5
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0, 
    width: '100%',
    alignItems: 'center',
  },
});
