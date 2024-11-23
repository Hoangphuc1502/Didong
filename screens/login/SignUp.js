import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = async () => {
    if (username && password && email) {
      try {
        // Lấy danh sách tài khoản đã đăng ký từ AsyncStorage
        const existingAccountsString = await AsyncStorage.getItem('accounts');
        const existingAccounts = existingAccountsString ? JSON.parse(existingAccountsString) : [];

        // Kiểm tra xem tài khoản có tồn tại chưa
        const isAccountExist = existingAccounts.some(
          (account) => account.username === username || account.email === email
        );

        if (!isAccountExist) {
          // Thêm tài khoản mới vào danh sách
          const newAccount = { username, password, email };
          existingAccounts.push(newAccount);

          // Lưu lại danh sách tài khoản vào AsyncStorage
          await AsyncStorage.setItem('accounts', JSON.stringify(existingAccounts));

          // Thực hiện đăng nhập tự động
          handleLogin();
        } else {
          alert('Tài khoản đã tồn tại. Vui lòng chọn tên người dùng hoặc email khác.');
        }
      } catch (error) {
        console.error('Lỗi khi đăng ký:', error);
        alert('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.');
      }
    } else {
      alert('Vui lòng nhập cả tên người dùng, email và mật khẩu.');
    }
  };

  const handleLogin = async () => {
    // Thực hiện logic đăng nhập
    alert('Dang ky thanh cong.');


    // Chuyển hướng sau khi đăng nhập
    navigation.navigate('Login');
  };
  const isValidEmail = (email) => {
    // Kiểm tra tính hợp lệ của email (Bạn có thể cải thiện hàm kiểm tra này theo nhu cầu)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <ImageBackground
      source={require('../../assets/images/nenshoppe.png')} // Đường dẫn hình ảnh background của bạn
      style={styles.backgroundImage}
    >
    <View style={styles.home}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo/user.png')}
      />
      <Text style={styles.title}>Tạo Tài Khoản</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button1} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  home: {
    
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: 300,
    height: 50,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#EEEEEE',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 15,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
    width: 350,
    height: 50,
    bottom: -10,
  },
  button1: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
    width: 350,
    height: 50,
    bottom: -20,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SignUp;
