import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import OrdersScreen from "../screens/OrdersScreen";
import InformationScreen from "../screens/InformationScreen";

// Screen names
const homeName = "Home";
const orderName = "Order";
const informationName = "Information";

const BottomTabs = createBottomTabNavigator();

export default () => {
  <BottomTabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let rn = route.name;

        if (rn === homeName) {
          iconName = focused ? "home" : "home-outline";
        } else if (rn === orderName) {
          iconName = focused ? "list" : "list-outline";
        } else if (rn === informationName) {
          iconName = focused ? "settings" : "settings-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <BottomTabs.Screen name={homeName} component={HomeScreen} />
    <BottomTabs.Screen name={orderName} component={OrdersScreen} />
    <BottomTabs.Screen name={informationName} component={InformationScreen} />
    
  </BottomTabs.Navigator>;
};
