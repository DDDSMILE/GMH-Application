import { StyleSheet, Text, Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

const OnBoarding = () => {
  return (
    <View style={styles.page}>
      <Image
        style={styles.pattern}
        source={{
          uri: "https://res.cloudinary.com/du93troxt/image/upload/v1679647812/pattern_uxizbj.png",
        }}
      />
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://res.cloudinary.com/du93troxt/image/upload/v1679648686/Logo_mrr43p.png",
          }}
        />
        <MaskedView
          style={{ height: 40, justifyContent: "center" }}
          maskElement={<Text style={styles.title}>GMH</Text>}
        >
          <LinearGradient
            colors={["#53E88B", "#15BE77"]}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pattern: {
    height: 300,
    aspectRatio: 7 / 6,
    top: 0,
    opacity: 0.5,
  },
  title: {
    fontSize: 30,
    fontWeight: 400,
    textAlign: "center",
  },
  subtitle: {
    fontWeight: 600,
    fontSize: 14,
    textAlign: "center",
  },
  logo: {
    width: 150,
    aspectRatio: 1,
  },
});

export default OnBoarding;
