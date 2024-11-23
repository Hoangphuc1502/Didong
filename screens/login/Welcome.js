// WelcomePage.js
import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Welcome = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/banner2.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Chào mừng đến với ứng dụng của chúng tôi</Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.startButtonText}>Bắt đầu</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  
    
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:  '#444444',
    textAlign: 'center',
    marginBottom: 20,
    
  },
  startButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Welcome;
