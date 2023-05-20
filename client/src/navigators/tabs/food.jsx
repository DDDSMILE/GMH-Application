import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  TypeProduct,
  SuggestionScreen,
  ChatScreen,
  SearchScreen,
  DetailScreen,
  OrderScreen,
  CheckoutScreen,
  PaymentScreen,
  AddressesScreen,
} from "../../screens/food";

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
      <Stack.Screen name="search" component={SearchScreen} />
      <Stack.Screen name="detail" component={DetailScreen} />
      <Stack.Screen name="order" component={OrderScreen} />
      <Stack.Screen name="checkout" component={CheckoutScreen} />
      <Stack.Screen name="payment" component={PaymentScreen} />
      <Stack.Screen name="addresses" component={AddressesScreen} />
    </Stack.Navigator>
  );
};

export default FoodNavigator;
