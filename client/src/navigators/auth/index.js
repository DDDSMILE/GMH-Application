import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../../screens/SignInScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import RegisterLocation from "../../screens/RegisterLocation";
import InputPhoneScreen from "../../screens/InputPhoneScreen";
import OTPScreen from "../../screens/OTPScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="signin"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="signin" component={SignInScreen} />
      <Stack.Screen name="signup" component={SignUpScreen} />
      <Stack.Screen name="inputphonenumber" component={InputPhoneScreen} />
      <Stack.Screen name="otp" component={OTPScreen} />
      <Stack.Screen name="registerlocation" component={RegisterLocation} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
