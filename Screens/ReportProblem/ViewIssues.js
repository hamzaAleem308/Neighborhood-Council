import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import WavyBackground from '../../Background/WavyBackground';
import baseURL from '../Api';
import { baseImageURL } from '../Api';

export default function ViewIssues({ navigation, route }) {
  const { width } = useWindowDimensions(); // screen width
  const { councilId } = route.params;
  const [problemData, setProblemData] = useState([]);

  const getReportedProblem = async () => {
    try {
      const response = await fetch(`${baseURL}ReportProblem/GetReportedProblems?councilId=${councilId}`);
      if (response.ok) {
        const data = await response.json(); // Await the JSON parsing
        if (data && data.length > 0) {
          const repData = data.map((rp) => ({
            ProblemId: rp.ProblemId,
            Title: rp.Title,
            Description: rp.Description,
            Status: rp.Status,
            ProblemType: rp.ProblemType,
            Category: rp.Category,
            CreatedAt: rp.CreatedAt,
            VisualEvidence: rp.VisualEvidence,
            MemberId: rp.MemberId,
            CouncilId: rp.CouncilId,
          }));
          setProblemData(repData);
        } else {
          console.log('No reported problems found.');
        }
      } else {
        console.log(`Failed to load reported problems. Status: ${response.status}`);
      }
    } catch (error) {
      console.log('Unable to get Reported Problems', error);
    }
  };

  useEffect(() => {
    getReportedProblem();
  }, []);

  const handleTick = (problemId) => {
    console.log(`Problem ${problemId} approved!`);
  };

  const handleCross = (problemId) => {
    console.log(`Problem ${problemId} rejected!`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.status(item.Status)}>{item.Status}</Text>
      </View>
      <Text style={styles.description}>{item.Description}</Text>
      {item.VisualEvidence ? (
        <Image
          source={{ uri: item.VisualEvidence }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <Text style={styles.noImageText}>No Visual Evidence</Text>
      )}
      <View style={styles.metaContainer}>
        <Text style={styles.metaText}>Type: {item.ProblemType}</Text>
        <Text style={styles.metaText}>Category: {item.Category}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.tickButton]}
          onPress={() => handleTick(item.ProblemId)}
        >
          <Text style={styles.buttonText}>✔ Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.crossButton]}
          onPress={() => handleCross(item.ProblemId)}
        >
          <Text style={styles.buttonText}>✖ Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <WavyBackground />
      <Text style={styles.screenTitle}>Reported Problems</Text>
      <FlatList
        data={problemData}
        keyExtractor={(item) => item.ProblemId.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footerContainer}>
        <Image
          source={require('../../assets/Footer.png')}
          style={[styles.footer, { width: width }]}
          resizeMode="stretch"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginVertical: 20,
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  status: (status) => ({
    fontSize: 14,
    fontWeight: '600',
    color: status === 'Pending' ? '#F59E0B' : status === 'Resolved' ? '#10B981' : '#EF4444',
    backgroundColor: status === 'Pending' ? '#FEF3C7' : status === 'Resolved' ? '#D1FAE5' : '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    textAlign: 'center',
  }),
  description: {
    fontSize: 15,
    color: '#6B7280',
    marginVertical: 12,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginTop: 8,
  },
  noImageText: {
    color: '#9CA3AF',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tickButton: {
    backgroundColor: '#22C55E',
  },
  crossButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  footer: {
    height: 80,
  },
});
