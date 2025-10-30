import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Modal, ImageBackground } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';
import { Ionicons } from '@expo/vector-icons';
import { app } from '../../firebaseConfig';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

// Sample food items with nutritional values (specific to Sri Lanka)
const sriLankanFoods = [
  { name: 'Rice and Curry', calories: 400, carbs: 80, protein: 12, fat: 8 },
  { name: 'Kottu', calories: 500, carbs: 70, protein: 15, fat: 10 },
  { name: 'String Hoppers', calories: 200, carbs: 40, protein: 4, fat: 2 },
  { name: 'Pol Sambol', calories: 100, carbs: 8, protein: 1, fat: 9 },
  { name: 'Fish Ambul Thiyal', calories: 250, carbs: 0, protein: 25, fat: 15 },
  { name: 'Hoppers', calories: 150, carbs: 30, protein: 4, fat: 3 },
  { name: 'Coconut Roti', calories: 180, carbs: 35, protein: 4, fat: 7 },
  { name: 'Dal Curry', calories: 180, carbs: 30, protein: 12, fat: 5 },
  { name: 'Fried Rice', calories: 450, carbs: 60, protein: 8, fat: 20 },
  { name: 'Egg Fried Rice', calories: 500, carbs: 65, protein: 10, fat: 18 },
  { name: 'Chicken Biryani', calories: 600, carbs: 75, protein: 25, fat: 20 },
  { name: 'Fish Biryani', calories: 550, carbs: 70, protein: 22, fat: 18 },
  { name: 'Vegetable Biryani', calories: 450, carbs: 65, protein: 8, fat: 15 },
  { name: 'Mutton Biryani', calories: 700, carbs: 75, protein: 30, fat: 25 },
  { name: 'Sambol Rice', calories: 350, carbs: 60, protein: 8, fat: 10 },
  { name: 'Nasi Goreng', calories: 550, carbs: 75, protein: 20, fat: 20 },
  { name: 'Seeni Sambol Rice', calories: 400, carbs: 70, protein: 10, fat: 15 },
  { name: 'Mango Curry', calories: 120, carbs: 20, protein: 2, fat: 4 },
  { name: 'Brinjal Curry', calories: 200, carbs: 18, protein: 3, fat: 12 },
  { name: 'Potato Curry', calories: 250, carbs: 45, protein: 5, fat: 9 },
  { name: 'Chicken Curry', calories: 350, carbs: 8, protein: 30, fat: 20 },
  { name: 'Fish Curry', calories: 300, carbs: 6, protein: 30, fat: 15 },
  { name: 'Dhal', calories: 220, carbs: 40, protein: 12, fat: 3 },
  { name: 'Sambol', calories: 70, carbs: 6, protein: 1, fat: 5 },
  { name: 'Fried Egg', calories: 90, carbs: 1, protein: 7, fat: 7 },
  { name: 'Vegetable Roti', calories: 200, carbs: 30, protein: 6, fat: 8 },
  { name: 'Fruit Salad', calories: 150, carbs: 38, protein: 1, fat: 1 },
  { name: 'Chickpea Curry', calories: 300, carbs: 45, protein: 15, fat: 8 },
  { name: 'Mutton Curry', calories: 500, carbs: 10, protein: 35, fat: 30 },
  { name: 'Kottu Roti', calories: 550, carbs: 75, protein: 20, fat: 25 },
  { name: 'Coconut Milk Rice', calories: 400, carbs: 70, protein: 5, fat: 15 },
  { name: 'Devilled Chicken', calories: 450, carbs: 10, protein: 30, fat: 25 },
  { name: 'Tandoori Chicken', calories: 380, carbs: 5, protein: 30, fat: 25 },
  { name: 'Paneer Butter Masala', calories: 400, carbs: 15, protein: 15, fat: 30 },
  { name: 'Curd Rice', calories: 220, carbs: 35, protein: 6, fat: 8 },
  { name: 'Pineapple Curry', calories: 150, carbs: 30, protein: 2, fat: 4 },
  { name: 'Chili Paste', calories: 100, carbs: 5, protein: 1, fat: 10 },
  { name: 'Mixed Vegetable Curry', calories: 200, carbs: 35, protein: 6, fat: 8 },
  { name: 'Aloo Gobi', calories: 200, carbs: 40, protein: 6, fat: 6 },
  { name: 'Spinach Curry', calories: 120, carbs: 15, protein: 6, fat: 5 },
  { name: 'Egg Curry', calories: 250, carbs: 8, protein: 18, fat: 15 },
  { name: 'Pumpkin Curry', calories: 150, carbs: 30, protein: 3, fat: 5 },
  { name: 'Vada', calories: 200, carbs: 30, protein: 6, fat: 10 },
  { name: 'Baba Ganoush', calories: 250, carbs: 20, protein: 5, fat: 18 },
  { name: 'Coconut Chutney', calories: 150, carbs: 10, protein: 4, fat: 12 },
  { name: 'Papadum', calories: 100, carbs: 12, protein: 3, fat: 5 },
  { name: 'Fish Fry', calories: 400, carbs: 30, protein: 25, fat: 20 },
  { name: 'Sago Pudding', calories: 200, carbs: 35, protein: 3, fat: 5 },
  { name: 'Mango Lassi', calories: 250, carbs: 45, protein: 5, fat: 5 },
  { name: 'Chocolate Milkshake', calories: 300, carbs: 40, protein: 10, fat: 10 },
  { name: 'Watalappan', calories: 350, carbs: 45, protein: 8, fat: 18 },
  { name: 'Sweet Rice', calories: 400, carbs: 70, protein: 5, fat: 10 },
  { name: 'Kheer', calories: 250, carbs: 40, protein: 6, fat: 5 },
  { name: 'Pol Roti', calories: 150, carbs: 30, protein: 3, fat: 4 },
  { name: 'Chocolate Cake', calories: 350, carbs: 60, protein: 5, fat: 15 },
  { name: 'Custard', calories: 200, carbs: 30, protein: 5, fat: 5 },
  { name: 'Lemon Rice', calories: 220, carbs: 35, protein: 4, fat: 5 },
  { name: 'Fruit Raita', calories: 150, carbs: 25, protein: 3, fat: 4 },
  { name: 'Raita', calories: 120, carbs: 8, protein: 3, fat: 5 },
  { name: 'Curried Eggplant', calories: 150, carbs: 20, protein: 5, fat: 8 },
  { name: 'Roasted Nuts', calories: 250, carbs: 10, protein: 10, fat: 20 },
  { name: 'Sesame Ball', calories: 300, carbs: 40, protein: 8, fat: 15 },
  { name: 'Sothi', calories: 200, carbs: 15, protein: 5, fat: 10 },
  { name: 'Pork Curry', calories: 500, carbs: 12, protein: 40, fat: 30 },
  { name: 'Crab Curry', calories: 450, carbs: 15, protein: 40, fat: 25 },
  { name: 'Beef Curry', calories: 400, carbs: 10, protein: 35, fat: 25 },
  { name: 'Vegetable Fried Rice', calories: 300}
]

