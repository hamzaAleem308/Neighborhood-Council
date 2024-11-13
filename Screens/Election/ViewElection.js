import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../../Background/WavyBackground';
import WavyBackground2 from '../../Background/WavyBackground2';
import  baseURL  from '../Api';
import DividerLine from '../../Background/LineDivider';

export default function ViewElection ({ route , navigation}) {
  const { width } = useWindowDimensions(); // screen width
  const { councilID } = route.params;

  const [isElectionFound, setElectionFound] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [electionId, setElectionId] = useState(0);
  const [loading, setLoading] = useState(false)
  const [electionData, setElectionData] = useState([])
  const [activeElectionData, setActiveElectionData] = useState([])
  const [votes, setVotes] = useState([])
  const [panelData, setPanelData] = useState([])
  const [membersData, setMembersData] = useState([])

//Retreiving elections data with nominations to start the elections
const getElectionAlongNominations = async () => {
  try {
    const response = await fetch(`${baseURL}election/GetElectionWithNomination?councilId=${councilID}`, {
      method: 'GET',
    });

    if (response.ok) {
      console.log('Loading Elections Data');
      const data = await response.json(); 
      //setElectionFound(true)
      if (data && data.length > 0) {
        const uniqueElections = data.filter((value, index, self) =>
          index === self.findIndex((e) => e.ElectionId === value.ElectionId)
        );

        const electionData = uniqueElections.map((ele) => ({
          ElectionId: ele.ElectionId,
          ElectionName: ele.ElectionName,
          ElectionStatus: ele.Status,
        }));
        
        setElectionData(electionData);

        // const panelData = data.map((panel) => ({
        //   PanelId: panel.PanelId,
        //   PanelName: panel.PanelName,
        // }));
        // setPanelData(panelData);

        // const memberData = data.map((mem) => ({
        //   MemberId: mem.MemberId,
        //   MemberName: mem.MemberName,
        // }));
        // setMembersData(memberData);

        const panelData = data.map((panel) => ({
          PanelId: panel.PanelId,
          PanelName: panel.PanelName,
          MemberId: panel.MemberId,
          MemberName: panel.MemberName,
        }));
        setPanelData(panelData);

        console.log('Elections Data Loaded!');
      } else {
        setElectionFound(false)
        Alert.alert('No data found');
      }
    } else {
      setElectionFound(false)
      Alert.alert('Failed to retrieve data');
      console.error('Response not OK:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    Alert.alert('Error fetching data');
  }
 
};

// Fetch election and votes data
const fetchElectionData = async () => {
  try {
    console.log('Fetching Active data...');
    const response = await fetch(`${baseURL}election/GetElectionWithVotes?electionId=${electionId}`);
    const data = await response.json();

    if (response.ok) {
      // Set election data using data directly from the response
      setActiveElectionData({
        electionId: data.ElectionId,
        electionName: data.ElectionName,
        status: data.Status,
      });

      // Map through Candidates array and structure for UI display
      if (data.Candidates && data.Candidates.length > 0) {
        const candidatesData = data.Candidates.map((candidate) => ({
          candidateId: candidate.CandidateId,
          candidateName: candidate.CandidateName,
          voteCount: candidate.VoteCount,
        }));
        setVotes(candidatesData);
        console.log('Candidates data set successfully');
      } else {
        console.log('No candidates data found');
      }

      // Set active status based on election status
      setIsActive(data.Status === "Active");
      //setElectionFound(false)
      console.log('Election data fetched successfully!');
    } else {
      console.log("Error: Failed to load election data");
    }
  } catch (error) {
    console.error("Error fetching election data:", error);
  }
};

useEffect(() => {
  getElectionAlongNominations()
}, [councilID])


// useEffect(() => {
//   fetchElectionData()
// }, [electionId]);



useEffect(() => {
  if (electionData.length > 0) {
    const activeElection = electionData.find((ele) => ele.ElectionStatus === "Active");
    if (activeElection) {
      setElectionId(activeElection.ElectionId);
      setIsActive(true);
      fetchElectionData()
      console.log('Election is Active')
    } 
    const InitiatedElection = electionData.find((ele) => ele.ElectionStatus === 'Initiated')
    if(InitiatedElection){
      console.log('Election is Initiated')
      setElectionId(InitiatedElection.ElectionId)
      setElectionFound(true)
    }
  }else if( electionData == 0){
    console.log('No Election Found')
    setElectionFound(false)
    setIsActive(false)
  }
}, [electionData, electionId]); // Runs only when `electionData` changes


// Start election
  const startElection = async () => {
    try {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 2000))
      const response = await fetch(`${baseURL}election/StartElection?electionId=${electionId}`, 
        { method: "POST" });
      if (response.ok) {
        setIsActive(false);
        setElectionFound(false)
        Alert.alert("Success", "Election started successfully");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  };

  const closeElection = async() => {
    try {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 2000))
      const response = await fetch(`${baseURL}election/closeElection?electionId=${electionId}&councilId=${councilID}`, 
        { method: "POST" });
      if (response.ok) {
        const data = await response.json()
        Alert.alert("Success", "Election Closed successfully" + data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  };

const formatTime = (milliseconds) => {
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const seconds = Math.floor((milliseconds / 1000) % 60);
  return `${hours}h : ${minutes}m : ${seconds}s`;
};

const renderItemForElection = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.electionName}>{item.ElectionName}</Text>
    <Text style={styles.electionStatus}>{item.ElectionStatus}</Text>
  </View>
);


const renderItemforPanel = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.panelContainer}>
      <Text style={styles.panelLabel}>Panel:</Text>
      <Text style={styles.panelName}>{item.PanelName || 'No Panel Assigned'}</Text>
      <Text style={styles.memberLabel}>,   Candidate:</Text>
      <Text style={styles.memberName}>{item.MemberName || 'No Member Assigned'}</Text>
    </View>
  </View>
);

