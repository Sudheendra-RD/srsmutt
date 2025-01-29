import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { navigateToHome } from '@/components/navigateToHome';
import { allBranches } from '@/constants/branches';


export default function Branches() {
  navigateToHome();
  const muttBranches: string[][] = allBranches;
  return (
    <ScrollView style={styles.container}>
      {Array.from(muttBranches[0]).map((el, _index) => (
        <View style={styles.cell} key={`row1-${_index}`}>
          <Text style={styles.sectionHeading}>{el}</Text>
        </View>
      ))}
      {Array.from(muttBranches[1]).map((el, _index) => (
        <View style={styles.cell} key={`row2-${_index}`}>
          <Text style={styles.sectionHeading1}>{el}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    overflowY: "scroll",
    maxHeight: "100%",
  },
  column: {
    flexGrow: 1,
    // overflowY: "95%",
  },
  cell: {
    flex: 1, // Each cell takes up equal width within the row
    padding: 2,
    borderWidth: 3,
    borderColor: "#ccc",
    justifyContent: "center",
    // alignItems: "center",
  },
  sectionHeading: {
    fontSize: 16,
    textAlign: "justify",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginLeft: 5,
    maxHeight: "100%",
  },
  sectionHeading1: {
    fontSize: 16,
    // textAlign: "justify",
    // justifyContent: "center",
    // alignItems: "center",
    // flexWrap: "wrap",
    marginLeft: 5,
    maxHeight: "100%",
  },
});