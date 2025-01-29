import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import React from 'react'
import { navigateToHome } from '@/components/navigateToHome';
import contactList from "@/constants/contact_us";

const ContactUs = () => {
  navigateToHome();

  const contact_Us = contactList;
  return (
    <FlatList
      data={contact_Us}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Text style={styles.addressName}>{item.name}</Text>
          <Text style={styles.addressDescription}>{item.description}</Text>
          <Text style={styles.phone}>Phone: {item.phone}</Text>
          {item.email && <Text style={styles.email}>Email: {item.email}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    padding: 20,
    backgroundColor: "#fff",
    margin: 10,
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    margin: 10,
  },
  addressName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  addressDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  phone: {
    fontSize: 14,
    color: "gray",
    marginBottom: 3,
  },
  email: {
    fontSize: 14,
    color: "blue",
  },
});

export default ContactUs