import { View, Text, StyleSheet, Image } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Images } from "../../../constants";
import { Display } from "../../../utils";
import colors from "../../../constants/colors";
import images from "../../../constants/images";
import { ButtonForm } from "../../../components/form";

const DoneScreen = () => {
  return (
    <View style={styles.page}>
      <Image style={styles.pattern} source={Images.PATTERNBG} />
      <View style={styles.content}>
        <View style={{ alignItems: "center" }}>
          <Image source={images.DONEIMAGE} />
        </View>
        <View style={{ marginTop: 20 }}>
          <MaskedView
            style={{ height: 40 }}
            maskElement={<Text style={styles.title}>Hoàn Thành!</Text>}
          >
            <LinearGradient
              colors={[Colors.GREEN_TEXT_ONE, Colors.GREEN_TEXT_TWO]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0.33 }}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </View>
        <Text style={styles.subtitle}>Hãy đặt hàng từ hôm nay</Text>
      </View>
      <View style={{ marginVertical: Display.setWidth(80) }}>
        <ButtonForm text={"Đặt hàng"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.DEFAULT_WHITE,
    alignItems: "center",
    justifyContent: "center",
    width: Display.setWidth(100),
  },
  pattern: {
    height: Display.setHeight(40),
    aspectRatio: 7 / 6,
    opacity: 0.5,
  },
  content: {
    position: "absolute",
    top: Display.setHeight(30),
  },
  title: {
    fontSize: 24,
    fontFamily: "inter_semi_bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "inter_medium",
  },
});

export default DoneScreen;
