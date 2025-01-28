import { View, Text } from 'react-native'
import React from 'react'
import { navigateToHome } from '@/components/navigateToHome';

const ContactUs = () => {
  navigateToHome();
  return (
    <View>
      <Text>ContactUs</Text>
    </View>
  )
}

export default ContactUs