import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ProgressBarAndroid,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useUser } from "@clerk/clerk-expo"; // Clerk to get user info
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { firestore } from "../../firebaseConfig"; // Import Firestore config
import tw from "twrnc"; // For nativewind styling
import Header from "../Components/HomeScreen/Header";

// Example baby images based on pregnancy stage
const babyImages = {
  firstTrimester:
    "https://americanpregnancy.org/wp-content/uploads/2012/05/enfetal-development-third-trimesteresdesarollo-de-su-bebe-tercer-trimestre.jpg", // Replace with actual image URL
  secondTrimester:
    "https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2016/6/Foetus_week_9_shutterstock_293546450.jpg", // Replace with actual image URL
  thirdTrimester:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOdlAOmhc5ywJ84eNihzmAPQLFEQA8QgJzYph-JL4LQGAAZW78ECCglGbB4oAZluPV8Kc&usqp=CAU", // Replace with actual image URL
};

// Function to get baby image based on pregnancy stage
const getBabyImage = (pregnancyStage) => {
  if (pregnancyStage === "firstTrimester") return babyImages.firstTrimester;
  if (pregnancyStage === "secondTrimester") return babyImages.secondTrimester;
  if (pregnancyStage === "thirdTrimester") return babyImages.thirdTrimester;
  return ""; // Default or empty string if pregnancy stage is unknown
};

export default function HomeScreen() {
  const { user } = useUser(); // Get current user details from Clerk
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [displayWeeksLeft, setDisplayWeeksLeft] = useState(true); // Toggle state for weeks left or pregnant

  // Fetch user data from Firestore using user.id from Clerk
  const fetchUserData = async () => {
    try {
      const userDocRef = doc(firestore, "users", user.id); // Use Clerk's user.id
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setUserData(userDoc.data()); // Set user data state
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Use useFocusEffect to refresh the screen when it comes into focus
  useFocusEffect(
    useCallback(() => {
      setLoading(true); // Start loading state
      fetchUserData(); // Fetch the latest data when screen comes into focus
    }, [user.id])
  );

  // Toggle display between "weeks left" and "weeks pregnant" every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayWeeksLeft((prev) => !prev); // Toggle the display state
    }, 5000); // 2 seconds interval

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);

  // If loading, show spinner
  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#E91E63" />
      </View>
    );
  }

  // Handle the case where userData is still not fetched
  if (!userData) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>No user data found.</Text>
      </View>
    );
  }

  // Helper function to calculate weeks left based on due date
  const calculateWeeksLeft = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const weeksLeft = Math.floor((due - now) / (7 * 24 * 60 * 60 * 1000));
    return weeksLeft;
  };

  // Helper function to calculate weeks pregnant
  const calculateWeeksPregnant = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const totalWeeks = 40;
    const weeksPregnant = totalWeeks - calculateWeeksLeft(due);
    return weeksPregnant;
  };

  const weeksLeft = calculateWeeksLeft(userData.dueDate);
  const weeksPregnant = calculateWeeksPregnant(userData.dueDate);
  const babyImage = getBabyImage(userData.pregnancyStage); // Get the baby image based on pregnancy stage

  return (
    <ScrollView style={tw`p-6 flex-1 bg-rose-50`}>
      <Header />

      {/* Large Today Card */}
      <TouchableOpacity style={tw`bg-white rounded-xl shadow-lg mt-5`}>
        {/* Image covering full width and height of TouchableOpacity */}
        <View style={tw`w-full h-64`}>
          <Image
            source={{ uri: babyImage || "https://via.placeholder.com/300" }} // Replace with baby image based on pregnancy stage
            style={tw`w-full h-full rounded-lg`}
          />

          {/* Overlay Texts */}
          <View style={tw`absolute top-3 left-3`}>
            <Text style={tw`text-white text-xl font-bold`}>Today</Text>
          </View>

          <View style={tw`absolute bottom-3 left-3`}>
            <Text style={tw`text-white text-lg font-bold`}>
              Week {weeksPregnant|| "N/A"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Progress Section */}
      <View style={tw`bg-white rounded-xl shadow-lg mt-5 p-5`}>
        {/* Conditional Display */}
        {displayWeeksLeft ? (
          <Text style={tw`text-lg font-bold mb-1`}>
            {weeksLeft} weeks, {(weeksLeft * 7) % 7} days to go!
          </Text>
        ) : (
          <Text style={tw`text-lg font-bold mb-1`}>
            You are {weeksPregnant} weeks pregnant!
          </Text>
        )}

        <Text style={tw`text-sm text-gray-500 mb-1`}>
          {userData?.pregnancyStage || "Pregnancy Stage Unknown"}
        </Text>
        <Text style={tw`text-sm text-gray-500 mb-2`}>
          Due {new Date(userData.dueDate).toDateString()}
        </Text>

        {/* Progress Bar */}
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={(40 - weeksLeft) / 40} // Assuming 40 weeks total
          color="#E91E63"
        />
      </View>

      {/* Weeks Card */}
      <View style={tw`bg-white rounded-xl shadow-md mt-5`}>
      {/* Background Image */}
      <ImageBackground
        source={require('../../assets/images/explore.png')} // Use require if the image is a local asset
        style={tw`w-full h-48 justify-center`} // Full width and height for the background
        imageStyle={tw`rounded-xl`} // Ensure the background image is rounded too
      >
        {/* Content on top of the background image */}
        <View style={tw`flex justify-center items-center`}>
          <Text style={tw`text-3xl font-bold text-white text-black`}>{weeksPregnant}</Text>
          <Text style={tw`text-base text-pink-600 font-bold`}>Weeks Pregnant</Text>
        </View>
      </ImageBackground>
    </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Discover")}
      >
        <Text style={styles.buttonText}>Learn More</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#E91E63",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom:40
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

