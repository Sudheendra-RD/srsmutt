import { Text, View, StyleSheet } from 'react-native';
 import { Link } from 'expo-router'; 

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Jagadguru Shriman Madhwacharya Moola maha Samsthana
      </Text>
      <Text style={styles.text}>
        Shri Raghavendra Swamy Matha
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: "#F2EFEC",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: 300,
    flex: 1,
    color: "#333",
    alignItems: "center",
    justifyContent: "center",
    textAlign: 'center'
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
