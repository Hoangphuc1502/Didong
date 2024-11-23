
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Modal from 'react-native-modal';

const Chitiet = ({ route, navigation }) => {
  const { item, cartItems, setCartItems } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(item.size);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleQuantityDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleQuantityIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleSizeChange = (newSize) => {
    setSelectedSize(newSize);
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, size: newSize } : cartItem
      )
    );
  };

  const handleAddToCart = () => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      );
    } else {
      // Thêm thông tin size vào item trước khi thêm vào giỏ hàng
      const newItem = { ...item, quantity: quantity, size: item.size };
      setCartItems((prevItems) => [...prevItems, newItem]);
    }
  
    // Hiển thị thông báo modal
    toggleModal();
    navigation.goBack();
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.chitiet}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemTextP}>{item.price}</Text>
      <Text style={styles.selectedSize}>Selected Size: {selectedSize}</Text>
      <View style={styles.row}>
        <Text style={styles.itemSize}>Size: {item.size}</Text>
        {["S", "M", "L", "XL"].map((size) => (
          <TouchableOpacity
            key={size}
            onPress={() => handleSizeChange(size)}
          >
            <Text
              style={[
                styles.sizeButton,
                { backgroundColor: selectedSize === size ? "#3498db" : "#fff" },
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleQuantityIncrement}
      >
        <Text style={styles.addToCartButtonText}>+</Text>
      </TouchableOpacity>
      <Text style={styles.itemQuantity}>Quantity: {quantity}</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleQuantityDecrement}
      >
        <Text style={styles.addToCartButtonText}>-</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartBtnText}>Add to Cart</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Sản phẩm đã được thêm vào giỏ hàng</Text>
          <TouchableOpacity onPress={toggleModal}>
          </TouchableOpacity>
        </View>
      </Modal>
      <Text style={styles.cartItemsText}>
        Items in Cart: {cartItems ? cartItems.length : 0}
      </Text>
      {cartItems &&
        cartItems.map((cartItem) => (
          <View key={cartItem.id}>
            {/* <Image
              source={{ uri: cartItem.image }}
              style={styles.cartItemImage}
            />
            <Text>{cartItem.name}</Text>
            <Text>Quantity: {cartItem.quantity}</Text> */}
          </View>
          // Hiện thông tin sản phẩm đã có trong giỏ
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  chitiet: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addToCartBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    width:200,
  },
  itemQuantity: { //quanti
    fontSize: 16,
    marginBottom: 10,
  },
  cartItemsText: {
    fontSize: 16,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: "#fff",
  },
  cartItemImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    marginBottom: 5,
  },
  sizeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  itemSize: {
    fontSize: 14,
    marginRight: 10,
  },
  
  
  selectedSize: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    elevation: 5, // Độ nâng của modal
    
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  closeModalText: {
    color: '#3498db',
    fontSize: 16,
    textAlign: 'center',
  },
  addToCartButtonText:{
    color: '#fff',
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  }
});

export default Chitiet;
