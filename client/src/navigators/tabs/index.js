import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../../screens/HomeScreen";
import OrdersScreen from "../../screens/OrdersScreen";
import InformationScreen from "../../screens/InformationScreen";

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={28}
              name={focused ? "home" : "home-outline"}
              color="#000"
            />
          ),
        }}
      />
      <Tab.Screen
        name="order"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={28}
              name={focused ? "list" : "list-outline"}
              color="#000"
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={InformationScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={28}
              name={focused ? "settings" : "settings-outline"}
              color="#000"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
