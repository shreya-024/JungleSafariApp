import React from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  StyleSheet, 
  Image, 
  Dimensions, 
  TouchableOpacity,
  Animated 
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  // Animation for button
  const [buttonScale] = React.useState(new Animated.Value(1));

  const onPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Enhanced Forest Background */}
      <ImageBackground 
        source={require('../assets/forest.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient 
          colors={['rgba(34, 139, 34, 0.7)', 'rgba(0, 100, 0, 0.4)']} // Forest green gradient
          style={styles.overlay}
        >
          <Text style={styles.title}>Jungle Safari Souvenirs</Text>
          <Text style={styles.subtitle}>Explore Our Wild Collection</Text>
        </LinearGradient>
      </ImageBackground>

      {/* Enhanced Forest Floor Section */}
      <View style={styles.forestSection}>
        {/* Vine-like Divider */}
        <View style={styles.vineDivider} />

        {/* Image Grid with leaf effect */}
        <View style={styles.imageContainer}>
          {[
            require('../assets/image1.jpeg'),
            require('../assets/image2.jpeg'),
            require('../assets/image3.jpeg'),
          ].map((source, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={source} style={styles.image} />
            </View>
          ))}
        </View>

        <View style={styles.imageContainer}>
          {[
            require('../assets/image4.jpeg'),
            require('../assets/image5.jpeg'),
            require('../assets/image6.jpeg'),
          ].map((source, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={source} style={styles.image} />
            </View>
          ))}
        </View>

        {/* Animated Login Button */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={() => navigation.navigate('Login')}
        >
          <Animated.View style={[styles.loginButton, { transform: [{ scale: buttonScale }] }]}>
            <LinearGradient
              colors={['#228B22', '#006400']}
              style={styles.buttonGradient}
            >
              <Text style={styles.loginText}>Tap to Unlock</Text>
            </LinearGradient>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0e6', // Light forest green background
  },
  background: {
    width: '100%',
    height: height * 0.50,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 44,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#d4ffd4',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  forestSection: {
    flex: 1,
    backgroundColor: '#f0fff0', // Very light green
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingVertical: 25,
    alignItems: 'center',
    shadowColor: '#006400',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  vineDivider: {
    width: width * 0.8,
    height: 4,
    backgroundColor: '#228B22',
    borderRadius: 2,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: width * 0.95,
    marginVertical: 12,
  },
  imageWrapper: {
    padding: 5,
    backgroundColor: 'rgba(34, 139, 34, 0.1)', // Light green background
    borderRadius: 20,
  },
  image: {
    width: 105,
    height: 105,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#32CD32', // Lime green border
    shadowColor: '#006400',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  loginButton: {
    marginTop: 30,
    borderRadius: 35,
    overflow: 'hidden',
    shadowColor: '#006400',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 60,
  },
  loginText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default HomeScreen;