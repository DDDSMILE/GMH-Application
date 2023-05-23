import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { Fonts } from "./src/constants";
import Navigators from "./src/navigators";

const customFonts = {
  inter_black: Fonts.INTER_BLACK,
  inter_bold: Fonts.INTER_BOLD,
  inter_extra_bold: Fonts.INTER_EXTRA_BOLD,
  inter_extra_light: Fonts.INTER_EXTRA_LIGHT,
  inter_light: Fonts.INTER_LIGHT,
  inter_medium: Fonts.INTER_MEDIUM,
  inter_regular: Fonts.INTER_REGULAR,
  inter_semi_bold: Fonts.INTER_SEMI_BOLD,
  viga_regular: Fonts.VIGA_REGULAR,
  inter_thin: Fonts.INTER_THIN,
};

const Main = () => {
  const [loaded] = useFonts(customFonts);
  if (!loaded) return null;

  return (
    <View style={{ flex: 1, padding: 0, margin: 0 }}>
      <Navigators />
    </View>
  );
};

export default Main;
