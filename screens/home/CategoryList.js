

import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryList = ({ categories, onSelectCategory }) => {
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => onSelectCategory(item)}>
      <View style={styles.categoryItem}>
        <Text style={styles.categoryText}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>Danh Mục</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    padding: 10,
    margin: 5,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  categoryText: {
    color: 'white',
  },
});

export default CategoryList;
