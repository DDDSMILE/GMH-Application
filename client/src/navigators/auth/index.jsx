import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SignInScreen,
  SignUpScreen,
  InputPhoneScreen,
  OTPScreen,
  RegisterLocation,
  DoneScreen,
} from "../../screens/auth";

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
      <Stack.Screen name="done" component={DoneScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
