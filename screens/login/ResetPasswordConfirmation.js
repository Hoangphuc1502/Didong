// ResetPasswordConfirmation.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ResetPasswordConfirmation = ({ route, navigation }) => {
  const { email } = route.params;

  const handleContinue = () => {
    // Chuyển hướng người dùng đến màn hình nhập mật khẩu mới
    navigation.navigate('NewPassword', { email });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yêu Cầu Đặt Lại Mật Khẩu</Text>
      <Text style={styles.message}>
        Một email đã được gửi đến {email} với hướng dẫn cách đặt lại mật khẩu của bạn.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Tiếp Tục</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResetPasswordConfirmation;
