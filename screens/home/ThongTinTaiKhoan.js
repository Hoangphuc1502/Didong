// ThongTinTaiKhoan.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ThongTinTaiKhoan = ({ route }) => {
    // Check if route.params exists and contains the account info
    const { username, email } = route.params || {};  // Default to an empty object

    return (
      <View style={styles.container}>
        {username && email ? (
          <>
            <Text style={styles.title}>Thông Tin Tài Khoản</Text>
            <Text style={styles.info}>Tên Người Dùng: {username}</Text>
            <Text style={styles.info}>Email: {email}</Text>
          </>
        ) : (
          <Text style={styles.errorText}>Không có thông tin tài khoản.</Text>
        )}
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default ThongTinTaiKhoan;
