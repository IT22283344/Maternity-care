import { View, Image, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import tw from 'twrnc';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Header() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={tw`flex-1 p-1`}>
      <View style={tw`flex-row items-center gap-2`}>
        <Image
          source={{ uri: user.imageUrl || 'https://via.placeholder.com/150' }}
          style={tw`rounded-full w-12 h-12`} // Increased the size
        />
        <View>
          <Text style={tw`text-sm`}>Welcome</Text>
          <Text style={tw`text-lg font-bold`}>{user?.fullName}</Text>
        </View>
      </View>

    </SafeAreaView>
  );
}
