// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
// import WavyBackground from '../../Background/WavyBackground';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import baseURL from '../Api';

// export default function ViewProblemProgress ({route}) {
//   const { width } = useWindowDimensions(); // screen width
//   const {problemId, councilId, problemStatus} = route.params;

//   const [memberId, setMemberId] = useState(0);

//   const [memberName, setMemberName] = useState('')
//   const [hierarchy, setHierarchy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch hierarchy on component load
//     const fetchHierarchy = async () => {
//       try {
//         const response = await axios.get(
//           `${baseURL}ReportProblem/GetProblemHierarchy?problemId=${problemId}`
//         );
//         const json = await response.json();
//         setHierarchy(json.Data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.Message || "An error occurred.");
//         setLoading(false);
//       }
//     };

//     fetchHierarchy();
//   }, [problemId]);

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userData = await getUserData();
//         if (userData && userData.memberId) {
//           setMemberId(userData.memberId);
//           setMemberName(userData.fullName)
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const getUserData = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('userData');
//       return jsonValue != null ? JSON.parse(jsonValue) : null;
//     } catch (error) {
//       console.error('Failed to fetch user data:', error);
//     }
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//         <Text style={styles.screenTitle}>Reported Problems{problemId}</Text>
//         <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Problem Details</Text>
//         <Text><Text style={styles.label}>Title:</Text> {hierarchy.Title}</Text>
//         <Text><Text style={styles.label}>Description:</Text> {hierarchy.Description}</Text>
//         <Text><Text style={styles.label}>Status:</Text> {hierarchy.Status}</Text>
//         <Text><Text style={styles.label}>Problem Type:</Text> {hierarchy.ProblemType}</Text>
//         <Text><Text style={styles.label}>Category:</Text> {hierarchy.Category}</Text>
//         <Text>
//           <Text style={styles.label}>Created At:</Text>{" "}
//           {new Date(hierarchy.CreatedAt).toLocaleString()}
//         </Text>
//         {hierarchy.VisualEvidence && (
//           <Image
//             source={{ uri: hierarchy.VisualEvidence }}
//             style={styles.image}
//           />
//         )}
//       </View>

//       {/* Meetings */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Meetings</Text>
//         {hierarchy.Meetings.length > 0 ? (
//           <FlatList
//             data={hierarchy.Meetings}
//             keyExtractor={(item) => item.MeetingId.toString()}
//             renderItem={({ item }) => (
//               <View style={styles.card}>
//                 <Text><Text style={styles.label}>Title:</Text> {item.Title}</Text>
//                 <Text><Text style={styles.label}>Description:</Text> {item.Description}</Text>
//                 <Text><Text style={styles.label}>Address:</Text> {item.Address}</Text>
//                 <Text>
//                   <Text style={styles.label}>Scheduled Date:</Text>{" "}
//                   {new Date(item.ScheduledDate).toLocaleString()}
//                 </Text>
//                 <Text><Text style={styles.label}>Meeting Type:</Text> {item.MeetingType}</Text>
//               </View>
//             )}
//           />
//         ) : (
//           <Text>No meetings linked to this problem.</Text>
//         )}
//       </View>

//       {/* Projects */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Projects</Text>
//         {hierarchy.Projects.length > 0 ? (
//           <FlatList
//             data={hierarchy.Projects}
//             keyExtractor={(item) => item.ProjectId.toString()}
//             renderItem={({ item }) => (
//               <View style={styles.card}>
//                 <Text><Text style={styles.label}>Title:</Text> {item.Title}</Text>
//                 <Text><Text style={styles.label}>Description:</Text> {item.Description}</Text>
//                 <Text><Text style={styles.label}>Status:</Text> {item.Status}</Text>
//                 <Text><Text style={styles.label}>Priority:</Text> {item.Priority}</Text>
//                 <Text>
//                   <Text style={styles.label}>Start Date:</Text>{" "}
//                   {new Date(item.StartDate).toLocaleDateString()}
//                 </Text>
//                 <Text>
//                   <Text style={styles.label}>End Date:</Text>{" "}
//                   {new Date(item.EndDate).toLocaleDateString()}
//                 </Text>
//                 <Text><Text style={styles.label}>Budget:</Text> ${item.Budget}</Text>

