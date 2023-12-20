import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { push, ref } from 'firebase/database';
import { data } from './firebase';

const AddFoodScreen = () => {
  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState('');

  const handleAddFood = async () => {
    if (!foodName || !foodPrice) {
      alert('Vui lòng nhập đầy đủ thông tin món ăn.');
      return;
    }

    try {
      const newFood = {
        name: foodName,
        price: foodPrice,
      };

      await push(ref(data, 'foods'), newFood);

      alert('Thêm món ăn thành công.');
      setFoodName('');
      setFoodPrice('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thêm món ăn mới</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên món ăn"
        value={foodName}
        onChangeText={(text) => setFoodName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Giá món ăn"
        value={foodPrice}
        onChangeText={(text) => setFoodPrice(text)}
      />
      <Button title="Thêm món ăn" onPress={handleAddFood} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
  },
});

export default AddFoodScreen;
