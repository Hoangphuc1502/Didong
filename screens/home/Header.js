import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Header = ({ onPressCart  }) => {
  

 
  return (
    <View style={styles.header}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo/user.png')}
      />
     
       <TouchableOpacity onPress={onPressCart}>
        <Image
          style={styles.cartIcon}
          source={require('../../assets/images/cart2.jpg')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'black',
    fontSize: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    flex: 1,
    marginLeft: 10,
    borderRadius:15,
  },
  cartIcon:{
    width: 40,
    height: 40,
  },

  logo: {
    width: 40,
    height: 40,
  }
});

export default Header;
