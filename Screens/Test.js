import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CreateGameScreen = () => {
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.profileImage} />
        <Text style={styles.profileName}>Jane Cooper</Text>
      </View>

      {/* Game Creation Section */}
      <View style={styles.gameCreationContainer}>
        <Text style={styles.header}>Create Game</Text>

        {/* Number of Players */}
        <Text style={styles.subHeader}>Number of Players</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton}><Text>2P</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text>3P</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text>4P</Text></TouchableOpacity>
        </View>

        {/* Time */}
        <Text style={styles.subHeader}>Time</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton}><Text>60s</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text>75s</Text></TouchableOpacity>
        </View>

        {/* Create Button */}
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>

      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#D8F2FC',
    borderRadius: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileName: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameCreationContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    marginVertical: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#F2F2F2',
    padding: 10,
    borderRadius: 5,
  },
  createButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#000000',
    borderRadius: 15,
    padding: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default CreateGameScreen;
