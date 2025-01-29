import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, BackHandler } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const raghavendraImg = require('@/assets/images/brindavana.jpg');
const moolaRamaImg = require("@/assets/images/moola-rama.jpg");
const parampareImg = require("@/assets/images/madhwacharya.jpg");
const aboutData = require('../../constants/about');
const moola = require("../../constants/moolarama");
const parampare = require("../../constants/parampare")

export default function Index() {
  const [loading, SetLoading] = useState('');

  const expandCard = (about: string) => {
    SetLoading(about);
  }

  const backToHome = () => {
    SetLoading('')
  }

  useEffect(() => {
    const handleBackPress = () => {
      backToHome()
      return true; // Prevent default behavior
    };

    // Add event listener for the back button
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    // Cleanup the event listener on component unmount
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, []);

  const { width: screenWidth } = Dimensions.get("window");
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
  if (loading === "parampare") {
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
        <ScrollView style={styles.parampare}>
          {Array.from(parampare.guruParampare).map((el, _index) => (
            <View style={styles.parampare} key={`row1-${_index}`}>
              <Text style={styles.details}>- {el}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
  return (
    <View>
      <ScrollView style={styles.scrollContainer}>
        <Card style={styles.container} onPress={() => expandCard("moola")}>
          <Card.Content>
            <Title>Moola Rama - History</Title>
          </Card.Content>
          <Card.Cover
            style={[
              styles.cardimg,
              { width: screenWidth, height: screenWidth * 0.5625 },
            ]}
            source={moolaRamaImg}
            resizeMode="contain"
          />
          <Card.Content>
            <Paragraph style={styles.textContent}>
              These idols got through Naraharithirtha and worshipped by Acharya
              are very ancient, popularly known as “Chaturyugamurthis”. There
              are references about their glorious past in Vasistha Ramayana,
              Adhyatma Ramyana and Markandeya Purana. Both of these idols are
              very beautiful. Any pious soul that takes a darshan of these
              cannot but have profound devotion aroused...
            </Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.container} onPress={() => expandCard("about")}>
          <Card.Content>
            <Title>Shri Raghavendra Swamy Matha</Title>
          </Card.Content>
          <Card.Cover
            style={[
              styles.cardimg,
              { width: screenWidth, height: screenWidth * 0.5625 },
            ]}
            source={raghavendraImg}
            resizeMode="contain"
          />
          <Card.Content>
            <Paragraph style={styles.textContent}>
              Sri Raghavendra Swamy Mutt belongs to the lineage (parampara) of
              Hamsa naamaka Paramaatma, adorned, in the early phase of its
              history, by various Tapaswis and Rishis. Sri Madhwacharya, the
              proponent of Dwaita Vedanta....
            </Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.container} onPress={() => expandCard("parampare")}>
          <Card.Content>
            <Title>Guru Parampare</Title>
          </Card.Content>
          <Card.Cover
            style={[
              styles.cardimg,
              { width: screenWidth, height: screenWidth * 0.5625 },
            ]}
            source={parampareImg}
            resizeMode="contain"
          />
          <Card.Content>
            <Paragraph style={styles.textContent}>
              The Guru Parampara (Lineage of Saints) of Jagadguru
              Srimanmadhvacharya Moola Maha Samsthana, Sri Raghavendra Swamy
              Mutt....
            </Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
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
    justifyContent: "center",
    textAlign: "justify",
    fontSize: 16,
  },
  cardimg: {},
  scrollContainer: {
    maxHeight: "98%", // Optional for restricting scroll area
    flexGrow: 1, // Ensures scrolling content fits the screen
  },
  parampare: {
    maxHeight: "92%", // Optional for restricting scroll area
    flexGrow: 1,
  },
  icons: {
    paddingTop: 10,
    paddingLeft: 5,
  },
  textContent: {
    textAlign: "justify",
    fontSize: 16,
  },
});
