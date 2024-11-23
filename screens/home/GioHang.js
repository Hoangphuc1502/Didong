import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Toast from 'react-native-toast-message';

const GioHang = ({ route, navigation }) => {
  const { cartItems, setCartItems } = route.params;
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Screen is focused!');
    });

    return unsubscribe;
  }, [navigation]);

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    alert('Remove item');
    navigation.goBack();
  };

  const handleRemoveAllItems = () => {
    setCartItems([]);
    alert('Remove all items');
    navigation.goBack();
  };

  const handleSizeChange = (itemId, newSize) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, size: newSize } : item
      )
    );
  };

  const handleQuantityIncrement = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleQuantityDecrement = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity -1 } : item
      )
    );
  };

  const handlePressThanhToan = () => {
    if (cartItems.length === 0) {
      alert('Chưa có sản phẩm nào trong giỏ!');
    } else {
      navigation.navigate('ThanhToan', { cartItems, setCartItems });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ Hàng</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>Giá: {item.price}$</Text>
              <View style={styles.row}>
                <Text style={styles.itemSize}>Size: {item.size}</Text>
                {["S", "M", "L", "XL"].map((size) => (
                  <TouchableOpacity
                    key={size}
                    onPress={() => handleSizeChange(item.id, size)}
                  >
                    <Text
                      style={[
                        styles.sizeButton,
                        { backgroundColor: item.size === size ? "#3498db" : "#fff" },
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.row}>
                <Text style={styles.itemQuantity}>Số Lượng: {item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => handleQuantityDecrement(item.id)}
                  style={styles.quantityButton}
                >
                  <Text>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleQuantityIncrement(item.id)}
                  style={styles.quantityButton}
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleRemoveItem(item.id)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity
        style={styles.removeAllButton}
        onPress={handleRemoveAllItems}
        disabled={isDeletingAll}
      >
        <Text style={styles.removeAllButtonText}>Xóa Tất Cả</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.thanhToanButton} onPress={handlePressThanhToan}>
        <Text style={styles.thanhToanButtonText}>Thanh Toán</Text>
      </TouchableOpacity>
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
    fontWeight: "bold",
    marginBottom: 10,
    
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
    
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "#505050",
    marginBottom: 5,
  },
  itemPrice:{
    color: "green",
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
  itemQuantity: {
    fontSize: 14,
    marginRight: 10,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
  },
  removeButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    padding: 8,
    borderRadius: 4,
  },
  removeButtonText: {
    color: "white",
  },
  thanhToanButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  thanhToanButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyCartText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },

  sizeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: "#fff",
  },
  removeAllButton: {
    position: 'absolute',
    top:630,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  removeAllButtonText: {
    color: 'white',
  },
});

export default GioHang;