//                 {/* Logs for the project */}
//                 {item.Logs.length > 0 && (
//                   <View style={styles.logs}>
//                     <Text style={styles.logsTitle}>Logs</Text>
//                     {item.Logs.map((log) => (
//                       <View key={log.LogId} style={styles.logCard}>
//                         <Text>
//                           <Text style={styles.label}>Action Taken:</Text>{" "}
//                           {log.ActionTaken}
//                         </Text>
//                         <Text>
//                           <Text style={styles.label}>Action Date:</Text>{" "}
//                           {new Date(log.ActionDate).toLocaleString()}
//                         </Text>
//                         <Text><Text style={styles.label}>Status:</Text> {log.Status}</Text>
//                         <Text><Text style={styles.label}>Comments:</Text> {log.Comments}</Text>
//                         <Text>
//                           <Text style={styles.label}>Amount Spent:</Text> ${log.AmountSpent}
//                         </Text>
//                         <Text><Text style={styles.label}>Feedback:</Text> {log.Feedback}</Text>
//                       </View>
//                     ))}
//                   </View>
//                 )}
//               </View>
//             )}
//           />
//         ) : (
//           <Text>No projects linked to this problem.</Text>
//         )}
//       </View>
//       <WavyBackground />
//       <View style={styles.footerContainer}>
//         <Image
//           source={require('../../assets/Footer.png')}
//           style={[styles.footer, { width: width }]} // image width to screen width
//           resizeMode="stretch" // Maintain aspect ratio
//         />
//       </View>
//     </SafeAreaView>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF', // Set the background color to white
//   },
//   screenTitle: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#1E293B',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   footerContainer: {
//     position: 'absolute',
//     bottom: 0, 
//     width: '100%',
//     alignItems: 'center',
//   },
// });

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, Image, useWindowDimensions } from 'react-native';
import Collapsible from 'react-native-collapsible';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../Api';
import WavyBackground from '../../Background/WavyBackground';

