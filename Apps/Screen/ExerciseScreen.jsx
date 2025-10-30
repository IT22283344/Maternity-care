import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons'; // For play button icon
import WavyBackground from '../Components/WavyBackground'; // Import WavyBackground
import tw from 'twrnc';

export default function ExerciseScreen() {
  const navigation = useNavigation(); // Get navigation instance

  // Data for exercises
  const exercises = [
    { id: '1', title: 'Exercise - 01', description: 'Let\'s Continue', image: 'https://via.placeholder.com/100' },
    { id: '2', title: 'Exercise - 03', description: 'Let\'s Continue', image: 'https://via.placeholder.com/100' },
    { id: '3', title: 'Exercise - 04', description: 'Let\'s Continue', image: 'https://via.placeholder.com/100' },
  ];

  // Function to render each exercise item
  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity 
      style={tw`flex-row items-center bg-white rounded-lg p-4 my-2 shadow`} 
      onPress={() => navigation.navigate('ExerciseDetail', { exerciseId: item.id })}
    >
      <Image source={{ uri: item.image }} style={tw`w-16 h-16 rounded-lg`} />
      <View style={tw`flex-1 ml-4`}>
        <Text style={tw`text-lg font-bold`}>{item.title}</Text>
        <Text style={tw`text-sm text-gray-500`}>{item.description}</Text>
      </View>
      <Ionicons name="play-circle" size={30} color="#E91E63" />
    </TouchableOpacity>
  );

  return (
    <WavyBackground>
      <View style={tw`flex-1 px-5 pt-2`}>

        {/* Featured exercise card */}
        <TouchableOpacity 
          style={tw`bg-white rounded-2xl p-5 mb-5 shadow-lg relative mt-5`} 
          onPress={() => navigation.navigate('ExerciseDetailScreen', { exerciseId: '2' })}
        >
          <Image source={{ uri: 'https://via.https://images.pexels.com/photos/7155530/pexels-photo-7155530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1.com/300' }} style={tw`w-full h-48 rounded-xl`} />
          <View style={tw`mt-4`}>
            <Text style={tw`text-sm text-gray-500`}>Let’s Continue, Where you left off!!</Text>
            <Text style={tw`text-lg font-bold`}>Exercise - 02</Text>
          </View>
          <Ionicons name="play-circle" size={50} color="#E91E63" style={tw`absolute bottom-5 right-5`} />
        </TouchableOpacity>

        {/* List of exercises */}
        <FlatList
          data={exercises}
          renderItem={renderExerciseItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={tw`pb-20`}
        />
      </View>
    </WavyBackground>
  );
}