// const renderItemForMembers = ({ item }) => (
//   <TouchableOpacity style={styles.card}>
//     <View style={styles.memberContainer}>
//       <Text style={styles.memberLabel}>Member:</Text>
//       <Text style={styles.memberName}>{item.MemberName || 'No Member Assigned'}</Text>
//     </View>
//   </TouchableOpacity>
// );

  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground2 />
{/* Flag for Checking if nominations exists for election. */}
       {/* Check if nominations exist for election */}
    {isElectionFound ? (
      <View style={styles.cont}>
        <Text style={styles.titleText}>Start the Election</Text>
        <FlatList
          data={electionData}
          renderItem={renderItemForElection}
          keyExtractor={(item) => item.ElectionId.toString()}
          contentContainerStyle={styles.cont}
          ListEmptyComponent={() => (
            <Text style={{ color: 'black' }}>No Election Found</Text>
          )}
        />
          <FlatList
          data={panelData}
          renderItem={renderItemforPanel}
          keyExtractor={(item) => item.PanelId.toString()}
          contentContainerStyle={styles.cont2}
          ListEmptyComponent={() => (
            <Text style={{ color: 'black' }}>No Panel Found</Text>
          )}
        />
        {/* Uncomment if members data is needed */}
        {/* <FlatList
          data={membersData}
          renderItem={renderItemForMembers}
          keyExtractor={(item) => item.MemberId.toString()}
          contentContainerStyle={styles.container}
          ListEmptyComponent={() => (
            <Text style={{ color: 'black' }}>No Members Found</Text>
          )}
        /> */}
      </View>
    ):(
       <View style={styles.cont}>
         <Text style={styles.titleText}>Close the Election</Text>
         <View style={styles.card}>
      <Text style={styles.title}>{activeElectionData.electionName}</Text>
      <Text style={styles.statusText}>Status: {activeElectionData.status}</Text>
        </View>
      <FlatList
        data={votes}
        keyExtractor={(item) => item.candidateId.toString()}
        renderItem={({ item }) => (
          <View style={styles.voteContainer}>
            <Text style={styles.candidateText}>Candidate: {item.candidateName}</Text>
            <Text style={styles.voteText}>Votes: {item.voteCount}</Text>
          </View>
        )}
      />
    </View>
        )} 

    {/* Check if an election is active */}
    {isActive ? (
        <TouchableOpacity style={styles.closeButton} onPress={closeElection}>
          {loading?(
            <ActivityIndicator size={'small'} color={'black'} />
          ):(
          <Text style={styles.buttonText}>Close Election</Text>
          )}
          
        </TouchableOpacity>
    ):(
      <TouchableOpacity style={styles.startButton} onPress={startElection}>
          {loading?(
            <ActivityIndicator size={'small'} color={'black'} />
          ):(
          <Text style={styles.buttonText}>Start Election</Text>
          )}
        </TouchableOpacity>
    ) }

      <View style={styles.footerContainer}>
        <Image
          source={require('../../assets/Footer.png')}
          style={[styles.footer, { width: width }]} // image width to screen width
          resizeMode="stretch" // Maintain aspect ratio
        />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  titleText: {
    color: 'black',
    top : 50,
    marginBottom: 90,
    fontSize: 30,
    textAlign: 'center',
  },
  cont: {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom : 50
  },
  cont2: {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom : 10
  },
  signInButton: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#333',
    alignItems: 'center',
    marginTop: 120,
    bottom: 90
  },
  voteContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 8,
  },
  signInButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  startButton: {
    width: '60%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#f5d8a0',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom : 100
  },
  closeButton: {
    width: '60%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#333',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom : 100
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    //alignItems: 'center', // Center items horizontally within the card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  electionName: {
    marginTop : 20,
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center', // Center text within the card
  },
  electionStatus: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
    marginBottom: 12,
    textAlign: 'center', // Center text within the card
  },
  panelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
  },
  panelLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  panelName: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  memberLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  memberName: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  activeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop : 30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  statusText: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
  },
  voteContainer: {
    backgroundColor: '#f1f1f1',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginVertical: 8,
  },
  candidateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',

  },
  voteText: {
    fontSize: 16,
    color: '#333',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    zIndex : -1
  },
});
