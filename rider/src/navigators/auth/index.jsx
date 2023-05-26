import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignInScreen } from "../../screens/auth";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="signin"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="signin" component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
