import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExerciseDetailScreen from '../Screen/ExersiceDetailScreen';

const Stack = createStackNavigator();

export default function DiscoverScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ExerciseDetailScreen" component={ExerciseDetailScreen} options={{ headerShown: false }} />
     
    </Stack.Navigator>
  );
}