export default function ViewProblemHierarchy({ route }) {
  const { problemId } = route.params;
  const { width } = useWindowDimensions();
  const [hierarchy, setHierarchy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    meetings: false,
    projects: false,
    logs: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch problem hierarchy
        const response = await fetch(`${baseURL}ReportProblem/GetProblemHierarchy?problemId=${problemId}`);
        const json = await response.json();
        setHierarchy(json.Data);
      } catch (err) {
        setError(err.response?.data?.Message || 'An error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [problemId]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleLog = (projectId) => {
    setExpandedSections((prev) => ({
      ...prev,
      logs: { ...prev.logs, [projectId]: !prev.logs[projectId] },
    }));
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <>
    <SafeAreaView style={styles.container}>
        <WavyBackground />
      <Text style={styles.screenTitle}>Problem Hierarchy</Text>
      {/* Problem Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Problem Details</Text>
        <Text><Text style={[styles.label, { color: 'black' }]}>Title: {hierarchy.Title}</Text></Text>
        <Text><Text style={[styles.label, { color: 'black' }]}>Description: {hierarchy.Description}</Text></Text>
        <Text><Text style={[styles.label, { color: 'black' }]}>Status: {hierarchy.Status}</Text></Text>
        <Text><Text style={[styles.label, { color: 'black' }]}>Problem Type: {hierarchy.ProblemType}</Text></Text>
        <Text><Text style={[styles.label, { color: 'black' }]}>Category: {hierarchy.Category}</Text></Text>
        <Text>
          <Text style={[styles.label, { color: 'black' }]}>Created At:</Text>{' '}
          {new Date(hierarchy.CreatedAt).toLocaleString()}
        </Text>
      </View>

      {/* Meetings */}
      <TouchableOpacity onPress={() => toggleSection('meetings')}>
        <Text style={styles.toggleButton}>
          {expandedSections.meetings ? '▼' : '▶'} Meetings
        </Text>
      </TouchableOpacity>
      <Collapsible collapsed={!expandedSections.meetings}>
        {hierarchy.Meetings.length > 0 ? (
          <FlatList
            data={hierarchy.Meetings}
            keyExtractor={(item) => item.MeetingId.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text><Text style={[styles.label, { color: 'black' }]}>Title: {item.Title}</Text></Text>
                <Text><Text style={[styles.label, { color: 'black' }]}>Description: {item.Description}</Text></Text>
                <Text><Text style={[styles.label, { color: 'black' }]}>Address: {item.Address}</Text></Text>
                <Text>
                  <Text style={styles.label}>Scheduled Date:  {new Date(item.ScheduledDate).toLocaleString()}</Text>{' '}
                 
                </Text>
                <Text><Text style={styles.label}>Meeting Type:  {item.MeetingType}</Text></Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noDataText}>No meetings linked to this problem.</Text>
        )}
      </Collapsible>

      {/* Projects */}
      <TouchableOpacity onPress={() => toggleSection('projects')}>
        <Text style={styles.toggleButton}>
          {expandedSections.projects ? '▼' : '▶'} Projects
        </Text>
      </TouchableOpacity>
      <Collapsible collapsed={!expandedSections.projects}>
        {hierarchy.Projects.length > 0 ? (
          hierarchy.Projects.map((project) => (
            <View key={project.ProjectId} style={styles.card}>
              <Text><Text style={[styles.label, { color: 'black' }]}>Title: {project.Title}</Text></Text>
              <Text><Text style={[styles.label, { color: 'black' }]}>Description: {project.Description}</Text></Text>
              <Text><Text style={[styles.label, { color: 'black' }]}>Status: {project.Status}</Text></Text>
              <Text><Text style={[styles.label, { color: 'black' }]}>Priority: {project.Priority}</Text></Text>
              <Text>
                <Text style={[styles.label, { color: 'black' }]}>Start Date: {new Date(project.StartDate).toLocaleDateString()}</Text>{' '}
                
              </Text>
              <Text>
                <Text style={[styles.label, { color: 'black' }]}>End Date: {new Date(project.EndDate).toLocaleDateString()}</Text>{' '}
                
              </Text>
              <Text><Text style={[styles.label, { color: 'black' }]}>Budget:  ${project.Budget}</Text></Text>

              {/* Logs */}
              <TouchableOpacity onPress={() => toggleLog(project.ProjectId)}>
                <Text style={styles.toggleButton}>
                  {expandedSections.logs[project.ProjectId] ? '▼' : '▶'} Logs
                </Text>
              </TouchableOpacity>
              <Collapsible collapsed={!expandedSections.logs[project.ProjectId]}>
                {project.Logs.length > 0 ? (
                  project.Logs.map((log) => (
                    <View key={log.LogId} style={styles.logCard}>
                      <Text>
                        <Text style={[styles.label, { color: 'black' }]}>Action Taken:</Text>{' '}
                        {log.ActionTaken}
                      </Text>
                      <Text>
                        <Text style={[styles.label, { color: 'black' }]}>Action Date:</Text>{' '}
                        {new Date(log.ActionDate).toLocaleString()}
                      </Text>
                      <Text><Text style={[styles.label, { color: 'black' }]}>Status:</Text> {log.Status}</Text>
                      <Text><Text style={[styles.label, { color: 'black' }]}>Comments:</Text> {log.Comments}</Text>
                      <Text>
                        <Text style={[styles.label, { color: 'black' }]}>Amount Spent:</Text> ${log.AmountSpent}
                      </Text>
                      <Text><Text style={[styles.label, { color: 'black' }]}>Feedback:</Text> {log.Feedback}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noDataText}>No logs available.</Text>
                )}
              </Collapsible>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No projects linked to this problem.</Text>
        )}
      </Collapsible>
      
    </SafeAreaView>
    <View style={styles.footerContainer}>
    <Image
      source={require('../../assets/Footer.png')}
      style={[styles.footer, { width: width }]}
      resizeMode="stretch"
    />
  </View>
  </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#FFFFFF' },
  screenTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 10, color: 'black' },
  section: { marginBottom: 20, color: 'black' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: 'black' },
  label: { fontWeight: 'bold', color: 'black' },
  card: { backgroundColor: '#f9f9f9', borderRadius: 8, padding: 10, marginBottom: 10 },
  toggleButton: { fontSize: 16, fontWeight: 'bold', color: '#007AFF', marginVertical: 5 },
  logCard: { backgroundColor: '#f1f1f1', padding: 10, borderRadius: 5, marginVertical: 5 },
  noDataText: { fontStyle: 'italic', color: '#555' },
  errorText: { color: 'red', fontSize: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  footer: {
    height: 80,
  },
});
