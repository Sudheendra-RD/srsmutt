import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { navigateToHome } from '@/components/navigateToHome';
import { VidyaPeetha } from '@/constants/vidyapeetha';

const Vidyapeetha = () => {
  const content = VidyaPeetha;
    navigateToHome();
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerStyle}>
          Shri Gurusarvabhouma Sanskrit Vidyapeetham
        </Text>
        <Text style={styles.Description}>{content}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  headerStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    padding: 20,
    backgroundColor: "#fff",
  },
  Description: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Vidyapeetha