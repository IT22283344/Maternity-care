import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../Screen/HomeScreen';  // Your main Home screen
import OnboardingScreen1 from '../Screen/Onboarding1';
import OnboardingScreen2 from '../Screen/Onboarding2';
import SignUpScreenEmail from '../Screen/SignUpwithEmail';
import UserInfoScreen from '../Screen/UserInfoInSignUpScreen';

const Stack = createStackNavigator();

export default function HomeScreenStackNav() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    // Check if the app was launched for the first time
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value === null) {
        // First launch, set the flag and show onboarding
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        // Not first launch, skip onboarding
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null; // Avoid rendering anything until AsyncStorage is checked
  }

  return (
    <Stack.Navigator initialRouteName={isFirstLaunch ? 'Onboarding1' : 'Home'}>
      {isFirstLaunch && (
        <>
          <Stack.Screen name="Onboarding1" component={OnboardingScreen1} options={{ headerShown: false }} />
          <Stack.Screen name="Onboarding2" component={OnboardingScreen2} options={{ headerShown: false }} />
          <Stack.Screen name="SignUpScreenEmail" component={SignUpScreenEmail} options={{ headerShown: false }} />
          {/* <Stack.Screen name="UserInfo" component={UserInfoScreen} options={{ headerShown: false }} /> */}
        </>
      )}
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UserInfoInSignUpScreen" component={UserInfoScreen} options={{ headerShown: false }} />
      
    </Stack.Navigator>
  );
}
