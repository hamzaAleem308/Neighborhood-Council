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
  const [eDate, setEDate] = useState(new Date())
  const [sDate, setSDate] = useState(new Date())
  const [intervalTime, setIntervalTime] = useState(15000);
  const [electionStatus, setElectionStatus] = useState('')

  useEffect(() => {
    if (electionData.length > 0) {
      const activeElection = electionData.find((ele) => ele.Status === "Active");
      if (activeElection) {
        setElectionId(activeElection.ElectionId);
        setIsActive(true);
        fetchElectionData();
        console.log('Election is Active')
      } 
      const initiatedElection = electionData.find((ele) => ele.Status === 'Initiated')
      if(initiatedElection){
        console.log('Election is Initiated')
        setElectionId(initiatedElection.ElectionId)
        setElectionFound(true)
      }
    }else if( electionData == 0){
      console.log('No Election Found')
      setElectionFound(false)
      setIsActive(false)
    }
  }, [electionData, electionId, isActive]); // Runs only when `electionData` changes

  useEffect(() => {
    // Transform electionData to extract all panels
    const panels = electionData.flatMap((election) => election.Panels);
    setPanelData(panels);
  }, [electionData]);
  
 
  
  useEffect(() => {
    const interval = setInterval(() => {
      triggerElection();
    }, intervalTime);
  
    return () => clearInterval(interval);
  }, [intervalTime, sDate, eDate, councilID, electionId, electionStatus]); // Re-run the effect if `intervalTime` changes
  

