import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);  // State to track focus for email
  const [passwordFocused, setPasswordFocused] = useState(false);  // State to track focus for password
  const navigation = useNavigation();

  const handleSignUp = () => {
    // Implement your sign-up logic with Firebase, AWS Cognito, etc.
    navigation.navigate('UserInfo');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How Your'e Doing?</Text>
      <Text style={styles.subtitle}>Welcome Back, Mom!</Text>
      
      {/* Email Input */}
      <TextInput
        placeholder="Email"
        style={[styles.input, emailFocused && styles.inputFocused]}  // Apply focused style if focused
        value={email}
        onChangeText={(text) => setEmail(text)}
        onFocus={() => setEmailFocused(true)}  // Set focus state for email
        onBlur={() => setEmailFocused(false)}  // Unset focus state for email
      />

      {/* Password Input */}
      <TextInput
        placeholder="Password"
        style={[styles.input, passwordFocused && styles.inputFocused]}  // Apply focused style if focused
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        onFocus={() => setPasswordFocused(true)}  // Set focus state for password
        onBlur={() => setPasswordFocused(false)}  // Unset focus state for password
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Have not an account?{' '}
        <Text style={styles.linkText} onPress={() => navigation.navigate('SignUpScreenEmail')}>
          Click here
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#E91E63",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderColor: '#ccc',  // Default border color
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  inputFocused: {
    borderColor: '#E91E63',  // Border color changes when input is focused
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#E91E63',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  footerText: {
    fontSize: 14,
    color: '#000',
  },
  linkText: {
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
});

export default SignInScreen;
