import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons'; // For icons
import Header from '../Components/HomeScreen/Header';
import tw from 'twrnc';

export default function ToolsScreen() {
  const navigation = useNavigation(); // Get navigation instance

  return (
    <ScrollView style={tw`p-6 flex-1 bg-rose-50`}>
      {/* Buttons for Tools */}
      <Header />
      <Text style={tw`text-2xl font-bold mb-6 text-left mt-5 text-rose-600`}>
        Tools for you.
      </Text>
      <ToolButton icon="fitness-outline" label="Exercise" onPress={() => navigation.navigate('Exercise')} delay={0} />
      <ToolButton icon="medkit-outline" label="Symptom Tracking" onPress={() => navigation.navigate('Symptom Tracking')} delay={100} />
      <ToolButton icon="nutrition-outline" label="Nutrition Tracking" onPress={() => navigation.navigate('Nutrition Tracking')} delay={200} />
      <ToolButton icon="scale-outline" label="My Weight" onPress={() => navigation.navigate('My Weight')} delay={300} />
      <ToolButton icon="calendar-outline" label="Appointments" onPress={() => navigation.navigate('Appointments')} delay={400} />
      <ToolButton icon="bag-outline" label="Hospital Bag" onPress={() => navigation.navigate('Hospital Bag')} delay={500} />
    </ScrollView>
  );
}


// Helper component for buttons
function ToolButton({ icon, label, onPress }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
      onPress={onPress}
    >
      <Ionicons name={icon} size={24} color="#E91E63" style={{ marginRight: 15 }} />
      <Text style={{ fontSize: 16 }}>{label}</Text>
    </TouchableOpacity>
  );
}
