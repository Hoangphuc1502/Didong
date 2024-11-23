import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Image, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThanhToan = ({ navigation, route }) => {
  const { cartItems, setCartItems } = route.params;
  const [isInfoVisible, setInfoVisible] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isPaymentMethodModalVisible, setPaymentMethodModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPhoneNumberValid, setPhoneNumberValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const toggleInfoVisibility = () => {
    setInfoVisible(!isInfoVisible);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const togglePaymentMethodModal = () => {
    setPaymentMethodModalVisible(!isPaymentMethodModalVisible);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    togglePaymentMethodModal();
  };

  const handleConfirm = async () => {
    try {
      // Kiểm tra xem có thông tin khách hàng và phương thức thanh toán không
      if (!customerName || !isPhoneNumberValid || !customerAddress || !selectedPaymentMethod) {
        setErrorMessage('Vui lòng nhập đầy đủ thông tin khách hàng và chọn phương thức thanh toán hợp lệ.');
        setIsErrorVisible(true);
        return;
      }

      // ... Các logic xử lý hóa đơn, thông tin khách hàng và phương thức thanh toán

      // Làm trống giỏ hàng
      setCartItems([]);

      // Lưu hóa đơn vào AsyncStorage
      const invoice = {   //đối
        customerName,
        customerPhone,
        customerAddress,
        selectedPaymentMethod,
        cartItems,
        // Thêm các thông tin khác nếu cần
      };

     // Lưu hóa đơn vào AsyncStorage
    const invoicesString = await AsyncStorage.getItem('invoices');
    const parsedInvoices = invoicesString ? JSON.parse(invoicesString) : [];
    const updatedInvoices = [...parsedInvoices, invoice];
    await AsyncStorage.setItem('invoices', JSON.stringify(updatedInvoices));
      // Mở modal thông báo
      toggleModal();
    } catch (error) {
      console.error('Lỗi khi xử lý hóa đơn:', error);
      setErrorMessage('Đã xảy ra lỗi khi xử lý hóa đơn. Vui lòng thử lại.');
      setIsErrorVisible(true);
    }
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handlePhoneNumberChange = (text) => {
    setCustomerPhone(text);
    setPhoneNumberValid(isValidPhoneNumber(text));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông Tin Thanh Toán</Text>

      {/* Nút toggle để hiện/ẩn phần nhập thông tin */}
      <TouchableOpacity style={styles.toggleButton} onPress={toggleInfoVisibility}>
        <Text style={styles.toggleButtonText}>{isInfoVisible ? 'Ẩn Thông Tin' : 'Hiện Thông Tin'}</Text>
      </TouchableOpacity>

      {/* Phần nhập thông tin */}
      {isInfoVisible && (
        <>
          <Text style={styles.inputLabel}>Họ và Tên:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập họ và tên"
            value={customerName}
            onChangeText={(text) => setCustomerName(text)}
          />

          <Text style={styles.inputLabel}>Số Điện Thoại:</Text>
          <TextInput
            style={[styles.input, !isPhoneNumberValid && styles.invalidInput]}
            placeholder="Nhập số điện thoại"
            value={customerPhone}
            onChangeText={handlePhoneNumberChange}
            keyboardType="numeric"
          />
          {!isPhoneNumberValid && (
            <Text style={styles.errorMessage}>Số điện thoại phải chứa 10 chữ số.</Text>
          )}

          <Text style={styles.inputLabel}>Địa Chỉ:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập địa chỉ"
            value={customerAddress}
            onChangeText={(text) => setCustomerAddress(text)}
          />
        </>
      )}
      {/* Kết thúc phần nhập thông tin */}

      {/* Chọn phương thức thanh toán */}
      <TouchableOpacity style={styles.input} onPress={togglePaymentMethodModal}>
        <Text>{selectedPaymentMethod || 'Chọn phương thức thanh toán'}</Text>
      </TouchableOpacity>
      
      {/* Modal chọn phương thức thanh toán */}
      <Modal isVisible={isPaymentMethodModalVisible} animationIn="fadeIn" animationOut="fadeOut">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Chọn Phương Thức Thanh Toán</Text>
          <TouchableOpacity onPress={() => handlePaymentMethodSelect('cashOnDelivery')}>
            <Text>Thanh toán khi nhận hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePaymentMethodSelect('bankTransfer')}>
            <Text>Thanh toán qua ngân hàng</Text>
          </TouchableOpacity>
          <Button title="Đóng" onPress={togglePaymentMethodModal} />
        </View>
      </Modal>
      {/* Kết thúc chọn phương thức thanh toán */}

      {/* Hiển thị giỏ hàng */}
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Text>Số lượng: {item.quantity}</Text>
            <Text>Giá: {item.price}$</Text>
            <Text>Size: {item.size}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {/* Kết thúc hiển thị giỏ hàng */}

      {/* Tổng số lượng và số tiền */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Tổng số lượng: {calculateTotalQuantity(cartItems)}</Text>
        <Text style={styles.summaryText}>Tổng số tiền: {calculateTotalPrice(cartItems)}$</Text>
      </View>

      {/* Nút xác nhận */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>

      {/* Hiển thị modal thông báo */}
      <Modal isVisible={isModalVisible} animationIn="fadeIn" animationOut="fadeOut">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Thanh Toán Thành Công!</Text>
          <Button title="OK" onPress={() => navigation.navigate('TrangChu')} />
        </View>
      </Modal>
      {isErrorVisible && (
        <Modal isVisible={isErrorVisible} animationIn="fadeIn" animationOut="fadeOut">
          <View style={styles.errorModalContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
            <Button title="Đóng" onPress={() => setIsErrorVisible(false)} />
          </View>
        </Modal>
      )}
    </View>
  );
};

const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
};

const calculateTotalQuantity = (cartItems) => {
  return cartItems.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  toggleButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputLabel: {
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  invalidInput: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 5,
  },
  summaryContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
  },
  summaryText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Modal styles
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorModalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'red',
  },
  // Modal chọn phương thức thanh toán
  paymentMethodModal: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentMethodOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: '100%',
    alignItems: 'center',
  },
  paymentMethodOptionText: {
    fontSize: 16,
  },
  closeModalButton: {
    marginTop: 20,
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ThanhToan;
