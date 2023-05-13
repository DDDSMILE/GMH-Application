import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { ButtonForm } from "../../../components/form";
import { Colors, Images } from "../../../constants";
import { Display } from "../../../utils";

const LoadingScreen = () => {
  return (
    <ImageBackground
      style={{ height: Display.setHeight(100), alignItems: "center" }}
      source={Images.ONBOARDINGBG}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Đi chợ giúp bạn</Text>
        <Text style={styles.subtitle}>
          Chúng tôi tìm và mua {`\n`} những thực phẩm tươi ngon nhất
        </Text>
      </View>
      <ButtonForm text={"Bắt đầu nào"} width={150} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 90,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "inter_bold",
  },
  subtitle: {
    marginTop: 3,
    textAlign: "center",
    fontSize: 15,
    fontFamily: "inter_medium",
    color: Colors.DEFAULT_GREY,
  },
});

export default LoadingScreen;
