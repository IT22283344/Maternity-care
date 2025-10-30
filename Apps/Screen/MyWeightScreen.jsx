import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import WavyBackground from '../Components/WavyBackground'; // Import WavyBackground for background design
import { useNavigation } from '@react-navigation/native'; // If you need to navigate
import tw from 'twrnc'; // Nativewind (tailwind) styling

export default function MyWeightScreen() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const calculateBMI = () => {
    if (!weight || !height) {
      Alert.alert('Please enter both weight and height');
      return;
    }

    const heightInMeters = parseFloat(height) / 100; // Convert cm to meters
    const bmi = parseFloat(weight) / (heightInMeters * heightInMeters);
    Alert.alert(`Your BMI is ${bmi.toFixed(2)}`);
  };

  return (
    <WavyBackground>
        <ScrollView>


      <View style={tw`flex-1 px-6 pt-20`}>
       
        {/* Section Title */}
        <Text style={tw`text-xl font-bold mb-5`}>Let’s Calculate your BMI</Text>

        {/* Input for weight */}
        <TextInput
          style={tw`bg-white p-4 rounded-xl mb-4 mt-10 shadow`}
          placeholder="Enter your weight (kg)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />

        {/* Input for height */}
        <TextInput
          style={tw`bg-white p-4 rounded-xl mb-8 shadow`}
          placeholder="Enter your height (cm)"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />

        {/* Calculate Button */}
        <TouchableOpacity
          style={tw`bg-pink-500 p-4 rounded-xl shadow-lg`}
          onPress={calculateBMI}
        >
          <Text style={tw`text-white text-center text-lg font-bold`}>Calculate</Text>
        </TouchableOpacity>
      </View>
        </ScrollView>
    </WavyBackground>
  );
}
