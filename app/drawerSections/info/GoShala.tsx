import { View, Text } from 'react-native'
import React from 'react'
import { navigateToHome } from '@/components/navigateToHome';

const GoShala = () => {
  navigateToHome();
  return (
    <View>
      <Text>GoShala</Text>
    </View>
  )
}

export default GoShala