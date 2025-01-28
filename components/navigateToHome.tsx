
import { View, Text, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";


export function navigateToHome() {
  const navigation = useNavigation();
  
  // Handle the hardware back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Home"); // Navigate back to Home screen
        return true; // Prevent default behavior (exiting the app)
      };
  
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
  
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );
}

