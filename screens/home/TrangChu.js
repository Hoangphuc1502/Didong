import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import Footer from './Footer';
import CategoryList from './CategoryList';

export default function TrangChu({ navigation }) {
  const [fashion, setFashion] = useState([]);
  const [isCartModalVisible, setCartModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [displayedFashion, setDisplayedFashion] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [cartItems, setCartItems] = useState([]);

  const toggleCartModal = () => {
    setCartModalVisible(!isCartModalVisible);
  };

  const getAPI = () => {
    return fetch(`https://fakestoreapi.com/products`)
      .then((response) => response.json())
      .then((data) => {
        setFashion(data);
        setDisplayedFashion(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAPI();
  }, []);

  const getCategory = (data) => {
    const categories = data.map(item => item.category);
    return ['Tất cả', ...new Set(categories)];
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'Tất cả') {
      setDisplayedFashion(fashion);
    } else {
      const filteredFashion = fashion.filter(item => item.category === category);
      setDisplayedFashion(filteredFashion);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Chitiet', { item, cartItems, setCartItems })}
      style={styles.itemContainer}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.itemText}>{item.title}</Text>
      <Text style={styles.itemTextPrice}>{item.price}$</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addToCartButtonText}>{item.id === 'no_result' ? 'Không phù hợp' : 'Add to Cart'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleAddToCart = (item) => {
    if (item.id === 'no_result') {
      alert('Sản phẩm không phù hợp');
      return;
    }

    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }

    toggleCartModal();
  };

  const handlePressCart = () => {
    navigation.navigate('GioHang', { cartItems, setCartItems });
  };

  const handleSearch = () => {
    const filteredFashion = fashion.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filteredFashion.length > 0) {
      setDisplayedFashion(filteredFashion);
    } else {
      setDisplayedFashion([{ id: 'no_result', title: 'Không có sản phẩm này' }]);
    }
  };

  return (
    <View style={styles.trangchu}>
      <Header onPressCart={handlePressCart} onSearch={(searchText) => handleSearch(searchText)} />
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm sản phẩm"
        onChangeText={(text) => setSearchText(text)}
        onBlur={handleSearch}
      />
      <CategoryList categories={getCategory(fashion)} onSelectCategory={handleSelectCategory} />
      <Image
        style={styles.banner}
        source={require('../../assets/images/banner3.jpg')}
      />

      <Text style={styles.title}>Sản phẩm</Text>
      <FlatList
        data={displayedFashion}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={true}
      />

      {/* Modal cho giỏ hàng */}
      <Modal isVisible={isCartModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Sản phẩm đã được thêm vào giỏ hàng</Text>
          <TouchableOpacity onPress={toggleCartModal}>
            <Text style={styles.closeModalText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  trangchu: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
  },
  title: {
    color: 'black',
    fontSize: 20,
  },
  banner: {
    width: 380,
    height: 200,
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
  addToCartButtonText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    marginRight: 5,
    color: "white",
    backgroundColor: 'orange',
    borderColor: 'orange',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeModalText: {
    color: '#3498db',
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    margin: 10,
    borderRadius: 15,
  },
});
