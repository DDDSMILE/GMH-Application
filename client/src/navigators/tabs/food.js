import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import TypeProduct from "../../screens/TypeProduct";
import SuggestionScreen from "../../screens/SuggestionScreen";
import ChatScreen from "../../screens/ChatScreen";

const Stack = createNativeStackNavigator();

const FoodNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="suggest_product"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="type_product" component={TypeProduct} />
      <Stack.Screen name="suggest_product" component={SuggestionScreen} />
      <Stack.Screen name="chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default FoodNavigator;
