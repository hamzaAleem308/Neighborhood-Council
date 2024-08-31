import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Dimensions } from 'react-native';

export default function CouncilCard({ council, navigation }) {
  return (
    <Card style={styles.card} onPress={() => console.log('Pressedd')} >
      <Card.Content>
        <Title>{council.Name}</Title>
        <Paragraph>Click to view Details</Paragraph>
      </Card.Content>
    </Card>
  );
}
//onPress={() => navigation.navigate('Table', { council: council.id })}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginRight: 8,
    width: Dimensions.get('window').width - 70, 
    backgroundColor : '#594116',
  
  },
});