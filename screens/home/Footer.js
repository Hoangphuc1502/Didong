import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Trong Footer.js
const Footer = ({ navigation }) => {
  const handleViewInvoice = () => {
    // Chuyển trang đến màn hình thông báo
    navigation.navigate('ThongBao');
  };
  const handleViewProfile = () => {
    // Chuyển trang đến màn hình thông tin tài khoản
    navigation.navigate('ThongTinTaiKhoan');
  };
  const handleViewFavorite = () => {
    // Chuyển trang đến màn hình thông tin tài khoản
    navigation.navigate('Favorite');
  };

  return (
    <View style={styles.footer}>
      <View style={styles.iconContainer}>
         <TouchableOpacity onPress={handleViewFavorite}>
          <Image
            style={styles.heartIcon}
            source={require('../../assets/images/heart.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleViewInvoice}>
          <Image
            style={styles.notificationIcon}
            source={require('../../assets/images/notification.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleViewProfile}>
          <Image
            style={styles.userIcon}
            source={require('../../assets/images/user.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, // Tăng kích thước padding để cách lề của footer
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Sắp xếp các icon cách đều nhau trong một hàng
    width: '60%', // Đặt chiều rộng của iconContainer
  },
  heartIcon: {
    width: 40,
    height: 40,
    marginRight: 50, // Khoảng cách giữa biểu tượng trái và biểu tượng giữa
  },
  notificationIcon: {
    width: 40,
    height: 40,
    marginRight: 50, // Khoảng cách giữa biểu tượng giữa và biểu tượng phải
  },
  userIcon: {
    width: 40,
    height: 40,
  },
});

export default Footer;
