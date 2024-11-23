import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username && password) {
      try {
        // Lấy danh sách tài khoản đã đăng ký từ AsyncStorage
        const existingAccountsString = await AsyncStorage.getItem('accounts');
        const existingAccounts = existingAccountsString
          ? JSON.parse(existingAccountsString)
          : [];

        // Kiểm tra thông tin đăng nhập với tất cả các tài khoản
        const loggedInAccount = existingAccounts.find(
          (account) =>
            account.username === username && account.password === password
        );

        if (loggedInAccount) {
          alert('Đăng nhập thành công');
          navigation.navigate('TrangChu');
        } else {
          alert('Sai tên người dùng hoặc mật khẩu');
        }
      } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        alert('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.');
      }
    } else {
      alert('Vui lòng nhập tên người dùng và mật khẩu.');
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
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

        <Text style={styles.title}>Đăng nhập vào tài khoản của bạn</Text>

        <TextInput
          style={styles.input}
          placeholder="Tên người dùng"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Quên mật khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button1} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: 'transparent',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 100,
    textAlign: 'center',
    color: 'black',
  },
  forgotPassword: {
    width: 150,
    left: 100,
  },
  input: {
    width: 300,
    height: 50,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPasswordText: {
    color: 'black',
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
