import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Index from './(tabs)';
import AboutScreen from './(tabs)/about';
import { Ionicons } from '@expo/vector-icons';
import Branches from './drawerSections/info/Branches';
import ContactUs from './drawerSections/info/ContactUs';
import GoShala from './drawerSections/info/GoShala';
import Vidyapeetha from './drawerSections/info/Vidyapeetha';
import DasaSahityaMuseum from './drawerSections/info/DasaSahityaMuseum';
import { View, Text, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// const SettingsScreen = () => (
//   <Tab.Navigator>
//     <Tab.Screen
//       options={{ headerShown: false }}
//       name="Home"
//       component={Index}
//     />
//     <Tab.Screen
//       options={{ headerShown: false }}
//       name="Panchanga"
//       component={AboutScreen}
//     />
//   </Tab.Navigator>
// );

// Tabs
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "";

          if (route.name === "Home") {
            iconName = focused ? "home-sharp" : "home-outline";
          } else if (route.name === "Panchanga") {
            iconName = focused ? "calendar-sharp" : "calendar-outline";
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveBackgroundColor: "#CFC5BC",
        headerStyle: {
          backgroundColor: "#F1852D",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#F1852D",
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 16,
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Index}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Panchanga"
        component={AboutScreen}
      />
    </Tab.Navigator>
  );
}

const CustomDrawerContent = (props: any) => (
  <DrawerContentScrollView {...props} style={styles.drawerStyle}>
    {/* Section 1: Branches and Contact Us */}
    <Text style={styles.sectionTitle}>Info</Text>
    <DrawerItem
      label="Branches"
      onPress={() => props.navigation.navigate("Branches")}
      style={styles.sectionItems}
    />
    <DrawerItem
      label="Contact Us"
      onPress={() => props.navigation.navigate("Contact Us")}
      style={styles.sectionItems}
    />

    {/* Section 2: Go Shala, Vidyapeetha, Dasa Sahitya Museum */}
    <Text style={styles.sectionTitle}>Projects</Text>
    <DrawerItem
      label="Go Shala"
      onPress={() => props.navigation.navigate("Go Shala")}
      style={styles.sectionItems}
    />
    <DrawerItem
      label="Vidyapeetha"
      onPress={() => props.navigation.navigate("Vidyapeetha")}
      style={styles.sectionItems}
    />
    <DrawerItem
      label="Dasa Sahitya Museum"
      onPress={() => props.navigation.navigate("Dasa Sahitya Museum")}
      style={styles.sectionItems}
    />
  </DrawerContentScrollView>
);

export default function RootLayout() {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Branches" component={Branches} />
      <Drawer.Screen name="Contact Us" component={ContactUs} />
      <Drawer.Screen name="Go Shala" component={GoShala} />
      <Drawer.Screen name="Vidyapeetha" component={Vidyapeetha} />
      <Drawer.Screen name="Dasa Sahitya Museum" component={DasaSahityaMuseum} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: "#F2EFEC",
    padding: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff", // White text color for contrast
    paddingVertical: 10, // Vertical padding to give space around the text
    paddingHorizontal: 20, // Horizontal padding for space on the sides
    backgroundColor: "#F1852D", // Background color for the section header
    width: "100%", // Ensures the background fills the width of the screen
    textAlign: "left", // Aligns text to the left
  },
  sectionItems: {
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 20,
    color: "#000000",
  },
});
