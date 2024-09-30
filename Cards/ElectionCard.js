import React, { useEffect, useState } from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Dimensions, Alert, View } from 'react-native';

export default function ElectionCard({  election, navigation }) {

  return (
    <Card style={styles.card} onPress={{}}>
      <Card.Content>
        <Title style={{ color : 'black', fontWeight : '700'}}>{election.Name}</Title>
        <Paragraph style={{ color : 'black'}}>Status: {election.status}</Paragraph>
        <Paragraph style={{ color : 'black' , fontWeight : '500' }}>Start Date</Paragraph>
        <Paragraph style={{ color : 'black'}}>{election.StartDate}</Paragraph>
        <View style={{marginTop: 0}}>
        <Paragraph style={{ color : 'black' , fontWeight : '500'}}>End Date</Paragraph>
        <Paragraph style={{ color : 'black'}}>{election.EndDate}</Paragraph>
        <Paragraph style={{ color : 'black', textAlign: 'center', top : 5}}>Click to manage Election!</Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
}

//onPress={() => navigation.navigate('Table', { council: council.id })}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginRight: 2,
    height: '80%',
    borderRadius : 35,
    width: Dimensions.get('window').width - 25, 
    backgroundColor : '#eab676'
  },
});