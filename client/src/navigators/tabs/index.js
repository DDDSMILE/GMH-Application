import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../../screens/HomeScreen";
import OrdersScreen from "../../screens/OrdersScreen";
import InformationScreen from "../../screens/InformationScreen";
import colors from "../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import FoodNavigator from "./food";

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="food"
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "#15BE77" }}
    >
      <Tab.Screen
        name="food"
        component={FoodNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={28}
              name={focused ? "home" : "home-outline"}
              color={colors.GREEN_LOGO_TWO}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarLabel: "Đơn hàng",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              size={28}
              name={focused ? "shopping" : "shopping-outline"}
              color={colors.GREEN_LOGO_TWO}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Information"
        component={InformationScreen}
        options={{
          tabBarLabel: "Tôi",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              size={28}
              name={focused ? "meho" : "meh"}
              color={colors.GREEN_LOGO_TWO}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