//Retreiving elections data with nominations to start the elections
const getElectionAlongNominations = async () => {
  try {
    const response = await fetch(`${baseURL}election/GetElectionWithNomination?councilId=${councilID}`, {
      method: 'GET',
    });

    if (response.ok) {
      console.log('Loading Elections Data...');
      const data = await response.json();

      if (data && data.length > 0) {
        // Extract unique election data
        const uniqueElections = data.filter((value, index, self) =>
          index === self.findIndex((e) => e.ElectionId === value.ElectionId)
        );

        // Map elections with their panels and members
        const electionData = uniqueElections.map((ele) => ({
          ElectionId: ele.ElectionId,
          ElectionName: ele.ElectionName,
          Status: ele.Status,
          StartDate: ele.StartDate,
          EndDate: ele.EndDate,
          Panels: data
            .filter((panel) => panel.ElectionId === ele.ElectionId) // Filter panels for this election
            .map((panel) => ({
              PanelId: panel.PanelId,
              PanelName: panel.PanelName,
              CandidateId: panel.CandidateId,
              CandidateName: panel.MemberName,
              PanelMembers: panel.PanelMembers.map((pm) => ({
                MemberId: pm.MemberId,
                MemberName: pm.MemberName,
              })),
            })),
        }));
        if (electionData.length > 0) {
          const firstElection = electionData[0];
          const formattedStartDate = formatDate(firstElection.StartDate);
          const formattedEndDate = formatDate(firstElection.EndDate);
        
          setSDate(formattedStartDate);
          setEDate(formattedEndDate);
        
          console.log('Formatted Start Date:', formattedStartDate);
          console.log('Formatted End Date:', formattedEndDate);
        }
        if (electionData.length > 0) {
          const firstElection = electionData[0];
          setElectionStatus(firstElection.Status)
        }
        // const electionStartDate = uniqueElections.map((ele) => ({
        //   StartDate: ele.StartDate,
        // }));
        // setSDate(electionStartDate)

        // const electionEndDate = uniqueElections.map((ele) => ({
        //   EndDate: ele.EndDate,
        // }));
        // setEDate(electionEndDate)
        setElectionData(electionData);
        setElectionFound(false);
        console.log('Elections Data Loaded Successfully:', electionData);
      } else {
        setElectionFound(false);
        Alert.alert('No data found for this council');
      }
    } else {
      setElectionFound(false);
      Alert.alert('Failed to retrieve data');
      console.error('Response not OK:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    Alert.alert('Error fetching data');
  }
};

// const formatDate = (dateString) => {
//   const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//   return new Date(dateString).toISOString(undefined, options);
// };
const formatDate = (dateString) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  return formatter.format(new Date(dateString));
};


const triggerElection = () => {
  const currentDate = new Date().toISOString();
  const startDate = sDate;
  const endDate = eDate;
  const now = formatDate(currentDate);
  console.log("Start Date:", startDate);
  console.log("Current Date:", now);
  console.log("End Date:", endDate);
  console.log('Election Status: ' + electionStatus)
  
  // Check if the election should start
  if (now >= startDate && now < endDate) {
    if(electionStatus !== 'Active'){
    startElection();
    console.log("Election has started!");
  }
} 
  // Check if the election should end
  else if (now >= endDate) {
    closeElection();
    console.log("Election has ended!");
  } 
  // If neither condition is met
  else {
    console.log("Election not active.");
    return;
  }
  };

// Fetch election and votes data
const fetchElectionData = async () => {
  try {
    console.log('Fetching Active data...');
    const response = await fetch(`${baseURL}election/GetElectionWithVotes?councilId=${councilID}`);
    const data = await response.json();

    if (response.ok) {
      // Set election data using data directly from the response
      setActiveElectionData({
        electionId: data.ElectionId,
        electionName: data.ElectionName,
        status: data.Status,
        startDate: data.StartDate,
        endDate: data.EndDate
      });

      // Map through Candidates array and structure for UI display
      if (data.Candidates && data.Candidates.length > 0) {
        const candidatesData = data.Candidates.map((candidate) => ({
          candidateId: candidate.CandidateId,
          candidateName: candidate.CandidateName,
          voteCount: candidate.VoteCount,
        }));
        setIsActive(data.Status == 'Active')
        console.log('Election Status: ' + data.Status)
        setVotes(candidatesData);
        console.log('Candidates data set successfully');
      } else {
        console.log('No candidates data found');
      }

      // Set active status based on election status
      setIsActive(data.Status === "Active");
      setElectionFound(false)
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


// Start election
  const startElection = async () => {
    try {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 2000))
      const response = await fetch(`${baseURL}election/StartElection?electionId=${electionId}`, 
        { method: "POST" });
      if (response.ok) {
        
        setElectionFound(false)
        Alert.alert("Success", "Election started successfully");
        setElectionStatus('Active')
        fetchElectionData();
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
        console.log(data)
        Alert.alert("Success", `Election Closed successfully, \n${data.WinnerName} is the new ${data.Role} of this Council`) ;
        setElectionFound(false)
        setIsActive(false)
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
    <Text style={styles.electionStatus}>{item.Status}</Text>
  </View>
);


const renderItemForPanel = ({ item }) => (
  <View style={styles.card}>
  <View style={styles.panelContainer}>
    <Text style={styles.panelText}>Panel Name: {item.PanelName}</Text>
    <Text style={styles.panelText}>Candidate Name: {item.CandidateName}</Text>
    {item.PanelMembers.map((member) => (
      <Text key={member.MemberId} style={styles.memberText}>
        Member: {member.MemberName}
      </Text>
    ))}
    </View>
  </View>
);


// const renderItemforPanel = ({ item }) => (
//   <View style={styles.card}>
//     <View style={styles.panelContainer}>
//       <Text style={styles.panelLabel}>Panel:</Te xt>
//       <Text style={styles.panelName}>{item.PanelName || 'No Panel Assigned'}</Text>
//       <Text style={styles.memberLabel}>,   Candidate:</Text>
//       <Text style={styles.memberName}>{item.MemberName || 'No Member Assigned'}</Text>
//     </View>
//   </View>
// );

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
      renderItem={renderItemForPanel}
      keyExtractor={(item) => item.PanelId.toString()}
      contentContainerStyle={styles.cont3}
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
    ): isActive? (
       <View style={styles.cont}>
         <Text style={styles.titleText}>Close the Election</Text>
         <View style={styles.card1}>
      <Text style={styles.title}>{activeElectionData.electionName}</Text>
      <Text style={styles.statusText}>Status: {activeElectionData?.status || 'No Election Found'}</Text>
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
        ) : (
          <View style={styles.cont}>
            <View style={{textAlign : 'center'}}>
          <Text style={styles.titleText}>Elections</Text>
          <Text style={{color : 'black', fontSize : 20}}>Nothing to Show Here!</Text>
          <Text style={{color : 'black', fontSize : 20, marginBottom : 40}}>What can be the Reason?</Text>
          <Text style={{color : 'black', fontSize : 17}}>  • No Election is Started.</Text>
          <Text style={{color : 'black', fontSize : 17}}>  • No Nominations are Being Made.</Text>
          <Text style={{color : 'black', fontSize : 17}}>  • An Election would have been Closed.</Text>
          </View>
          </View>
        )} 

    {/* Check if an election is active */}
    {isActive ? (
        <TouchableOpacity style={styles.closeButton} onPress={closeElection}>
          {loading?(
            <ActivityIndicator size={'small'} color={'white'} />
          ):(
          <Text style={styles.buttonText}>Election Closes At {`\n`}{eDate}</Text>
          )}
          
        </TouchableOpacity>
    ): isElectionFound ? (
      <TouchableOpacity style={styles.startButton} onPress={startElection}>
          {loading?(
            <ActivityIndicator size={'small'} color={'black'} />
          ):(
          <Text style={styles.buttonText2}>Election Starts At {`\n`}{sDate}</Text>
          )}
        </TouchableOpacity>
    ) : (
      <Text></Text>
    )}

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
    marginBottom: 80,
    fontSize: 30,
    textAlign: 'center',
  },
  cont: {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom : 10
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
  buttonText2: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
 
  card1: {
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
  cont3: {
    marginTop: 50,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#FFFFFF', // White background for the card
    borderRadius: 12, // Rounded corners
    padding: 15, // Inner spacing
    marginVertical: 10, // Space between cards
    marginHorizontal: 10, // Space on the sides
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 4, // Shadow blur
    elevation: 3, // Shadow for Android
    bottom : 20
    
  },
  panelContainer: {
    borderColor: '#E0E0E0', // Light border
    borderWidth: 1, // Border thickness
    borderRadius: 10, // Rounded corners
    padding: 10, // Inner spacing
    backgroundColor: '#F9F9F9', // Light gray background for the panel
  },
  panelText: {
    fontSize: 16, // Slightly larger text
    fontWeight: '600', // Semi-bold for emphasis
    color: '#333', // Darker text for contrast
    marginBottom: 8, // Space below each line
  },
  memberText: {
    fontSize: 14, // Standard font size
    fontWeight: '400', // Regular font weight
    color: '#555', // Medium gray for member names
    marginLeft: 10, // Indent member names
    marginTop: 4, // Space above each member name
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
