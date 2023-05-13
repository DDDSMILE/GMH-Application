import { StyleSheet, Text, Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Colors, Fonts, Images } from "../../../constants";
import { Display } from "../../../utils";

const OnBoarding = () => {
  return (
    <View style={styles.page}>
      <Image style={styles.pattern} source={Images.PATTERNBG} />
      <View style={styles.content}>
        <View style={{ alignItems: "center" }}>
          <Image style={styles.logo} source={Images.LOGO} />
        </View>
        <MaskedView
          style={{ height: 40, justifyContent: "center" }}
          maskElement={<Text style={styles.title}>GMH</Text>}
        >
          <LinearGradient
            colors={[Colors.GREEN_LOGO_ONE, Colors.GREEN_LOGO_TWO]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0.33 }}
            style={{ flex: 1 }}
          />
        </MaskedView>
        <Text style={styles.subtitle}>Go to market help you</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: Colors.DEFAULT_WHITE,
    alignItems: "center",
    justifyContent: "center",
    width: Display.setWidth(100),
  },
  pattern: {
    height: Display.setHeight(40),
    aspectRatio: 7 / 6,
    opacity: 0.5,
  },
  title: {
    fontSize: 37,
    fontFamily: "viga_regular",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "inter_semi_bold",
  },
  logo: {
    width: Display.setWidth(10),
    aspectRatio: 1,
  },
});

export default OnBoarding;