// Sort food items alphabetically
const sortedFoods = sriLankanFoods.sort((a, b) => a.name.localeCompare(b.name));

export default function NutritionTrackingScreen() {
  const db = getFirestore(app);

  // Default nutrition recommendations for pregnant women
  const recommendedNutrition = {
    calories: 2200,
    carbs: 175,
    protein: 71,
    fat: 80,
  };

  // Nutrition data state
  const [nutritionData, setNutritionData] = useState({
    eaten: 0,
    burned: 0,
    carbsLeft: recommendedNutrition.carbs,
    proteinLeft: recommendedNutrition.protein,
    fatLeft: recommendedNutrition.fat,
    total: recommendedNutrition.calories,
  });

  // State to track added meals and input modal
  const [meals, setMeals] = useState({
    breakfast: null,
    lunch: null,
    dinner: null,
  });
  const [mealModalVisible, setMealModalVisible] = useState(false);
  const [currentMealType, setCurrentMealType] = useState(null);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const nutritionRef = doc(db, 'nutrition', today); // Use today's date as the document ID
      const docSnap = await getDoc(nutritionRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNutritionData(data);
      } else {
        // If no document exists, initialize it with recommended values
        const initialNutritionData = {
          eaten: 0,
          burned: 0,
          carbsLeft: recommendedNutrition.carbs,
          proteinLeft: recommendedNutrition.protein,
          fatLeft: recommendedNutrition.fat,
          total: recommendedNutrition.calories,
        };
        await setDoc(nutritionRef, initialNutritionData);
        setNutritionData(initialNutritionData);
      }
    };
    fetchData();
  }, []);

  const resetTracker = async () => {
    const today = new Date().toISOString().split('T')[0];
    const initialNutritionData = {
      eaten: 0,
      burned: 0,
      carbsLeft: recommendedNutrition.carbs,
      proteinLeft: recommendedNutrition.protein,
      fatLeft: recommendedNutrition.fat,
      total: recommendedNutrition.calories,
    };

    await setDoc(doc(db, 'nutrition', today), initialNutritionData);
    setNutritionData(initialNutritionData);
  };

  // Function to add meals based on selected foods
  const addMeals = async () => {
    const mealNutrition = selectedFoods.map((foodName) =>
      sriLankanFoods.find((food) => food.name === foodName)
    );

    if (mealNutrition) {
      // Update meal state
      setMeals((prevMeals) => ({
        ...prevMeals,
        [currentMealType]: mealNutrition,
      }));

      // Recalculate nutrition data after adding meals
      const totalNutrition = mealNutrition.reduce(
        (acc, food) => {
          acc.calories += food.calories;
          acc.carbs += food.carbs;
          acc.protein += food.protein;
          acc.fat += food.fat;
          return acc;
        },
        { calories: 0, carbs: 0, protein: 0, fat: 0 }
      );

      setNutritionData((prevData) => {
        const newData = {
          ...prevData,
          eaten: prevData.eaten + totalNutrition.calories,
          carbsLeft: prevData.carbsLeft - totalNutrition.carbs,
          proteinLeft: prevData.proteinLeft - totalNutrition.protein,
          fatLeft: prevData.fatLeft - totalNutrition.fat,
        };

        // Save updated data to Firestore
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        setDoc(doc(db, 'nutrition', today), newData);

        return newData;
      });
    }

    // Close modal and reset input
    setMealModalVisible(false);
    setSelectedFoods([]);
    setSelectedFood("");
  };

  return (
    
    <ImageBackground
      source={{ uri: 'https://png.pngtree.com/thumb_back/fw800/back_our/20190622/ourmid/pngtree-mother-s-day-pregnant-mom-background-image_215277.jpg' }} // Add your image URL here
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Daily Nutrition Tracker</Text>
        </View>

        {/* Circular Progress Bar */}
        <View style={styles.progressContainer}>
          <CircularProgress
            size={120}
            width={10}
            fill={(nutritionData.eaten / nutritionData.total) * 100}
            tintColor="#ff5252"
            backgroundColor="#3d5875"
            rotation={0}
            lineCap="round"
          />
          <Text style={styles.calories}>{nutritionData.total - nutritionData.eaten} kcal LEFT</Text>
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={resetTracker}>
          <Text style={styles.resetButtonText}>Reset Tracker</Text>
        </TouchableOpacity>

        {/* Nutrition Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.statLabel}>EATEN</Text>
          <Text style={styles.statValue}>{nutritionData.eaten} kcal</Text>
          <Text style={styles.statLabel}>BURNED</Text>
          <Text style={styles.statValue}>{nutritionData.burned} kcal</Text>
        </View>

        <View style={styles.nutritionBreakdown}>
          <View style={styles.nutritionItem}>
            <Text>CARBS</Text>
            <Text>{nutritionData.carbsLeft}g left</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text>PROTEIN</Text>
            <Text>{nutritionData.proteinLeft}g left</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text>FAT</Text>
            <Text>{nutritionData.fatLeft}g left</Text>
          </View>
        </View>

        {/* Meal Tracking */}
        <View style={styles.mealTracking}>
          <TouchableOpacity style={styles.mealItem} onPress={() => { setMealModalVisible(true); setCurrentMealType('breakfast'); }}>
            <Image source={{ uri: 'https://t4.ftcdn.net/jpg/01/80/23/57/360_F_180235724_re7asm0odpdBIJDRz5LSNkjtUr6aZUXG.jpg' }} style={styles.mealImage} />
            <View>
              <Text style={styles.mealTitle}>Add Breakfast</Text>
              <Text>Recommended: 830-1170 kcal</Text>
            </View>
            <Ionicons name="add-circle-outline" size={30} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.mealItem} onPress={() => { setMealModalVisible(true); setCurrentMealType('lunch'); }}>
            <Image source={{ uri: 'https://5.imimg.com/data5/SELLER/Default/2022/6/ZP/TZ/IK/144143379/lunch-food-services-500x500.jpg' }} style={styles.mealImage} />
            <View>
              <Text style={styles.mealTitle}>Add Lunch</Text>
              <Text>Recommended: 830-1170 kcal</Text>
            </View>
            <Ionicons name="add-circle-outline" size={30} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.mealItem} onPress={() => { setMealModalVisible(true); setCurrentMealType('dinner'); }}>
            <Image source={{ uri: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/06/grain-bowl-1296x728-header.jpg?w=1155&h=1528' }} style={styles.mealImage} />
            <View>
              <Text style={styles.mealTitle}>Add Dinner</Text>
              <Text>Recommended: 830-1170 kcal</Text>
            </View>
            <Ionicons name="add-circle-outline" size={30} color="#555" />
          </TouchableOpacity>
        </View>

        {/* Meal Input Modal */}
        <Modal visible={mealModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Food</Text>
            <Picker
              selectedValue={selectedFood}
              onValueChange={(itemValue) => {
                setSelectedFood(itemValue);
                if (!selectedFoods.includes(itemValue)) {
                  setSelectedFoods([...selectedFoods, itemValue]);
                }
              }}
            >
              <Picker.Item label="Select a food" value="" />
              {sortedFoods.map((food) => (
                <Picker.Item key={food.name} label={food.name} value={food.name} />
              ))}
            </Picker>

            {/* Display selected foods with a cross icon for removal */}
            <View style={styles.selectedFoodsContainer}>
              <Text style={styles.selectedFoodsTitle}>Selected Foods:</Text>
              {selectedFoods.length > 0 ? (
                selectedFoods.map((food, index) => (
                  <View key={index} style={styles.selectedFoodItemContainer}>
                    <Text style={styles.selectedFoodItem}>{food}</Text>
                    <TouchableOpacity onPress={() => {
                      const updatedFoods = selectedFoods.filter((item) => item !== food);
                      setSelectedFoods(updatedFoods);
                    }}>
                      <Ionicons name="close-circle" size={24} color="#ff5252" />
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text style={styles.noFoodsText}>No foods selected.</Text>
              )}
            </View>

            <TouchableOpacity style={styles.addButton} onPress={addMeals}>
              <Text style={styles.addButtonText}>Add Meal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setMealModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },

  container: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)' },
  header: { padding: 20, backgroundColor: '#f8a5e6', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerText: { fontSize: 24, color: '#fff' },
  progressContainer: { justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
  calories: { fontSize: 18, fontWeight: 'bold', color: '#555', marginTop: 10 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  statLabel: { fontSize: 16, color: '#888' },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  nutritionBreakdown: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  nutritionItem: { alignItems: 'center' },
  mealTracking: { padding: 20 },
  mealItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  mealImage: { width: 60, height: 60, borderRadius: 30, marginRight: 20 },
  mealTitle: { fontSize: 18, fontWeight: 'bold' },
  modalContainer: { flex: 1, padding: 20, justifyContent: 'center' },
  modalTitle: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  selectedFoodsContainer: { marginVertical: 20 },
  selectedFoodsTitle: { fontSize: 18, marginBottom: 10 },
  selectedFoodItemContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5, backgroundColor: '#f0f0f0', borderRadius: 5, marginBottom: 5 },
  selectedFoodItem: { fontSize: 16 },
  noFoodsText: { fontSize: 14, color: '#777' },
  addButton: { backgroundColor: '#f8a5e6', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 10 },
  addButtonText: { color: '#fff', fontSize: 18 },
  cancelButton: { padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#888' },
  cancelButtonText: { color: '#555', fontSize: 18 },
  resetButton: {
    backgroundColor: '#f8a5c2',
    paddingVertical: 10,
    paddingHorizontal: 20, 
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',  
    marginVertical: 10,
  },
});
