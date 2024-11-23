import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorite = ({ navigation }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadFavoriteItems();
  }, []);

  const loadFavoriteItems = async () => {
    try {
      const favoriteItemsString = await AsyncStorage.getItem('favoriteItems');
      const parsedFavoriteItems = favoriteItemsString ? JSON.parse(favoriteItemsString) : [];
      setFavoriteItems(parsedFavoriteItems);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm yêu thích:', error);
    }
  };

  const handleRemoveFavorite = async (itemId) => {
    try {
      const updatedFavoriteItems = favoriteItems.filter(item => item.id !== itemId);
      await AsyncStorage.setItem('favoriteItems', JSON.stringify(updatedFavoriteItems));
      setFavoriteItems(updatedFavoriteItems);
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm yêu thích:', error);
    }
  };

  const handleAddToCart = async (item) => {
    try {
      const cartItemsString = await AsyncStorage.getItem('cartItems');
      const parsedCartItems = cartItemsString ? JSON.parse(cartItemsString) : [];

      const existingItemIndex = parsedCartItems.findIndex(cartItem => cartItem.id === item.id);

      if (existingItemIndex !== -1) {
        parsedCartItems[existingItemIndex].quantity += 1;
      } else {
        parsedCartItems.push({ ...item, quantity: 1 });
      }

      await AsyncStorage.setItem('cartItems', JSON.stringify(parsedCartItems));
      setCartItems(parsedCartItems);
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Chitiet', { item, cartItems, setCartItems })}
      style={styles.itemContainer}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemTextPrice}>{item.price}$</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveFavorite(item.id)}
      >
        <Text style={styles.removeButtonText}>Xóa</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.favorite}>
      <Text style={styles.title}>Danh sách yêu thích</Text>
      <FlatList
        data={favoriteItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
      <Text style={styles.cartItemsText}>
        Số sản phẩm trong giỏ hàng: {cartItems ? cartItems.length : 0}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  favorite: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
  },
  title: {
    color: 'black',
    fontSize: 20,
    marginBottom: 10,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#505050',
    textAlign: 'center',
  },
  itemTextPrice: {
    color: 'green',
  },
  addToCartButton: {
    marginTop: 5,
    padding: 5,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: 'white',
  },
  removeButton: {
    marginTop: 5,
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
  },
  cartItemsText: {
    fontSize: 16,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: '#fff',
  },
});

export default Favorite;
