import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

const ThongBao = () => {
  const [invoices, setInvoices] = useState([]);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedInvoiceIndex, setSelectedInvoiceIndex] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const invoicesString = await AsyncStorage.getItem('invoices');
        const parsedInvoices = invoicesString ? JSON.parse(invoicesString) : [];
        setInvoices(parsedInvoices);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách hóa đơn:', error);
      }
    };

    fetchInvoices();
  }, []);

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const formatCurrency = (value) => {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  const handleDeleteInvoice = async () => {
    if (selectedInvoiceIndex !== null) {
      const updatedInvoices = [...invoices];
      updatedInvoices.splice(selectedInvoiceIndex, 1);
      setInvoices(updatedInvoices);
      await saveInvoicesToStorage(updatedInvoices);
      setDeleteModalVisible(false);
      setSelectedInvoiceIndex(null);
    }
  };

  const saveInvoicesToStorage = async (invoices) => {
    try {
      await AsyncStorage.setItem('invoices', JSON.stringify(invoices));
    } catch (error) {
      console.error('Lỗi khi lưu danh sách hóa đơn:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông Tin Hóa Đơn</Text>
      <FlatList
        data={invoices}
        renderItem={({ item, index }) => (
          <View style={styles.invoiceContainer}>
            <Text style={styles.invoiceTitle}>Họ và Tên: {item.customerName}</Text>
            <Text style={styles.invoiceTitle}>Số Điện Thoại: {item.customerPhone}</Text>
            <Text style={styles.invoiceTitle}>Địa Chỉ: {item.customerAddress}</Text>
            <Text style={styles.invoiceTitle}>Sản Phẩm: {item.cartItems.map(cartItem => `${cartItem.name} x${cartItem.quantity}`).join(', ')}</Text>
            <Text style={styles.invoiceTitle}>Tổng Tiền: {formatCurrency(calculateTotalPrice(item.cartItems))} VNĐ</Text>
            <Text style={styles.invoiceTitle}>Phương Thức Thanh Toán: {item.selectedPaymentMethod}</Text>

            <TouchableOpacity onPress={() => { setDeleteModalVisible(true); setSelectedInvoiceIndex(index); }}>
              <Text style={styles.deleteButton}>Xóa Hóa Đơn</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Modal isVisible={isDeleteModalVisible} animationIn="fadeIn" animationOut="fadeOut">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Xác Nhận Xóa Hóa Đơn?</Text>
          <TouchableOpacity style={styles.deleteModalButton} onPress={handleDeleteInvoice}>
            <Text style={styles.deleteModalButtonText}>Xóa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteModalButton1} onPress={() => setDeleteModalVisible(false)}>
            <Text style={styles.deleteModalButtonText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
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
  invoiceContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  invoiceTitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#505050',
  },
 // Nút xóa trong hóa đơn
 deleteButton: {
  color: 'red',
  fontSize: 16,
  marginTop: 10,
  alignSelf: 'flex-end', // Đặt nút xóa ở phía bên phải
},
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  deleteModalButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
     left: 80,
     top: 58,
     marginTop: 10,
  },
  deleteModalButton1:{
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 8,
     right: 80,
    marginTop: 10,
  },
  deleteModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
  },
});

export default ThongBao;
