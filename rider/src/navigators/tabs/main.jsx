import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailScreen, HomeScreen } from "../../screens/main";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
