import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'

const aboutData = require("../../constants/about");

const CardDetails = (data: any) => {
  return (
    <View>
      <Text>{data.section}</Text>
    </View>
  );
}

export default CardDetails