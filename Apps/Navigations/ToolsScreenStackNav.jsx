import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ToolsScreen from '../Screen/ToolsScreen';  // Your main Tools screen
import ExerciseScreen from '../Screen/ExerciseScreen';  // Example for individual tool screens
import SymptomTrackingScreen from '../Screen/SymptomTrackingScreen';
import MyWeightScreen from '../Screen/MyWeightScreen';
import AppointmentsScreen from '../Screen/AppointmentsScreen';
import ExersiceDetailScreen from '../Screen/ExersiceDetailScreen';
import HospitalBagScreen from '../Screen/HospitalBagScreen';
import NutritionTrackingScreen from '../Screen/NutritionTrackingScreen';

const Stack = createStackNavigator();

export default function ToolsScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tools" component={ToolsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Exercise" component={ExerciseScreen} />
      <Stack.Screen name="Symptom Tracking" component={SymptomTrackingScreen} />
      <Stack.Screen name="My Weight" component={MyWeightScreen} />
      <Stack.Screen name="Appointments" component={AppointmentsScreen} />
      <Stack.Screen name="Exersice Details" component={ExersiceDetailScreen} />
      <Stack.Screen name="Nutrition Tracking" component={NutritionTrackingScreen} />
      <Stack.Screen name="Hospital Bag" component={HospitalBagScreen} />
      
      {/* Add more tools as needed */}
    </Stack.Navigator>
  );
}
