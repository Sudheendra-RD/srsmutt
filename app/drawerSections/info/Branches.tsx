import { View, Text, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { navigateToHome } from '@/components/navigateToHome';


export default function Branches() {
  navigateToHome();

  return (
    <View>
      <Text>Branches</Text>
    </View>
  )
}