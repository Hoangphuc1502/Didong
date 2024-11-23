// ForgotPassword.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleForgotPassword = async () => {
    if (email && username && password) {
      try {
        const existingAccountsString = await AsyncStorage.getItem('accounts');
        const existingAccounts = existingAccountsString ? JSON.parse(existingAccountsString) : [];

        const isCredentialsExist = existingAccounts.some(
          (account) => account.email === email && account.username === username && account.password === password
        );

        if (isCredentialsExist) {
          navigation.navigate('ResetPasswordConfirmation', { email });
        } else {
          alert('Thông tin đăng nhập không chính xác.');
        }
      } catch (error) {
        console.error('Lỗi khi xử lý quên mật khẩu:', error);
        alert('Đã xảy ra lỗi khi xử lý quên mật khẩu. Vui lòng thử lại.');
      }
    } else {
      alert('Vui lòng nhập đầy đủ thông tin: Email, Tên Đăng Nhập, Mật Khẩu.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quên Mật Khẩu</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập Tên Đăng Nhập"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập Mật Khẩu"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Gửi Yêu Cầu</Text>
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
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 8,
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

export default ForgotPassword;
