import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CardDetails from '../screens/CardDetails';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const raghavendraImg = require('@/assets/images/rayaru.jpg');
const moolaRamaImg = require("@/assets/images/moola-rama.jpg");
const aboutData = require('../../constants/about');
const moola = require("../../constants/moolarama");

export default function Index() {
  const [loading, SetLoading] = useState('');

  const expandCard = (about: string) => {
    SetLoading(about);
  }

  const backToHome = () => {
    SetLoading('')
  }
  if (loading === 'about') {
    return (
      <View>
        <TouchableOpacity>
          <Ionicons
            name="chevron-back-outline"
            size={30}
            style={styles.icons}
            onPress={() => backToHome()}
          />
        </TouchableOpacity>
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.details}>{aboutData.About}</Text>
        </ScrollView>
      </View>
    );
  }
  if (loading === "moola") {
    return (
      <View>
        <TouchableOpacity>
          <Ionicons
            name="chevron-back-outline"
            size={30}
            style={styles.icons}
            onPress={() => backToHome()}
          />
        </TouchableOpacity>
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.details}>{moola.moolaRama}</Text>
        </ScrollView>
      </View>
    );
  }
  return (
    <View>
      <Card style={styles.container} onPress={() => expandCard("about")}>
        <Card.Content>
          <Title>Shri Raghavendra Swamy Matha</Title>
        </Card.Content>
        <Card.Cover style={styles.cardimg} source={raghavendraImg} />
        <Card.Content>
          <Paragraph>
            Sri Raghavendra Swamy Mutt belongs to the lineage (parampara) of
            Hamsa naamaka Paramaatma, adorned, in the early phase of its
            history, by various Tapaswis and Rishis. Sri Madhwacharya, the
            proponent of Dwaita Vedanta....
          </Paragraph>
        </Card.Content>
      </Card>
      <Card style={styles.container} onPress={() => expandCard("moola")}>
        <Card.Content>
          <Title>Moola Rama</Title>
        </Card.Content>
        <Card.Cover style={styles.cardimg} source={moolaRamaImg} />
        <Card.Content>
          <Paragraph>
            These idols got through Naraharithirtha and worshipped by Acharya
            are very ancient, popularly known as “Chaturyugamurthis”. There are
            references about their glorious past in Vasistha Ramayana, Adhyatma
            Ramyana and Markandeya Purana. Both of these idols are very
            beautiful. Any pious soul that takes a darshan of these cannot but
            have profound devotion aroused...
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    margin: 10,
  },
  card: {
    overflowY: "scroll",
    maxHeight: "90%",
  },
  details: {
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center'
  },
  cardimg: {
    width: "100%",
    height: 150,
  },
  scrollContainer: {
    maxHeight: "94%", // Optional for restricting scroll area
    flexGrow: 1, // Ensures scrolling content fits the screen
  },
  icons: {
    paddingTop: 10,
    paddingLeft: 5,
  },
});
