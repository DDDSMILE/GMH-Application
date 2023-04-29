import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import TypeProduct from "../../screens/TypeProduct";

const Stack = createNativeStackNavigator();

const FoodNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="typeproduct" component={TypeProduct} />
    </Stack.Navigator>
  );
};

export default FoodNavigator;
