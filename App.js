import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClerkProvider, SignedOut, SignedIn } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './Apps/Navigations/TabNavigation';
import AuthStackNavigator from './Apps/Navigations/AuthStackNav';  // We'll create this next
import tw from 'twrnc';

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    // Check if it's the first time the app is launched
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');  // Set a flag to mark that the user has seen onboarding
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null; // Avoid rendering until first launch state is determined
  }

  return (
    <ClerkProvider publishableKey='pk_test_d2FudGVkLWdyYWNrbGUtNjkuY2xlcmsuYWNjb3VudHMuZGV2JA'>
      <NavigationContainer>
        <View className="flex-1">
          <StatusBar style='auto' backgroundColor='white'/>

          {/* Show Onboarding or Main App based on first launch */}
          {isFirstLaunch ? (
            <AuthStackNavigator />
          ) : (
            <SignedIn>
              <TabNavigation />
            </SignedIn>
          )}

          <SignedOut>
            <AuthStackNavigator />
          </SignedOut>
        </View>
      </NavigationContainer>
    </ClerkProvider>
  );
}











// import { StatusBar } from 'expo-status-bar';
// import { Text, View } from 'react-native';
// import LoginScreen from './Apps/Screen/LoginScreen';
// import { ClerkProvider, SignedOut, SignedIn } from '@clerk/clerk-expo';
// import { NavigationContainer } from '@react-navigation/native';
// import TabNavigation from './Apps/Navigations/TabNavigation';

// export default function App() {
//   return (
//     <ClerkProvider publishableKey='pk_test_d2FudGVkLWdyYWNrbGUtNjkuY2xlcmsuYWNjb3VudHMuZGV2JA'>
//         <View className="flex-1 bg-white">
//           <StatusBar style="auto" />
          
//           <SignedIn>
//              <NavigationContainer>
//                 <TabNavigation/>
//              </NavigationContainer>
//           </SignedIn>
//           <SignedOut>
//             <LoginScreen/>
//           </SignedOut>
//         </View>
//     </ClerkProvider>
    
//   );
// }

// /*const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });*/

// import { StatusBar } from 'expo-status-bar';
// import { View } from 'react-native';
// import LoginScreen from './Apps/Screen/LoginScreen';
// import { ClerkProvider, SignedOut, SignedIn } from '@clerk/clerk-expo';
// import { NavigationContainer } from '@react-navigation/native';
// import TabNavigation from './Apps/Navigations/TabNavigation';

// export default function App() {
//   return (
//     <ClerkProvider publishableKey='pk_test_d2FudGVkLWdyYWNrbGUtNjkuY2xlcmsuYWNjb3VudHMuZGV2JA'>
//       <NavigationContainer>
//         <View className="flex-1 bg-white">
//           <StatusBar style="auto" />
          
//           <SignedIn>
//              {/* When the user is signed in, show the main navigation */}
//              <TabNavigation/>
//           </SignedIn>
          
//           <SignedOut>
//             {/* When the user is signed out, show the login screen */}
//             <LoginScreen/>
//           </SignedOut>

//         </View>
//       </NavigationContainer>
//     </ClerkProvider>
//   );
// }