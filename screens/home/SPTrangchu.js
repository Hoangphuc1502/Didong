// import Header from './Header.js';
// import Footer from './Footer.js';
// import React, { useState,useEffect } from 'react';
// import { StyleSheet, View, Image, FlatList, Text, TouchableOpacity } from 'react-native';
// import GioHang from './GioHang.js';
// import Toast from 'react-native-toast-message';


// const anh = [
// ];
// export default function SPTrangChu({ navigation }) {
//   const [fashion, setFashion] = useState([]);

//   const getAPI = () => {
//     return fetch(`https://659fac0d5023b02bfe8a2647.mockapi.io/db_android`)
//       .then((response) => response.json())
//       .then((data) => setFashion(data))
//       .catch((error) => console.error(error));
//   };

//   useEffect(() => {
//     getAPI();
//   }, []);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//     onPress={() => navigation.navigate('Chitiet', { item,cartItems, setCartItems, })}
//       style={styles.itemContainer}
//     >
//       <Image source={{ uri: item.image }} style={styles.image} />
//       <Text style={styles.itemText}>{item.name}</Text>
//       <Text style={styles.itemTextPrice}>{item.price}$</Text>
//       <TouchableOpacity
//         style={styles.addToCartButton}
//         onPress={() => handleAddToCart(item)}
//       >
//         <Text style={styles.addToCartButtonText}>Add to Cart</Text>
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   const [cartItems, setCartItems] = useState([]);

//   const handleAddToCart = (item) => {

//     const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

//     if (existingItem) {
//       setCartItems((prevItems) =>
//         prevItems.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         )
//       );
//        // Hiển thị thông báo thành công
//     Toast.show({
      
//       type: 'success',
//       position: 'bottom',
//       text1: 'Sản phẩm đã được thêm vào giỏ hàng',
//     });
//     } else {
//       setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
//       // Hiển thị thông báo thành công
//     Toast.show({
//       type: 'success',
//       position: 'bottom',
//       text1: 'Sản phẩm đã được thêm vào giỏ hàng',
//     });
//     }
//   };

//   const handlePressCart = () => {
//     navigation.navigate('GioHang', { cartItems, setCartItems });
//   };

//   return (
//     <View style={styles.trangchu}>
//       <Header onPressCart={handlePressCart} onSearch={(searchText) => console.log(searchText)} />

//       <Image
//         style={styles.banner}
//         source={require('../../assets/images/banne.webp')}
//       />
//       <Text style={styles.title}>Sản phẩm</Text>
//       <FlatList
//         data={fashion}
//         numColumns={2}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         scrollEnabled={true}  // Cho phép cuộn
//       />
      
     
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   trangchu: {
//     flex: 1,
//     backgroundColor: '#fff',
//     margin: 10,
//   },
//   title: {
//     color: 'black',
//     fontSize: 20,
 
//   },
//   banner: {
//     width: 380,
//     height: 200,
  
//   },
//   itemContainer: {
//     flex: 1,
//     alignItems: 'center',
//     margin: 10,
//   },
//   image: {
//     width: 180,
//     height: 180,
//     marginBottom: 5,
//   },
//   itemText: {
//     fontSize: 16,
//     color: 'black',
//     textAlign: 'center',
//   },
// });
