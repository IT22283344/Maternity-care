import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useUser } from "@clerk/clerk-expo"; // Import Clerk for user details
import { firestore } from "../../firebaseConfig"; // Firebase Firestore
import { doc, setDoc } from "firebase/firestore"; // Firestore methods
import tw from "twrnc";

export default function ProfileScreen({ navigation }) {
  const { user } = useUser(); // Fetch user data from Clerk
  const [age, setAge] = useState("");
  const [firstTimeMom, setFirstTimeMom] = useState("");
  const [dueDate, setDueDate] = useState(new Date()); // Use a Date object for the picker
  const [createdBy, setCreatedBy] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false); // Control date picker visibility

  // Helper function to calculate pregnancy stage from due date
  const calculatePregnancyStage = (dueDate) => {
    const now = new Date();
    const weeks = Math.floor((dueDate - now) / (7 * 24 * 60 * 60 * 1000)); // Convert to weeks

    if (weeks <= 13) return "firstTrimester";
    if (weeks <= 27) return "secondTrimester";
    return "thirdTrimester";
  };

  const handleSubmit = async () => {
    // Validation: Check if user object from Clerk is available
    if (!user || !user.id) {
      console.error("User ID not found. The user may not be logged in.");
      Alert.alert("Error", "User is not logged in or user ID is missing.");
      return;
    }

    console.log("User ID from Clerk:", user.id);
    console.log("Submitting profile update...");

    try {
      // Update user document with additional information in Firestore
      await setDoc(
        doc(firestore, "users", user.id), // Use user.id from Clerk to target the correct document
        {
          age,
          firstTimeMom,
          dueDate: dueDate.toISOString().split("T")[0], // Save due date as YYYY-MM-DD
          createdBy,
          pregnancyStage: calculatePregnancyStage(dueDate), // Automatically calculate pregnancy stage
        },
        { merge: true } // Use merge to avoid overwriting existing fields
      );

      console.log("Document updated successfully");

      // Show success alert and navigate to home screen
      Alert.alert("Success", "Profile updated successfully");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error updating user info:", error);
      Alert.alert("Error", "There was an issue updating your profile.");
    }
  };

  // Handler to show the date picker
  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  // Handle date selection
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(Platform.OS === "ios"); // For iOS keep the picker open
    setDueDate(currentDate); // Set the selected date
  };

  return (
    <ScrollView style={tw`p-6 flex-1`}>
      <View style={styles.container}>
        {/* Profile Image and Name */}
        <View style={styles.profileSection}>
          <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
          <Text style={styles.profileName}>{user?.fullName}</Text>
          <Text style={styles.profileEmail}>
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>

        {/* Form Section */}
        <Text style={styles.title}>Update Your Profile</Text>

        {/* Age Picker */}
        <Picker
          selectedValue={age}
          onValueChange={(itemValue) => setAge(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select your age" value="" />
          <Picker.Item label="20-25" value="20-25" />
          <Picker.Item label="26-30" value="26-30" />
          <Picker.Item label="31-35" value="31-35" />
        </Picker>

        {/* First Time Mom Picker */}
        <Picker
          selectedValue={firstTimeMom}
          onValueChange={(itemValue) => setFirstTimeMom(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="First time mom?" value="" />
          <Picker.Item label="Yes" value="yes" />
          <Picker.Item label="No" value="no" />
        </Picker>

        {/* Due Date Picker */}
        <TouchableOpacity
          onPress={showDatePickerHandler}
          style={styles.datePickerButton}
        >
          <Text style={styles.buttonText}>
            {dueDate ? dueDate.toDateString() : "Select Due Date"}
          </Text>
        </TouchableOpacity>

        {/* Show DateTimePicker */}
        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        {/* Created By Picker */}
        <Picker
          selectedValue={createdBy}
          onValueChange={(itemValue) => setCreatedBy(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Account created by" value="" />
          <Picker.Item label="Mother" value="Mother" />
          <Picker.Item label="Father" value="Father" />
        </Picker>

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profileEmail: {
    fontSize: 16,
    color: "#555",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#E91E63",
  },
  input: {
    width: "100%",
    padding: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  datePickerButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "gray",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#E91E63",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

