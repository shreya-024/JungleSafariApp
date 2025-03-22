import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { auth, firestore } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { LinearGradient } from 'react-native-linear-gradient';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleRegister = async () => {
    if (!email.trim() || !password.trim() || !username.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(collection(firestore, 'users'), user.uid), {
        username: username.trim(),
        email: email.trim(),
        createdAt: new Date(),
      });

      Alert.alert('Success', 'Registration successful! Please login.');
      setEmail('');
      setPassword('');
      setUsername('');
      navigation.navigate('Login');
    } catch (error) {
      let errorMessage = 'Registration failed';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email is already registered';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        default:
          errorMessage = error.message;
      }
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#D9C2A7', '#A68A64']} // Warm earthy gradient (light tan to muted brown)
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Join the Jungle</Text>
          <Text style={styles.subtitle}>Create your account</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput 
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#8B7D6B"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="words"
          />
          <TextInput 
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#8B7D6B"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput 
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8B7D6B"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TouchableOpacity 
            style={styles.button}
            onPress={handleRegister}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#52A773', '#3D8B5C']} // Subtle green gradient for button
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.loginLink}
          >
            <Text style={styles.loginText}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3C2F2F', // Dark brown for title
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B5745', // Muted brown for subtitle
    marginTop: 10,
    marginBottom: 30,
    fontStyle: 'italic',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '90%',
    backgroundColor: '#F5EDE1', // Light beige for inputs
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    color: '#3C2F2F', // Dark brown text
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#A68A64', // Muted brown border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  button: {
    marginTop: 20,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    color: '#FFFFFF', // Changed to white
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;