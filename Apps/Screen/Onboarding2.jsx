import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const Onboarding2 = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/onboarding/onboarding2.png')}  // Ensure the correct path to your background image
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>All-in-One Pregnancy Tracker</Text>

        <Text style={styles.featureText}>• Log daily symptoms and moods.</Text>
        <Text style={styles.featureText}>• Receive personalized advice for each trimester.</Text>
        {/*<Text style={styles.featureText}>• Follow guided exercise routines.</Text>*/}

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover', // Ensures the background image covers the entire screen
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white overlay for text readability
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E91E63', // White text color for good contrast
    textAlign: 'center',
    marginBottom: 20,
  },
  featureText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#E91E63', // Custom button color
    padding: 15,
    borderRadius: 25,
    marginTop: 30,
    width: '70%',
    alignItems: 'center',
    elevation: 5, // Adds a subtle shadow effect
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Onboarding2;
