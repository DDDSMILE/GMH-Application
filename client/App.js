import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import OnBoarding from "./src/screens/OnBoarding";
import LoadingScreen from "./src/screens/Loading";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import InputPhoneScreen from "./src/screens/InputPhoneScreen";
import { useFonts } from "expo-font";
import { Fonts } from "./src/constants";
import OTPScreen from "./src/screens/OTPScreen";
import RegisterLocation from "./src/screens/RegisterLocation";
import DoneScreen from "./src/screens/DoneScreen";

const customFonts = {
  inter_black: Fonts.INTER_BLACK,
  inter_bold: Fonts.INTER_BOLD,
  inter_extra_bold: Fonts.INTER_EXTRA_BOLD,
  inter_extra_light: Fonts.INTER_EXTRA_LIGHT,
  inter_light: Fonts.INTER_LIGHT,
  inter_medium: Fonts.INTER_MEDIUM,
  inter_regular: Fonts.INTER_REGULAR,
  inter_semi_bold: Fonts.INTER_SEMI_BOLD,
  inter_thin: Fonts.INTER_THIN,
  viga_regular: Fonts.VIGA_REGULAR,
};

export default function App() {
  const [loaded] = useFonts(customFonts);
  if (!loaded) return null;

  return (
    <View style={{ flex: 1, padding: 0, margin: 0 }}>
      {/* <OnBoarding /> */}
      {/* <LoadingScreen /> */}
      {/* <SignInScreen /> */}
      {/* <SignUpScreen/> */}
      {/* <InputPhoneScreen/> */}
      {/* <OTPScreen /> */}
      {/* <RegisterLocation /> */}
      <DoneScreen/>
      <StatusBar style="auto" />
    </View>
  );
}
