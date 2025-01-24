import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const AboutScreen = () => {
  return (
    <View>
      <Text>AboutScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});

export default AboutScreen