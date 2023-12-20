import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getDatabase, ref, onValue, off, remove } from "firebase/database";
import { data } from './firebase';

const FoodWheelScreen = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState('');

  useEffect(() => {
    const foodRef = ref(data, 'foods');

    const unsubscribe = onValue(foodRef, (snapshot) => {
      const foodData = snapshot.val();
      if (foodData) {
        const foodItemsArray = Object.entries(foodData).map(([key, value]) => ({
          id: key,
          name: value.name,
          price: value.price,
        }));
        setFoodItems(foodItemsArray);
      }
    }, (error) => {
      console.error("Error fetching data: ", error);
    });

    return () => off(foodRef, 'value', unsubscribe);
  }, []);

  const chooseRandomFood = () => {
    if (foodItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * foodItems.length);
      setSelectedFood(foodItems[randomIndex].name);
    }
  };

  const deleteFoodItem = (foodId) => {
    const foodRef = ref(data, `foods/${foodId}`);
    remove(foodRef)
      .then(() => Alert.alert("Xóa món ăn", "Món ăn đã được xóa thành công."))
      .catch((error) => console.error("Error removing food item: ", error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh Sách Món Ăn</Text>
      {foodItems.map((foodItem, index) => (
        <View key={index} style={styles.foodItem}>
          <Text style={styles.foodName}>{foodItem.name}</Text>
          <Text style={styles.foodPrice}>Giá: {foodItem.price} VND</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteFoodItem(foodItem.id)}
          >
            <Text style={styles.deleteButtonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.randomButton} onPress={chooseRandomFood}>
        <Text style={styles.buttonText}>Chọn Món Ăn Ngẫu Nhiên</Text>
      </TouchableOpacity>
      {selectedFood !== '' && (
        <Text style={styles.selectedFood}>Món Ăn Được Chọn: {selectedFood}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  foodName: {
    fontSize: 18,
    marginBottom: 5,
  },
  foodPrice: {
    fontSize: 16,
    marginLeft: 10,
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
  },
  randomButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  selectedFood: {
    fontSize: 20,
    marginTop: 20,
    color: 'blue',
  },
});

export default FoodWheelScreen;
