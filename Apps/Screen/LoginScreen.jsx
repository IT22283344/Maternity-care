import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const navigation = useNavigation();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Handle next steps for sign-in or sign-up flow, such as MFA or incomplete registration
        console.log('Google OAuth successful, proceed with sign-in/up.');
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, [startOAuthFlow]);

  return (
    <ImageBackground
      source={{ uri: 'https://png.pngtree.com/thumb_back/fw800/back_our/20190622/ourmid/pngtree-mother-s-day-pregnant-mom-background-image_215277.jpg' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Maternity Mate</Text>
        <Text style={styles.subtitle}>
          Taking care of you and your baby, every step of the way
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>
        {/* Get Started Button */}
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreenEmail')} style={styles.button}>
          <Text style={styles.buttonText}>Continue with Email</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Light overlay for better text visibility
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#E91E63', // Soft pink title color
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    paddingVertical: 15,
    marginTop: 10,
    paddingHorizontal: 40,
    backgroundColor: '#E91E63', // Pink button for call-to-action
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});
