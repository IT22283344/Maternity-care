import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const Onboarding1 = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/onboarding/onboarding1.png')}  // Ensure the correct path to your background image
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Maternity Mate</Text>
        <Text style={styles.subtitle}>
          A trusted companion through your pregnancy journey.
        </Text>

        <Text style={styles.featureText}>• Track your health, symptoms, and baby's growth week by week.</Text>
        <Text style={styles.featureText}>• Personalized insights tailored to your journey.</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Onboarding2')} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  featureText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginVertical: 5,
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

export default Onboarding1;
