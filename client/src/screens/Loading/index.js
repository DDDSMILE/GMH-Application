import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { ButtonForm } from "../../components/Form";

const LoadingScreen = () => {
  return (
    <ImageBackground
      style={{ height: "100%", alignItems: "center" }}
      source={{
        uri: "https://res.cloudinary.com/du93troxt/image/upload/v1679668173/onboarding_scmg1k.png",
      }}
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
    fontWeight: 700,
    fontSize: 30,
    letterSpacing: 0.03,
  },
  subtitle: {
    marginTop: 3,
    textAlign: "center",
    fontWeight: 500,
    fontSize: 15,
    color: "#868889",
    letterSpacing: 0.3,
    lineHeight: 22,
  },
});

export default LoadingScreen;
