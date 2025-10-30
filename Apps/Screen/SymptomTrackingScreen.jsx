import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { firestore } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function SymptomTrackingScreen() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  // Fetch symptoms from Firestore based on the selected pregnancy month
  useEffect(() => {
    const fetchSymptoms = async () => {
      if (selectedMonth) {
        try {
          const q = query(collection(firestore, 'symptoms'), where('month', '==', parseInt(selectedMonth)));
          const querySnapshot = await getDocs(q);
          const symptomsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSymptoms(symptomsData);
        } catch (error) {
          console.error('Error fetching symptoms:', error);
        }
      } else {
        setSymptoms([]);
      }
    };

    fetchSymptoms();
  }, [selectedMonth]);

  return (
    <ImageBackground 
      source={{uri: 'https://i.pinimg.com/736x/84/a8/1d/84a81db7fae81f0db04554ea694ff796.jpg'}} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Pregnancy Symptom Tracking</Text>

          <Text style={styles.welcomeText}>
            Select the pregnancy month to see possible symptoms and remedies.
          </Text>

          {/* Dropdown Picker for selecting Pregnancy Month */}
          <Picker
            selectedValue={selectedMonth}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setSelectedMonth(itemValue);  // Update selected month
              setSelectedSymptom(null);     // Clear previous symptom details
            }}
          >
            <Picker.Item label="Select Pregnancy Month" value="" />
            {[...Array(9).keys()].map(month => (
              <Picker.Item key={month + 1} label={`Month ${month + 1}`} value={month + 1} />
            ))}
          </Picker>

          {/* List of Symptoms */}
          {symptoms.length > 0 ? (
            <FlatList
              data={symptoms}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.symptomItem}
                  onPress={() => setSelectedSymptom(item)}
                >
                  <Text style={styles.symptomText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.noDataText}>
              {selectedMonth
                ? 'No symptoms available for this month.'
                : 'Please select a month to view symptoms.'}
            </Text>
          )}

          {/* Display Symptom Details and Remedies */}
          {selectedSymptom && (
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsTitle}>{selectedSymptom.name}</Text>
              
              <Text style={styles.labelText}>Details:</Text>
              <Text style={styles.detailsText}>{selectedSymptom.details}</Text>

              <Text style={styles.labelText}>Remedies:</Text>
              <Text style={styles.detailsText}>{selectedSymptom.remedies}</Text>

              {selectedSymptom.severity && (
                <>
                  <Text style={styles.labelText}>Severity:</Text>
                  <Text style={styles.detailsText}>{selectedSymptom.severity}</Text>
                </>
              )}

              {selectedSymptom.duration && (
                <>
                  <Text style={styles.labelText}>Duration:</Text>
                  <Text style={styles.detailsText}>{selectedSymptom.duration}</Text>
                </>
              )}

              {selectedSymptom.advice && (
                <>
                  <Text style={styles.labelText}>Advice:</Text>
                  <Text style={styles.detailsText}>{selectedSymptom.advice}</Text>
                </>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 20, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#E91E63', 
  },
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  symptomItem: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: '#E91E63', 
    elevation: 2,
  },
  symptomText: {
    fontSize: 18,
    color: '#fff',
  },
  noDataText: {
    fontSize: 16,
    color: '#FF6347',
    textAlign: 'center',
    marginTop: 20,
  },
  detailsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 182, 193, 0.4)', 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F48FB1', 
    elevation: 5, 
    shadowColor: '#000', 
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#C2185B', 
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F', 
    marginTop: 10,
  },
  detailsText: {
    fontSize: 16,
    marginTop: 5,
    color: '#880E4F',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
    padding: 5,
    borderRadius: 5,
    lineHeight: 22,
  },
});
