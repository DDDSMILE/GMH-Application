import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import OnBoarding from "./src/screens/OnBoarding";
import LoadingScreen from "./src/screens/Loading";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import InputPhoneScreen from "./src/screens/InputPhoneScreen";

export default function App() {
  return (
    <View style={{ flex: 1, padding: 0, margin: 0 }}>
      {/* <OnBoarding /> */}
      <LoadingScreen />
      {/* <SignInScreen /> */}
      {/* <SignUpScreen/> */}
      {/* <InputPhoneScreen/> */}
      <StatusBar style="auto" />
    </View>
  );
}
